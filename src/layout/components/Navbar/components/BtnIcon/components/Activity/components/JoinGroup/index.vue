<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import { inject } from "vue";

import { ScrollAnimate } from "../../common/helper/scroll-animate";

import { _getActivityBannerLink, _getMiscLink } from "@/utils/concise";

const activityContainerRef = inject<Ref<HTMLElement>>("activityContainerRef")!;

const joinGroupRef = ref<HTMLElement>();
const activityItemRef = ref<HTMLImageElement>();
const titleRef = ref<HTMLElement>();
const qrCodeRef = ref<HTMLElement>();
const tipRef = ref<HTMLElement>();

onMounted(() => {
  let last_end = 0;
  const scrollAnimate = new ScrollAnimate(activityContainerRef.value, joinGroupRef.value!);

  //背景图动画
  scrollAnimate.addAnimationStyle(activityItemRef.value!, (scrollStart) => {
    const end = scrollStart + 500;
    const opacity = scrollAnimate.createAnimation(scrollStart, end, 0, 1);
    last_end = end - scrollStart;
    return { opacity };
  });

  //标题动画
  scrollAnimate.addAnimationStyle(titleRef.value!, (scrollStart) => {
    const start = scrollStart + last_end;
    const end = start + 500;
    const translateZ = scrollAnimate.createAnimation(start, end, 0, 1);
    const transform = (scroll: number) => {
      const z = translateZ(scroll);
      return `translateZ(${250 - z * 250}px)`;
    };
    last_end = end - scrollStart;
    return { transform };
  });

  //二维码动画
  scrollAnimate.addAnimationStyle(qrCodeRef.value!, (scrollStart) => {
    const start = scrollStart + last_end;
    const end = start + 500;
    const translateZ = scrollAnimate.createAnimation(start, end, 0, 1);
    const transform = (scroll: number) => {
      const z = translateZ(scroll);
      return `translateZ(${250 - z * 250}px)`;
    };
    last_end = end - scrollStart;
    return { transform };
  });

  //Tip动画
  scrollAnimate.addAnimationStyle(tipRef.value!, (scrollStart, scrollEnd) => {
    const start = scrollStart + last_end;
    const opacity = scrollAnimate.createAnimation(start, scrollEnd, 0, 1);
    const translateY = scrollAnimate.createAnimation(start, scrollEnd, 50, 0);
    const transform = (scroll: number) => {
      const y = translateY(scroll);
      return `translateX(-50%) translateY(-${50 - y}%)`;
    };
    return { transform, opacity };
  });

  scrollAnimate.updateMap();
});

defineExpose({
  _el: joinGroupRef,
});
</script>

<template>
  <div ref="joinGroupRef" class="join-group">
    <div ref="activityItemRef" class="activity-item">
      <img :src="_getActivityBannerLink('activity_join_group')" class="bg" alt="" />
      <div ref="titleRef" class="title">快到群里来！</div>

      <!-- 领奖描述 -->
      <div ref="tipRef" class="tip">
        欢迎加群<span class="blue">讨论技术</span>及<span class="green">体验反馈</span>
        ，如果你在体验过程中遇到<span class="red">设计不人性化</span>、
        <span class="red">功能不合理</span>、<span class="red">功能未正常加载</span>、
        <span class="red">点击按钮无反馈</span>、<span class="red">元素样式错位</span>、
        <span class="red">图片加载失败</span>等各种问题，请积极在群里
        <span class="blue">@冷弋白</span>，一个合格的
        <span class="green">独立开发者</span>绝不会放过网站里任何一处
        <span class="red">细节漏洞</span>。
      </div>

      <!-- 群二维码 -->
      <img ref="qrCodeRef" class="qr-code" :src="_getMiscLink('activity_group_code')" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
