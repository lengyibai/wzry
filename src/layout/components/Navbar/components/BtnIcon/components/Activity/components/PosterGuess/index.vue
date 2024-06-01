<script setup lang="ts">
import { ref, onMounted, Ref, computed } from "vue";
import { inject } from "vue";

import { ScrollAnimate } from "../../common/helper/scroll-animate";
import { useCloseToStore } from "../../common/hooks/useCloseToStore";
import { useIntoGame } from "../../hooks/useHideActivity";

import GuessGame from "./views/GuessGame/index.vue";
import { useHidePosterGuess } from "./hooks/useHidePosterGuess";

import { KProp } from "@/components/business";
import { $message } from "@/utils/busTransfer";
import { $msgTipText, GAME_CONFIG } from "@/config";
import { _getActivityBannerLink } from "@/utils/concise";
import { AuthStore } from "@/store";
import { vMouseTip } from "@/directives";

const $authStore = AuthStore();

const { setHideActivityPart } = useIntoGame();
const { hide_poster_guess_part, setHidePosterGuessPart } = useHidePosterGuess();

const props: { key: Game.PropKey; num: string }[] = [
  {
    key: "GUESS_COIN",
    num: `${GAME_CONFIG.GUESS_COIN_REWARD_RANGE[0]}~${GAME_CONFIG.GUESS_COIN_REWARD_RANGE[1]}`,
  },
];

/** 关闭活动 */
const closeActivity = inject<() => void>("close-activity")!;
const activityContainerRef = inject<Ref<HTMLElement>>("activityContainerRef")!;

const posterGuessRef = ref<HTMLElement>();
const titleRef = ref<HTMLElement>();
const tipRef = ref<HTMLElement>();
const startRef = ref<HTMLElement>();
const propRefs = ref<InstanceType<typeof KProp>[]>();

/** 是否显示竞猜游戏 */
const show_guess = ref(false);

/** 今日已竞猜次数 */
const guess_count = computed(() => $authStore.user_data.guess.poster.guessCount);

/* 开始竞猜 */
const handleStart = () => {
  if (guess_count.value >= GAME_CONFIG.GUESS_COUNT_LIMIT) {
    $message($msgTipText("xv24", { v: "竞猜次数" }), "error");
    return;
  }
  if (useCloseToStore(closeActivity)) return;

  setHidePosterGuessPart(true);
  setHideActivityPart(true);
  setTimeout(() => {
    show_guess.value = true;
  }, 1000);
};

onMounted(() => {
  let last_end = 0;
  const scrollAnimate = new ScrollAnimate(activityContainerRef.value, posterGuessRef.value!);

  //标题动画
  scrollAnimate.addAnimationStyle(titleRef.value!, (scrollStart) => {
    const end = scrollStart + 500;
    const translateZ = scrollAnimate.createAnimation(scrollStart, end, 0, 1);
    const transform = (scroll: number) => {
      const z = translateZ(scroll);
      return `translateZ(${250 - z * 250}px)`;
    };
    last_end = end - scrollStart;
    return { transform };
  });

  //道具动画
  propRefs.value!.forEach((item, index) => {
    scrollAnimate.addAnimationStyle(item._el!, (scrollStart) => {
      const start = scrollStart + last_end + index * 250;
      const end = start + (index + 1) + 250;
      const opacity = scrollAnimate.createAnimation(start, end, 0, 1);
      const translateX = scrollAnimate.createAnimation(start, end, -100, 0);

      const transform = (scroll: number) => {
        const x = translateX(scroll);
        return `translateX(${x}%)`;
      };
      return { transform, opacity };
    });
  });

  //Tip动画
  scrollAnimate.addAnimationStyle(tipRef.value!, (scrollStart) => {
    last_end = last_end + props.length * 2 * 250;
    const start = scrollStart + last_end;
    const end = start + 500;
    const opacity = scrollAnimate.createAnimation(start, end, 0, 1);
    const translateY = scrollAnimate.createAnimation(start, end, 50, 0);
    const transform = (scroll: number) => {
      const y = translateY(scroll);
      return `translateX(-50%) translateY(-${50 - y}%)`;
    };
    last_end = end - scrollStart;
    return { transform, opacity };
  });

  //竞猜按钮动画
  scrollAnimate.addAnimationStyle(startRef.value!, (scrollStart, scrollEnd) => {
    const start = scrollStart + last_end;
    const opacity = scrollAnimate.createAnimation(start, scrollEnd, 0, 1);
    const translateX = scrollAnimate.createAnimation(start, scrollEnd, 50, 0);

    const transform = (scroll: number) => {
      const x = translateX(scroll);
      return `translateX(${x}%)`;
    };
    return { transform, opacity };
  });

  scrollAnimate.updateMap();
});

defineExpose({
  _el: posterGuessRef,
});
</script>

<template>
  <div ref="posterGuessRef" class="poster-guess">
    <div class="activity-item">
      <img :src="_getActivityBannerLink('activity_poster_guess')" class="bg" alt="" />

      <!-- 标题 -->
      <transition name="to-right">
        <div v-show="!hide_poster_guess_part" ref="titleRef" class="title">海报竞猜</div>
      </transition>

      <!-- 赠送物品 -->
      <transition name="to-right">
        <div v-show="!hide_poster_guess_part" class="reward">
          <KProp
            v-for="(item, index) in props"
            ref="propRefs"
            :key="index"
            class="prop"
            :prop-key="item.key"
            :num="item.num"
          />
        </div>
      </transition>

      <!-- 领奖描述 -->
      <transition name="fade">
        <div v-show="!hide_poster_guess_part" ref="tipRef" class="tip">
          系统将给出一幅
          <span class="green">随机皮肤海报</span>
          ，海报通过
          <span class="blue">颜色反转</span>
          、
          <span class="blue">Y轴翻转</span>
          以及
          <span class="blue">去色</span>
          处理，你有
          <span class="blue">20秒</span>
          时间输入该海报属于哪个
          <span class="green">英雄的名字</span>
          进行回答，回答正确一题可立即获得
          <span class="orange">竞猜币</span>
          奖励，竞猜币数根据
          <span class="green">答题耗时</span>
          发放，答题
          <span class="orange">用时越少，发放越多</span>
          ，竞猜券在
          <span class="red">回答错误</span>
          或
          <span class="red">放弃作答</span>
          时
          <span class="red">扣除</span>
          。
        </div>
      </transition>

      <transition name="to-left">
        <div v-show="!hide_poster_guess_part" ref="startRef" class="start">
          <div v-mouse-tip class="btn" @click="handleStart">开始竞猜</div>
          <div class="tip">今日剩余竞猜次数：{{ GAME_CONFIG.GUESS_COUNT_LIMIT - guess_count }}</div>
        </div>
      </transition>
    </div>
  </div>

  <GuessGame v-if="show_guess" v-model="show_guess" />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
