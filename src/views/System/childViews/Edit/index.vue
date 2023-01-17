<template>
  <div class="edit" :style="box">
    <transition-group name="fade" appear>
      <K-ManageCard
        @click="open(k as string)"
        v-for="(v, k) in list"
        :title="v"
        :key="k"
        type="edit"
      />
    </transition-group>

    <transition name="tv-clip" v-for="(v, k) in options" :key="k">
      <component v-if="v.show" v-model="v.show" :is="components[v.i]" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";

import useManageCard from "../../hooks/useManageCard";

const EditHero = defineAsyncComponent(
  () => import("./childViews/EditHero/index.vue")
); //英雄
const EditSkin = defineAsyncComponent(
  () => import("./childViews/EditSkin/index.vue")
); //皮肤
const EditSkill = defineAsyncComponent(
  () => import("./childViews/EditSkill/index.vue")
); //技能
const EditVoice = defineAsyncComponent(
  () => import("./childViews/EditVoice/index.vue")
); //语音
const EditEquip = defineAsyncComponent(
  () => import("./childViews/EditEquip/index.vue")
); //装备

type Options = Record<
  string,
  {
    i: number; //标识符
    show: boolean; //是否显示
  }
>;

const { box, list } = useManageCard;
const components = [EditHero, EditSkin, EditVoice, EditSkill, EditEquip];

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
});

/* 根据点击卡片索引打开页面 */
const open = (key: string) => {
  options[key].show = true;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
