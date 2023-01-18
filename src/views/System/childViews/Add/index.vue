<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive } from "vue";

import useManageCard from "../../hooks/useManageCard";

import switchStore from "@/store/switch";

const AddHero = defineAsyncComponent(
  () => import("./childViews/AddHero/index.vue")
); //英雄
const AddSkin = defineAsyncComponent(
  () => import("./childViews/AddSkin/index.vue")
); //皮肤
const AddSkill = defineAsyncComponent(
  () => import("./childViews/AddSkill/index.vue")
); //技能
const AddVoice = defineAsyncComponent(
  () => import("./childViews/AddVoice/index.vue")
); //语音
const AddEquip = defineAsyncComponent(
  () => import("./childViews/AddEquip/index.vue")
); //装备

type Options = Record<
  string,
  {
    i: number; //标识符
    show: boolean; //是否显示
  }
>;

const $switchStore = switchStore();

const { box, list } = useManageCard;

const components = [AddHero, AddSkin, AddVoice, AddSkill, AddEquip];

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
  Voice: {
    i: 2,
    show: false,
  },
  Skill: {
    i: 3,
    show: false,
  },
  Equip: {
    i: 4,
    show: false,
  },
});

/* 根据点击卡片索引打开页面 */
const open = (key: string) => {
  options[key].show = true;
  $switchStore.$clickAudio();
};

onMounted(() => {
  $switchStore.$clickAudio("查看详情");
});
</script>

<template>
  <div class="add" :style="box">
    <transition-group name="add" appear>
      <K-ManageCard
        v-for="(v, k) in list"
        :key="k"
        :title="v"
        type="add"
        @click="open(k as string)"
      />
    </transition-group>

    <!--发布列表-->
    <transition v-for="(v, k) in options" :key="k" name="tv-clip">
      <component :is="components[v.i]" v-if="v.show" v-model="v.show" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
