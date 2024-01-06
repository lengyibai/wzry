<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";

import HeroTitle from "./childComps/HeroTitle/index.vue";
import HeroBasic from "./childComps/HeroBasic/index.vue";
import HeroAttributes from "./childComps/HeroAttributes/index.vue";
import HeroResume from "./childComps/HeroResume/index.vue";

import { HeroDetailStore } from "@/store";
import { $tip, $tool } from "@/utils";
import { KScrollTip } from "@/components/business";

const downRef = ref<InstanceType<typeof KScrollTip>>();

/** 控制页面元素显示 */
const into = ref(true);

onMounted(() => {
  //设置按顺序出场的动画
  // setTimeout(async () => {
  //   into.value = true;
  //   await nextTick();
  //   setTimeout(() => {
  //     if (!relationshipRef.value?.el) return;
  //     const focusRelationship = new $tool.FocusElement(relationshipRef.value.el);
  //     //显示完滚动提示后显示关系提示
  //     $tip({
  //       text: "05su",
  //       align: "right-bottom",
  //       createFn: () => {
  //         focusRelationship.focus();
  //       },
  //       btnFn: () => {
  //         focusRelationship.blur();
  //       },
  //     });
  //   }, 1000);
  // }, 1000);
});
</script>

<template>
  <div class="hero-info">
    <!-- 英雄标题 -->
    <HeroTitle :class="{ show: !into }" />

    <div class="content">
      <HeroBasic />
      <HeroResume />
      <HeroAttributes />
    </div>

    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
