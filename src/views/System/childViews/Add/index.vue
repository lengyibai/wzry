<template>
  <div class="Add flex" :style="box">
    <transition-group name="Add" appear>
      <K-ManageCard @click="open(k as string)" v-for="(v, k) in list" :title="v" :key="k" type="add" />
    </transition-group>

    <!--发布列表-->
    <transition name="clip" v-for="(v, k) in options" :key="k">
      <component v-if="v.show" v-model="v.show" :is="components[v.i]" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import AddHero from './childViews/AddHero/index.vue'; //英雄
import AddSkin from './childViews/AddSkin/index.vue'; //皮肤
import AddSkill from './childViews/AddSkill/index.vue'; //技能
import AddVoice from './childViews/AddVoice/index.vue'; //语音
import AddStory from './childViews/AddStory/index.vue'; //故事
import AddEquip from './childViews/AddEquip/index.vue'; //装备
import AddEpigraph from './childViews/AddEpigraph/index.vue'; //铭文
import useManageCard from '../../hooks/useManageCard';

const { box, list } = useManageCard;
const components = [AddHero, AddSkin, AddVoice, AddSkill, AddStory, AddEquip, AddEpigraph];

interface Options {
  [propName: string]: {
    i: number,
    show: boolean
  }
}

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
  Story: {
    i: 4,
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
@import './index.less';
</style>
