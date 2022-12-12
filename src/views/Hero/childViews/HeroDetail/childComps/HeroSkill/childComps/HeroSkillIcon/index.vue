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
      <img :src="item.img" @click="handleSelectSkill(index)" />
      <img :src="item.img" :class="{ active: currentIndex === index }" />
    </div>

    <!-- 底部内容 -->
    <i
      v-if="hero_data.deputy.length"
      class="toggle iconfont wzry-qiehuan cursor-pointer"
      :class="{ 'hide-bottom': !show, deputy: status }"
      @click="handleToggleSkill"
      title="切换技能"
    ></i>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";
import heroDetailStore from "@/store/heroDetail";

interface Props {
  status: boolean;
}
withDefaults(defineProps<Props>(), {
  status: false,
});

const $heroStore = heroStore();
const $heroDetailStore = heroDetailStore();

const show = ref(false);
const currentIndex = ref(0); //处于展示的技能索引
const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据
hero_data.value = $heroStore.hero_info;

$heroDetailStore.setScollFn((index) => {
  if (index === 3) {
    show.value = true;
  }
});
/* 点击需要展示的技能 */
const emit = defineEmits<{
  (e: "select-skill", index: number): void;
  (e: "toggle-skill"): void;
}>();

/* 点击技能后传递索引号 */
const handleSelectSkill = (index: number) => {
  currentIndex.value = index;
  emit("select-skill", index);
};

/* 切换副技能 */
const handleToggleSkill = () => {
  emit("toggle-skill");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
