<template>
  <div class="hero-skill-icon">
    <div
      class="icon cursor-pointer"
      :class="{ active: show }"
      ref="skillImg"
      v-for="(item, index) in hero_data.skills"
      :style="{
        'transition-delay': 0.05 * index + 's',
      }"
      :key="index"
    >
      <transition name="border-fade">
        <div class="border" v-show="currentIndex === index"></div>
      </transition>
      <img :src="item.img" @click="selectSkill(index)" />
      <img :src="item.img" :class="{ active: currentIndex === index }" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";
import heroDetailStore from "@/store/heroDetail";

const $heroStore = heroStore();
const $heroDetailStore = heroDetailStore();

const show = ref(false);
const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据
hero_data.value = $heroStore.hero_info;
const currentIndex = ref(0); //处于展示的技能索引

$heroDetailStore.setScollFn((index) => {
  if (index === 3) {
    show.value = true;
  }
});

/* 点击需要展示的技能 */
const emit = defineEmits<{
  (e: "select-skill", index: number): void;
}>();

/* 点击技能后传递索引号 */
const selectSkill = (index: number) => {
  currentIndex.value = index;
  emit("select-skill", index);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
