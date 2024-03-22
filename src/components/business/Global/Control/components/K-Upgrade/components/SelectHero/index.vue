<script setup lang="ts">
import { ref } from "vue";
import _cloneDeep from "lodash/cloneDeep";

import { HeroUpgradeInfo } from "../../interface";

import HeroCard from "./components/HeroCard/index.vue";

import { FilterTool, KCategory, KEmpty, KInput } from "@/components/business";
import { MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { KVP_HERO, KVP_TYPE, LOCAL_HERO } from "@/api";
import { KnapsackStore } from "@/store";
import { useUserConfigFinish } from "@/hooks";
import { _search } from "@/utils/tool";

const $emit = defineEmits<{
  change: [hero: HeroUpgradeInfo];
}>();

const $knapsackStore = KnapsackStore();

/** 英雄职业列表 */
const options: Game.Hero.Profession[] = ["全部", "坦克", "战士", "刺客", "法师", "射手", "辅助"];
/** 熟练度排序 */
const select_exp = ["默认等级排序", "由低到高", "由高到低"];

/** 搜索值 */
const search_value = ref("");
/** 当前tab栏索引 */
const tab_index = ref(0);
/** 熟练度排序方式 */
const exp_type = ref("默认等级排序");
/** 英雄列表 */
const hero_list = ref<HeroUpgradeInfo[]>([]);

/** 用于展示的列表 */
const show_list = ref<HeroUpgradeInfo[]>([]);

/** @description 用户配置加载完成后生成英雄列表 */
useUserConfigFinish.readPromise.then(async () => {
  const heros = await LOCAL_HERO.getHeroList();
  const data = heros.map(async (item) => {
    const cover = (await KVP_HERO.getHeroImageKvp())[item].cover;
    const coverBlur = (await KVP_HERO.getHeroImageKvp())[item].coverBlur;
    const name = (await KVP_HERO.getHeroNameKvp())[item];
    const avatar = (await KVP_HERO.getHeroAvatarKvp())[item];
    const profession_request = (await KVP_HERO.getHeroProfessionListKvp())[item];
    const profession_list = profession_request.map(async (item) => {
      return (await KVP_TYPE.getProfessionKvp())[item];
    });
    const profession = await Promise.all(profession_list);

    return {
      id: item,
      exp: 0,
      cover,
      coverBlur,
      name,
      avatar,
      profession,
    };
  });

  const b = await Promise.all(data);

  b.filter(async (item) => {
    const id = item.id;
    const hero = $knapsackStore.hero_list[id];
    if (hero) {
      item.exp = hero.exp;
      return true;
    }
  });

  hero_list.value = b;
});

/* 搜索英雄 */
const handleSearch = () => {
  show_list.value = _search<HeroUpgradeInfo>(
    _cloneDeep(hero_list.value),
    search_value.value,
    "name",
    true,
  );
};

/* 熟练度排序 */
const onSelectAttr = (index: number) => {
  exp_type.value = select_exp[index];
  sortAll();
};

/* 点击tab栏 */
const onTab = (index: number) => {
  tab_index.value = index;
  sortAll();
};

/* 一键排序 */
const sortAll = () => {
  if (options[tab_index.value] === "全部") {
    show_list.value = hero_list.value;
  } else {
    show_list.value = hero_list.value.filter((item) =>
      item.profession.includes(options[tab_index.value]),
    );
  }

  if (exp_type.value === "由低到高") {
    show_list.value = show_list.value.sort((a, b) => a.exp - b.exp);
  }

  if (exp_type.value === "由高到低") {
    show_list.value = show_list.value.sort((a, b) => b.exp - a.exp);
  }
};

/* 选择英雄升级 */
const handleSelect = (hero: HeroUpgradeInfo) => {
  $emit("change", hero);
};
</script>

<template>
  <div class="toolbar">
    <div class="top">
      <!-- 等级排序 -->
      <FilterTool :sort-text="exp_type" :options="select_exp" @select="onSelectAttr" />

      <!-- 搜索 -->
      <KInput
        v-model="search_value"
        v-mouse-tip="{
          text: MOUSE_TIP.kb43,
          type: 'INPUT',
        }"
        :required="false"
        class="k-input"
        placeholder="英雄名/拼音"
        :no-special="false"
        @input="handleSearch"
      />
    </div>
    <KCategory v-if="hero_list.length" line :options="options" @tab="onTab" />
  </div>
  <div v-scroll-virtualization class="hero-list">
    <HeroCard v-for="item in show_list" :key="item.id" :data="item" @click="handleSelect(item)" />
    <KEmpty v-if="hero_list.length === 0" tip="你还没有英雄" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
