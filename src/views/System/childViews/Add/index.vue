<script setup lang="ts" name="add">
import { defineAsyncComponent, reactive, onActivated } from "vue";

import useManageCard from "../../hooks/useManageCard";

import switchStore from "@/store/switch";

type Options = Record<
  string,
  {
    i: number; //标识符
    show: boolean; //显示
  }
>;

const AddHero = defineAsyncComponent(() => import("./childViews/AddHero/index.vue")); //英雄
const AddSkin = defineAsyncComponent(() => import("./childViews/AddSkin/index.vue")); //皮肤
const AddSkill = defineAsyncComponent(() => import("./childViews/AddSkill/index.vue")); //技能

const $switchStore = switchStore();

const { box, list } = useManageCard;

const components = [AddHero, AddSkin, AddSkill];

/* 循环判断打开页面 */
const options: Options = reactive({
  Hero: {
    i: 0,
    show: false,
  },
  Skin: {
    i: 1,
    show: false,
  },
  Skill: {
    i: 2,
    show: false,
  },
});

/* 根据点击卡片索引打开页面 */
const open = (key: string) => {
  options[key].show = true;
  $switchStore.$clickAudio();
  $switchStore.$loading.show("正在加载添加" + list[key] + "页面");
};

onActivated(() => {
  $switchStore.$clickAudio("u4c5");
});
</script>

<template>
  <div class="add" :style="box">
    <transition-group name="add" appear>
      <!-- 卡片 -->
      <K-Manage v-for="(v, k) in list" :title="v" type="add" @click="open(k as string)" :key="k" />
    </transition-group>

    <!--发布列表-->
    <transition v-for="(v, k) in options" name="tv-clip" :key="k">
      <component :is="components[v.i]" v-if="v.show" v-model="v.show" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
