<script setup lang="ts">
import { onMounted, onBeforeUnmount, provide, ref } from "vue";
import _debounce from "lodash/debounce";

import JoinGroup from "./components/JoinGroup/index.vue";
import PosterGuess from "./components/PosterGuess/index.vue";
import SkillGuess from "./components/SkillGuess/index.vue";
import { useHideActivity } from "./hooks/useHideActivity";
import { ActivityInfo } from "./interface";

import { vMouseTip } from "@/directives";
import { $mouseTipText, MOUSE_TIP } from "@/config";
import { useHideLayout } from "@/layout/common/hooks/useHideLayout";
import { _calculateProgress } from "@/utils/tool";

const modelValue = defineModel<boolean>({ required: true });

const { setHideStatus } = useHideLayout();
const { hide_all } = useHideActivity();

/** 全屏模式下滚动到指定位置计算存在误差，需要记录非全屏下的视口高度 */
const viewport_height = window.innerHeight;

const activityContainerRef = ref<HTMLElement>();
const joinGroupRef = ref<InstanceType<typeof JoinGroup>>();
const posterGuessRef = ref<InstanceType<typeof PosterGuess>>();
const skillGuessRef = ref<InstanceType<typeof SkillGuess>>();

/** 活动列表 */
const page_list = ref<ActivityInfo[]>([]);

/** 是否显示 */
const show = ref(true);
/** 当前进度 */
const progress = ref(0);
/** 当前滚动坐标 */
const scroll_position = ref(0);
/** 当前显示的活动 */
const current_activity = ref<ActivityInfo>();

/* 初始化坐标 */
const initPosition = () => {
  //封装元素顶部距离父元素顶部高度与元素底部距离父元素顶部高度
  const position = (ref: typeof joinGroupRef) => {
    if (!ref.value || !ref.value._el) {
      return {
        top: 0,
        bottom: 0,
      };
    }

    return {
      top: ref.value._el.offsetTop,
      bottom: ref.value._el.offsetTop + ref.value._el.offsetHeight,
    };
  };

  page_list.value = [
    {
      label: "快到群里来",
      start: 0,
      end: position(joinGroupRef).bottom,
      height: joinGroupRef.value!._el!.offsetHeight,
    },
    {
      label: "海报竞猜",
      start: position(posterGuessRef).top,
      end: position(posterGuessRef).bottom,
      height: posterGuessRef.value!._el!.offsetHeight,
    },
    {
      label: "技能竞猜",
      start: position(skillGuessRef).top,
      end: position(skillGuessRef).bottom,
      height: skillGuessRef.value!._el!.offsetHeight,
    },
    {
      label: "",
      start:
        position(skillGuessRef).top + skillGuessRef.value!._el!.offsetHeight - window.innerHeight,
      end: 0,
      height: 0,
    },
  ];
};

/* 通过传递坐标获取坐标对应的滚动索引信息 */
const getScrollIndexInfo = (y: number) => {
  return page_list.value.find((item) => {
    return y >= item.start && y <= item.end;
  });
};

/* 滚动触发 */
const handleScroll = (e: Event) => {
  const el = e.target as HTMLElement;
  const starts = page_list.value.map((item) => item.start);
  progress.value = _calculateProgress(el.scrollTop, starts);
  scroll_position.value = el.scrollTop;
  current_activity.value = getScrollIndexInfo(el.scrollTop);
};

/* 滚动到指定位置 */
const handleScrollTo = (scrollTop: number) => {
  activityContainerRef.value?.scroll({
    top: scrollTop - viewport_height,
    behavior: "smooth",
  });
};

/* 全屏或退出全屏时，滚动到当前活动的顶部 */
const debounceBackActivityTop = _debounce(() => {
  if (current_activity.value) {
    handleScrollTo(current_activity.value.end);
  }
}, 100);

/* 关闭活动 */
const closeActivity = () => {
  show.value = false;

  setTimeout(() => {
    modelValue.value = false;
  }, 500);

  setHideStatus(false);
};

provide("activityContainerRef", activityContainerRef);
provide("close-activity", closeActivity);

onMounted(() => {
  initPosition();

  window.addEventListener("resize", () => {
    debounceBackActivityTop();
  });

  setTimeout(() => {
    handleScrollTo(joinGroupRef.value!._el!.offsetHeight);
  }, 500);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", debounceBackActivityTop);
});
</script>

<template>
  <teleport to="body">
    <transition name="fade" appear>
      <div v-if="show" class="activity">
        <!-- 关闭按钮 -->
        <transition name="tool" appear>
          <div
            v-show="show && !hide_all"
            v-mouse-tip="{
              text: MOUSE_TIP.mk66,
            }"
            class="close"
            @click="closeActivity"
          ></div>
        </transition>

        <!-- 活动列表 -->
        <div ref="activityContainerRef" class="activity-container" @scroll="handleScroll">
          <JoinGroup ref="joinGroupRef" />
          <PosterGuess ref="posterGuessRef" />
          <SkillGuess ref="skillGuessRef" />
        </div>

        <!-- 活动进度 -->
        <transition name="tool" appear>
          <div v-show="show && !hide_all" class="progress">
            <div class="title-list">
              <div
                v-for="(item, index) in page_list"
                :key="index"
                v-mouse-tip="{
                  text: $mouseTipText('e8p6', { v: item.label }),
                }"
                class="title"
                :class="{
                  color: item.start <= scroll_position && scroll_position < item.end,
                  'active-dot': item.start <= scroll_position,
                }"
                @click="handleScrollTo(item.end)"
                v-html="item.label"
              ></div>
            </div>
            <div class="bar-box">
              <div
                class="bar"
                :style="{
                  height: `${progress}%`,
                }"
              ></div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>