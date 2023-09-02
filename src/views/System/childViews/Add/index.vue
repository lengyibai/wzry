<script setup lang="ts" name="add">
import { defineAsyncComponent, reactive, onActivated } from "vue";

import useManageCard from "../../hooks/useManageCard";

import { $loading } from "@/config";
import { AudioStore } from "@/store";

type Options = Record<
  string,
  {
    /** 标识符 */
    i: number;
    /** 显示 */
    show: boolean;
  }
>;

const AddHero = defineAsyncComponent(() => import("./childViews/AddHero/index.vue"));
const AddSkin = defineAsyncComponent(() => import("./childViews/AddSkin/index.vue"));
const AddSkill = defineAsyncComponent(() => import("./childViews/AddSkill/index.vue"));

const $audioStore = AudioStore();

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
  $audioStore.play();
  $loading.show(list[key]);
};

onActivated(() => {
  $audioStore.play("u4c5");
});
</script>

<template>
  <div class="add" :style="box">
    <transition-group name="add" appear>
      <!-- 卡片 -->
      <K-Manage v-for="(v, k) in list" :key="k" :title="v" type="add" @click="open(k as string)" />
    </transition-group>

    <!--发布列表-->
    <template v-for="(v, k) in options" :key="k">
      <transition name="tv-clip">
        <component :is="components[v.i]" v-if="v.show" v-model="v.show" />
      </transition>
    </template>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
