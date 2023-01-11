<script setup lang="ts">
import { defineAsyncComponent, reactive } from "vue";
import useManageCard from "../../hooks/useManageCard";

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
};
</script>

<template>
  <div class="add" :style="box">
    <transition-group name="add" appear>
      <K-ManageCard
        @click="open(k as string)"
        v-for="(v, k) in list"
        :title="v"
        :key="k"
        type="add"
      />
    </transition-group>

    <!--发布列表-->
    <transition name="tv-clip" v-for="(v, k) in options" :key="k">
      <component v-if="v.show" v-model="v.show" :is="components[v.i]" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
