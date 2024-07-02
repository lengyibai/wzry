<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { HeroSkinOptionalInfo, OptionalMode } from "../../interface";

import HeroSkinCard from "./components/HeroSkinCard/index.vue";

import { KCategory, KInput, KButton, KLoadMore, KEmpty } from "@/components/business";
import { $msgTipText, MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { GAME_HERO } from "@/api";
import { KnapsackStore } from "@/store";
import { usePagingLoad, useUserConfigFinish } from "@/hooks";
import { $message, $obtain } from "@/utils/busTransfer";
import { _search, _LoadMore, _cloneDeep } from "@/utils/tool";

interface Props {
  /** 弹窗模式 */
  mode: OptionalMode;
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  close: [];
}>();

const $knapsackStore = KnapsackStore();

const { pushAllData, loadMore, show_list, all_data, resetPage, setFilterData, loading, finish } =
  usePagingLoad<HeroSkinOptionalInfo>();

/** 英雄职业列表 */
const options: Game.Hero.Profession[] = ["全部", "坦克", "战士", "刺客", "法师", "射手", "辅助"];
/** 皮肤类型对应表，第一个HERO是为了补位 */
const skin_type_tree: Record<OptionalMode, { key: Game.PropKey; type: number }> = {
  HERO: {
    key: "HERO_CHEST_OPTIONAL",
    type: -1,
  },
  INITIAL: {
    key: "SKIN_CARD_INITIAL",
    type: 0,
  },
  BRAVE: {
    key: "SKIN_CHEST_BRAVE_OPTIONAL",
    type: 1,
  },
  EPIC: {
    key: "SKIN_CHEST_EPIC_OPTIONAL",
    type: 12,
  },
  LEGEND: {
    key: "SKIN_CHEST_LEGEND_OPTIONAL",
    type: 15,
  },
  LIMIT: {
    key: "SKIN_CHEST_LIMIT_OPTIONAL",
    type: 5,
  },
};
/** 皮肤键名 */
const skin_keys = Object.keys(skin_type_tree).slice(1);

const heroListRef = ref<HTMLElement>();

/** 搜索值 */
const search_value = ref("");
/** 当前tab栏索引 */
const tab_index = ref(0);
/** 选中的英雄/皮肤ID */
const active_id = ref(0);

/* 用户配置加载完成后生成英雄列表 */
useUserConfigFinish.readPromise.then(async () => {
  //获取英雄列表
  if ($props.mode === "HERO") {
    const data = (await GAME_HERO.getHeroDataList())
      .map((item) => {
        return {
          id: item.id,
          hero_name: item.name,
          avatar: item.avatar,
          profession: item.profession,
        };
      })
      .filter((item) => !$knapsackStore.hero_list[item.id]);

    pushAllData(data);
  }
  //获取对应类型皮肤列表
  else if (Object.keys(skin_type_tree).includes($props.mode)) {
    const data = (await GAME_HERO.getSkinList())
      .filter((item) => {
        return (
          item.type === skin_type_tree[$props.mode].type &&
          !$knapsackStore.skin_list.includes(item.id)
        );
      })
      .map((item) => {
        return {
          id: item.id,
          hero_name: item.heroName,
          skin_name: item.name,
          skin_type: item.type,
          avatar: item.avatar,
          profession: item.profession,
        };
      });
    pushAllData(data);
  }

  sortAll();
});

/* 搜索英雄/皮肤 */
const handleSearch = () => {
  tab_index.value = 0;
  const search_keys = ["hero_name"];

  //如果为领取皮肤，则支持皮肤搜索
  if (skin_keys.includes($props.mode)) {
    search_keys.push("skin_name");
  }

  const data = _search<HeroSkinOptionalInfo>(
    _cloneDeep(all_data.value),
    search_value.value,
    search_keys,
    true,
  );
  setFilterData(data);
  resetPage();
};

/* 点击tab栏 */
const onTab = (index: number) => {
  search_value.value = "";
  tab_index.value = index;
  heroListRef.value!.scrollTop = 0;
  sortAll();
};

/* 一键排序 */
const sortAll = () => {
  if (options[tab_index.value] === "全部") {
    //为了解决排序拷贝问题
    setFilterData([...all_data.value]);
  } else {
    const data = all_data.value.filter((item) => {
      return item.profession.includes(options[tab_index.value]);
    });
    setFilterData(data);
  }
  resetPage();
};

/* 领取英雄/皮肤 */
const handleReceive = async (e: Event) => {
  if (active_id.value === 0) {
    $message($msgTipText("y9k8", { v: $props.mode === "HERO" ? "英雄" : "皮肤" }), "error");
    return;
  }

  //领取英雄
  if ($props.mode === "HERO") {
    await $knapsackStore.setGamePropNum("HERO_CHEST_OPTIONAL", 1, "SUB");
    $knapsackStore.addHero(active_id.value);

    //发放奖励弹窗
    const hero = (await GAME_HERO.getHeroKvp())[active_id.value];
    $obtain({
      icon: hero.avatar,
      name: hero.name,
    });
  }

  //领取皮肤
  if (skin_keys.includes($props.mode)) {
    const key = skin_type_tree[$props.mode].key;
    await $knapsackStore.setGamePropNum(key, 1, "SUB");
    $knapsackStore.addSkin(active_id.value, e);

    //发放奖励弹窗
    const skin = (await GAME_HERO.getSkinKvp())[active_id.value];
    $obtain({
      icon: skin.avatar,
      name: skin.name,
    });
  }

  $emit("close");
};

onMounted(() => {
  new _LoadMore(
    {
      parent: heroListRef.value!,
      loadHeight: 10,
    },
    {
      load() {
        //处于加载中或全部加载完毕禁止再次触发
        if (loading.value || finish.value) return;
        loadMore();
      },
    },
  );
});
</script>

<template>
  <div class="toolbar">
    <div class="top">
      <!-- 搜索 -->
      <KInput
        v-model="search_value"
        v-mouse-tip="{
          text: MOUSE_TIP.kb43,
          type: 'INPUT',
        }"
        :required="false"
        class="k-input"
        :placeholder="mode === 'HERO' ? '英雄名/拼音' : '皮肤名/英雄名'"
        :no-special="false"
        @input="handleSearch"
      />
    </div>
    <KCategory v-model="tab_index" line :options="options" @update:model-value="onTab" />
  </div>
  <div ref="heroListRef" v-scroll-virtualization class="hero-list">
    <HeroSkinCard
      v-for="item in show_list"
      :key="item.id"
      v-mouse-tip
      :data="item"
      :skin-keys="skin_keys"
      :mode="mode"
      :active-id="active_id"
      @click="active_id = item.id"
    />
    <KLoadMore v-if="show_list.length !== 0" :loading="loading" :finish="finish" />
    <KEmpty v-if="show_list.length === 0" :tip="`暂无可选${mode === 'HERO' ? '英雄' : '皮肤'}`" />
  </div>

  <KButton
    v-mouse-tip="{
      text: active_id === 0 ? MOUSE_TIP.pa66 : '',
      disabled: active_id === 0,
    }"
    class="k-button"
    type="warning"
    :disabled="active_id === 0"
    @click="handleReceive($event)"
  >
    领取
  </KButton>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
