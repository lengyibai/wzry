<script setup lang="ts">
import { defineAsyncComponent, reactive, onActivated, StyleValue } from "vue";

import { AudioStore } from "@/store";
import { $loading } from "@/utils";

defineOptions({
  name: "add",
});

const AddHero = defineAsyncComponent(
  () => import("./childViews/AddHero/index.vue"),
);
const AddSkin = defineAsyncComponent(
  () => import("./childViews/AddSkin/index.vue"),
);
const AddSkill = defineAsyncComponent(
  () => import("./childViews/AddSkill/index.vue"),
);

const $audioStore = AudioStore();

const box: StyleValue = {
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  overflow: "auto",
  alignContent: "flex-start",
};

const list: Record<string, string> = {
  Hero: "英雄",
  Skin: "皮肤",
  Skill: "技能",
};

const components = [AddHero, AddSkin, AddSkill];

/* 循环判断打开页面 */
const options: Record<
  string,
  {
    /** 标识符 */
    i: number;
    /** 显示 */
    show: boolean;
  }
> = reactive({
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
      <K-Manage
        v-for="(v, k) in list"
        :key="k"
        :title="v"
        type="add"
        @click="open(k as string)"
      />
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
