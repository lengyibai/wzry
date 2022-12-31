<template>
  <div class="del" :style="box">
    <transition-group name="del" appear>
      <K-ManageCard
        @click="open(k as string)"
        v-for="(v, k) in list"
        :title="v"
        :key="k"
        type="delete"
      />
    </transition-group>

    <!--发布列表-->
    <transition name="clip" v-for="(v, k) in options" :key="k">
      <component v-if="v.show" v-model="v.show" :is="components[v.i]" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";
import useManageCard from "../../hooks/useManageCard";

const DelHero = defineAsyncComponent(
  () => import("./childViews/DelHero/index.vue")
); //英雄
const DelSkin = defineAsyncComponent(
  () => import("./childViews/DelSkin/index.vue")
); //皮肤
const DelSkill = defineAsyncComponent(
  () => import("./childViews/DelSkill/index.vue")
); //技能
const DelVoice = defineAsyncComponent(
  () => import("./childViews/DelVoice/index.vue")
); //语音
const DelEquip = defineAsyncComponent(
  () => import("./childViews/DelEquip/index.vue")
); //装备
const DelEpigraph = defineAsyncComponent(
  () => import("./childViews/DelEpigraph/index.vue")
); //铭文

type Options = Record<
  string,
  {
    i: number; //标识符
    show: boolean; //是否显示
  }
>;

const { box, list } = useManageCard;
const components = [
  DelHero,
  DelSkin,
  DelVoice,
  DelSkill,
  DelEquip,
  DelEpigraph,
];

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
    i: 5,
    show: false,
  },
  Epigraph: {
    i: 6,
    show: false,
  },
});

/* 根据点击卡片索引打开页面 */
const open = (key: string) => {
  options[key].show = true;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
