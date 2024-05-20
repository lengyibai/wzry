<script setup lang="ts">
import { nextTick, ref, computed, onUnmounted } from "vue";

import { vDrag } from "./directives/drag";

import { HeroDetailStore, KnapsackStore } from "@/store";
import { vMouseTip } from "@/directives";
import { $mouseTipText, SCENE_TIP } from "@/config";
import { useHaveHeroSkin } from "@/hooks";
import { $tip, $focus } from "@/utils/busTransfer";
import { _isPhone, _promiseTimeout } from "@/utils/tool";
import { _getMiscLink } from "@/utils/concise";

const $emit = defineEmits<{
  "bg-imgs": [data: number[]];
}>();

const $heroDetail = HeroDetailStore();
const $knapsackStore = KnapsackStore();

const skinRef = ref<HTMLElement[]>();
const skinHeadRef = ref<HTMLElement>();
const skinBoxRef = ref<HTMLElement>();

/** 用于切换背景 */
let toggle = true;
/** 当前处于展示的皮肤的DOM元素及坐标 */
const active_skin: { el: HTMLElement | null; transform: string } = {
  el: null,
  transform: "",
};

/** 拖动头像进入头像框范围 */
const is_into_drag = ref(false);
/** 用于头像容器初次加载显示 */
const show_skin_box = ref(false);
/** 用于头像初次加载显示 */
const show_skin_head = ref(false);

/** 皮肤列表 */
const skins = computed(() => $heroDetail.hero_info.skins);
/** 是否存在该皮肤 */
const is_have = computed(() => {
  return (id: number) => {
    return $knapsackStore.skin_list.includes(id) || id === 0;
  };
});

/* 将正在展示的皮肤头像过渡到初始位置 */
const initPosition = () => {
  if (active_skin.el) {
    active_skin.el.style.pointerEvents = "auto";
    active_skin.el.style.left = "0";
    active_skin.el.style.top = "0";
    active_skin.el.style.transition = "all 1s";
    active_skin.el.style.transform = active_skin.transform;
  }
};

/* 将要展示的皮肤头像过渡到头像框的位置 */
const setPosition = (data: HTMLElement | null) => {
  if (data) {
    data.style.pointerEvents = "none";
    data.style.transition = "all 1s";
    data.style.left = "0px";
    data.style.top = "0px";
    data.style.transform = "";
  }
};

/* 自定义指令按下回调 */
const onDownCallback = (id: number) => {
  return () => {
    id !== 0 && useHaveHeroSkin(id, "SKIN");
  };
};

/* 自定义指令函数回调 */
const handleDrag = (
  data: HTMLElement,
  offset: { x: number; y: number } | boolean,
  index: number,
) => {
  if (!data) return;
  //清除正在拖拽的皮肤头像动画，避免拖拽高延迟
  data.style.transition = "all 0s";
  data.style.zIndex = "2";
  //offset用来判断是移动触发的还是松开触发的
  if (offset && skinHeadRef.value) {
    const o = offset as { x: number; y: number };
    initPosition();
    //判断头像是否进入头像框可吸附范围
    const d = skinHeadRef.value.getBoundingClientRect();
    is_into_drag.value =
      d.left < o.x &&
      d.top < o.y &&
      d.left + skinHeadRef.value.offsetWidth > o.x &&
      d.top + skinHeadRef.value.offsetHeight > o.y;
  } else if (is_into_drag.value) {
    //松手触发，并且头像已进入头像框吸附范围
    initPosition();
    //记录正在展示的皮肤头像DOM元素及坐标
    active_skin.el = data;
    active_skin.transform = data.style.transform;
    setPosition(data);
    //有一秒的过渡动画，动画结束后执行以下
    setTimeout(() => {
      data.style.zIndex = "1";
      //切换背景图
      if (toggle) {
        $emit("bg-imgs", [1, index]);
      } else {
        $emit("bg-imgs", [0, index]);
      }
      /** 用于皮肤背景的切换动画 */
      toggle = !toggle;
    }, 1000);
  } else {
    setPosition(active_skin.el);
    data.style.transition = "all 1s ease-out";
    setTimeout(() => {
      data.style.left = "0";
      data.style.top = "0";
    });
  }
};

/* 当滚动到皮肤页，播放入场动画 */
$heroDetail.setScrollFn("skin", async (pageName) => {
  if (show_skin_head.value || pageName !== "皮肤语音") return;
  show_skin_box.value = true;

  /* 动画播放完毕后，将原皮设置展示 */
  await _promiseTimeout(1000);
  show_skin_head.value = true;

  await _promiseTimeout(1000);
  is_into_drag.value = true;

  nextTick(() => {
    if (!skinRef.value) return;
    handleDrag(skinRef.value[0], false, 0);
    setPosition(skinRef.value[0]);

    if (skins.value.length < 2) return;
    setTimeout(() => {
      if (_isPhone) {
        $tip({
          text: SCENE_TIP.lp57,
          align: "right-top",
          color: false,
          createFn() {
            $focus.show(skinBoxRef.value!);
          },
          btnFn: $focus.close,
        });
      } else {
        $tip({
          text: SCENE_TIP.v44s,
          align: "right-top",
          color: false,
          createFn() {
            $focus.show(skinBoxRef.value!);
          },
          btnFn: $focus.close,
        });
      }
    }, 3000);
  });
});

onUnmounted(() => {
  $heroDetail.removeScrollFn("skin");
});
</script>

<template>
  <div ref="skinBoxRef" class="hero-skin-head-img" :class="{ into: show_skin_box }">
    <!--中心头衔框-->
    <div
      ref="skinHeadRef"
      class="show-skin"
      :style="{
        backgroundImage: `url(${_getMiscLink('head_bg')})`,
      }"
    >
      {{ is_into_drag ? "松开" : "拖过来" }}
    </div>
    <!--光晕-->
    <transition name="fade">
      <div
        v-show="is_into_drag"
        class="show-skin clone"
        :style="{
          backgroundImage: `url(${_getMiscLink('head_bg_clone')})`,
        }"
      ></div>
    </transition>

    <!--皮肤头像-->
    <button
      v-for="(item, index) in skins"
      ref="skinRef"
      :key="index"
      v-drag="{
        handleDrag,
        downCallback: onDownCallback(item.id),
        index,
        enable: is_have(item.id),
      }"
      v-mouse-tip="{
        text: is_have(item.id)
          ? $mouseTipText('kz53', { v: '皮肤' })
          : $mouseTipText('d7i9', { v: '皮肤' }),
        disabled: !is_have(item.id),
      }"
      class="skin"
      :class="{
        absent: !is_have(item.id),
      }"
      :style="{
        transform: show_skin_head
          ? ' translateX(65%) translateY(75%) rotate(' +
            (360 / skins!.length || 0) * (index + 1) +
            'deg) translateY(-200%)'
          : '',
      }"
    >
      <img :src="item.avatar" alt="" />
    </button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
