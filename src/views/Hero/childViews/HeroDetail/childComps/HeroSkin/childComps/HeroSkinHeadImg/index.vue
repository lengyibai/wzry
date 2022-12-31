<template>
  <div class="hero-skin-head-img flex" :class="{ into: show_skin_head }">
    <!--中心头衔框-->
    <div class="show-skin flex" ref="showSkin">
      {{ is_into_drap ? "松开" : "拖过来" }}
    </div>
    <!--光晕-->
    <transition name="fade">
      <div class="show-skin flex clone" v-show="is_into_drap"></div>
    </transition>

    <!--皮肤头像-->
    <button
      ref="skin"
      class="skin"
      v-drag="{ fn: handleDrag, index }"
      v-for="(item, index) in skins"
      :key="index"
      :style="{
      transform: show_skin_head ? 'rotate(' + (360 / skins!.length || 0) * (index + 1) + 'deg) translateY(-200%)' : '',
    }"
    >
      <img @dragstart.prevent :src="item.headImg" alt="" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import heroDetail from "@/store/heroDetail";
import heroDetailStore from "@/store/heroDetail";

interface Emits {
  (e: "bg-imgs", data: number[]): void;
}

const skin = ref();
const showSkin = ref();
const $heroDetail = heroDetail();
const $heroDetailStore = heroDetailStore();

const skins = ref<Hero.Skin[] | undefined>([]);
const toggle = ref(true); //用于切换背景
const is_into_drap = ref(false); //拖动头像是否进入头像框范围
const show_skin_head = ref(false); //用于头像初次加载显示
skins.value = $heroDetail.hero_info.skins;
const active_skin = reactive<{ el: HTMLElement | null; transform: string }>({
  el: null,
  transform: "",
}); //当前处于展示的皮肤的DOM元素及坐标

/* 皮肤头像拖动事件 */
const emit = defineEmits<Emits>();

/* 判断是否存在正在展示的皮肤，存在就将此皮肤头像过渡到初始位置 */
const initPosition = () => {
  if (active_skin.el) {
    active_skin.el.style.pointerEvents = "auto";
    active_skin.el.style.transition = "all 1s";
    active_skin.el.style.transform = active_skin.transform;
  }
};

/* 将要展示的皮肤头像过渡到头像框的位置 */
const setPosition = (data: HTMLElement | null) => {
  if (data) {
    data.style.pointerEvents = "none";
    data.style.transition = "all 1s";
    data.style.left = `calc(50% - ${data.offsetWidth / 2}px)`;
    data.style.top = `calc(50% - ${data.offsetHeight / 2}px)`;
    data.style.transform = "";
  }
};

/* 自定义指令函数回调 */
const handleDrag = (
  data: HTMLElement,
  offset: { x: number; y: number } | boolean,
  index: number
) => {
  if (!data) return;
  data.style.transition = "all 0s"; //清除正在拖拽的皮肤头像动画，避免拖拽高延迟
  data.style.zIndex = "2";
  //offset用来判断是移动触发的还是松开触发的
  if (offset) {
    const o = offset as { x: number; y: number };
    initPosition();
    //判断头像是否进入头像框可吸附范围
    const d = showSkin.value.getBoundingClientRect();
    is_into_drap.value =
      d.left < o.x &&
      d.top < o.y &&
      d.left + showSkin.value.offsetWidth > o.x &&
      d.top + showSkin.value.offsetHeight > o.y;
  } else if (is_into_drap.value) {
    /* 松手触发，并且头像已进入头像框吸附范围 */
    initPosition();
    /* 记录正在展示的皮肤头像DOM元素及坐标 */
    active_skin.el = data;
    active_skin.transform = data.style.transform;
    setPosition(data);
    //有一秒的过渡动画，动画结束后执行以下
    setTimeout(() => {
      data.style.zIndex = "1";
      //切换背景图
      if (toggle.value) {
        emit("bg-imgs", [1, index]);
      } else {
        emit("bg-imgs", [0, index]);
      }
      toggle.value = !toggle.value; //用于皮肤背景的切换动画
    }, 1000);
  } else {
    setPosition(active_skin.el);
  }
};

$heroDetailStore.setScollFn((index) => {
  if (index === 2 && !show_skin_head.value) {
    show_skin_head.value = true;
    /* 动画播放完毕后，将原皮设置展示 */
    setTimeout(() => {
      is_into_drap.value = true;
      nextTick(() => {
        handleDrag(skin.value[0], false, 0);
        setPosition(skin.value[0]);
      });
    }, 1000);
  }
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
