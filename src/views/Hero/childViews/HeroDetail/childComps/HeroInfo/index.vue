<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";

import HeroTitle from "./childComps/HeroTitle/index.vue";
import HeroBasic from "./childComps/HeroBasic/index.vue";
import HeroRelationship from "./childComps/HeroRelationship/index.vue";
import HeroAttribute from "./childComps/HeroAttribute/index.vue";

import { HeroDetailStore } from "@/store";
import { $tip, $tool } from "@/utils";
import { KScrollTip } from "@/components/business";

const { hero_info } = storeToRefs(HeroDetailStore());

const relationshipRef = ref<InstanceType<typeof HeroRelationship>>();
const downRef = ref<InstanceType<typeof KScrollTip>>();

/** 控制页面元素显示 */
const into = ref(false);

onMounted(() => {
  //设置按顺序出场的动画
  setTimeout(async () => {
    into.value = true;

    await nextTick();

    setTimeout(() => {
      if (!relationshipRef.value?.el) return;
      const focusRelationship = new $tool.FocusElement(relationshipRef.value.el);

      //显示完滚动提示后显示关系提示
      $tip({
        text: "05su",
        align: "right-bottom",
        createFn: () => {
          focusRelationship.focus();
        },
        btnFn: () => {
          focusRelationship.blur();
        },
      });
    }, 1000);
  }, 1000);
});
</script>

<template>
  <div class="basic-info">
    <!-- 英雄标题 -->
    <HeroTitle :class="{ show: !into }" />

    <div class="basic-info__center">
      <!-- 左侧基础数据 -->
      <HeroBasic />

      <transition name="relationship">
        <HeroRelationship v-if="into" ref="relationshipRef" />
      </transition>
    </div>

    <!--  -->
    <div class="basic-info__bottom">
      <!-- 属性 -->
      <transition name="attribute">
        <div v-if="into" class="hero-attribute">
          <HeroAttribute attr="survival" :length="hero_info.survival" />
          <HeroAttribute attr="attack" :length="hero_info.attack" />
          <HeroAttribute attr="effect" :length="hero_info.effect" />
          <HeroAttribute attr="difficulty" :length="hero_info.difficulty" />
        </div>
      </transition>
    </div>
    <!-- 可滚动提示 -->
    <KScrollTip ref="downRef" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
