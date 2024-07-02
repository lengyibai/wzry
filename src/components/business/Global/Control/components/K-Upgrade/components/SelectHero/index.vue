<script setup lang="ts">
import { ref } from "vue";

import type { HeroUpgradeInfo } from "../../interface";

import HeroCard from "./components/HeroCard/index.vue";

import { FilterTool, KCategory, KEmpty, KInput } from "@/components/business";
import { MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { GAME_HERO } from "@/api";
import { KnapsackStore } from "@/store";
import { useUserConfigFinish } from "@/hooks";
import { _cloneDeep, _search } from "@/utils/tool";

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
  const hero_data_list = await GAME_HERO.getHeroDataList();

  hero_list.value = hero_data_list
    .filter((item) => $knapsackStore.hero_list[item.id] !== undefined)
    .map((item) => {
      const { id, cover, coverBlur, name, avatar, profession } = item;
      return {
        exp: $knapsackStore.hero_list[item.id].exp,
        id,
        cover,
        coverBlur,
        name,
        avatar,
        profession,
      };
    });
});

/* 搜索英雄 */
const handleSearch = () => {
  tab_index.value = 0;
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
  search_value.value = "";
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
    <KCategory
      v-if="hero_list.length"
      v-model="tab_index"
      line
      :options="options"
      @update:model-value="onTab"
    />
  </div>
  <div v-scroll-virtualization class="hero-list">
    <HeroCard
      v-for="item in show_list"
      :key="item.id"
      v-mouse-tip
      :data="item"
      @click="handleSelect(item)"
    />
    <KEmpty v-if="show_list.length === 0" tip="暂无可升级英雄" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
