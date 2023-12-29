<script setup lang="ts">
import { ref, computed } from "vue";

import { HeroStore } from "@/store";
import { vBlurLoad, vMaskGradient, vSweepLight, vTextHoverColor } from "@/directives";
import { $concise } from "@/utils";

interface Props {
  /** 英雄数据 */
  data: Game.Hero.Data;
}

defineProps<Props>();

const $emit = defineEmits<{
  view: [];
}>();

const $heroStore = HeroStore();

const { getImgLink } = $concise;

/** 显示查看详情选项 */
const show = ref(false);
/** 头像是否加载完成 */
const finish = ref(false);

/** 用于身高和皮肤数量排序显示相应数字 */
const num_type = computed(() => $heroStore.misc_sort);
/** 显示右上角数字 */
const show_num = computed(() => ["身高", "皮肤数量", "关系数量"].includes(num_type.value));

/** 单位格式化 */
const num = (data: Game.Hero.Data) => {
  const numType = num_type.value;

  const obj: Record<string, string> = {
    身高: data.height + "cm",
    皮肤数量: (data.skinCount || 0) + "款",
    关系数量: (data.relationCount || 0) + "位",
  };

  return obj[numType] || "";
};

/* 查看详情 */
const handleViewClick = () => {
  $emit("view");
};
</script>

<template>
  <div
    v-maskGradient
    v-sweepLight
    class="hero-card"
    :class="{ hide: show }"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <!-- 编号 -->
    <span class="id">No.{{ data.id }}</span>

    <!-- 身高、皮肤数量/ -->
    <span v-if="show_num" class="num">{{ num(data) }}</span>

    <!-- 悬浮蒙版 -->
    <transition name="fade">
      <div v-if="show" class="select-mask">
        <img
          :src="finish ? data.avatar : getImgLink('unknown')"
          class="head"
          @click="handleViewClick"
          @load="finish = true"
        />
        <button v-textHoverColor class="view" @click="handleViewClick">点击此处</button>
      </div>
    </transition>

    <!-- 背景图 -->
    <img v-blurLoad="data.cover" class="bg" :src="data.coverBlur" />

    <!-- 底部名字、代号 -->
    <div class="bottom">
      <div class="name" v-html="data.name"></div>
      <div class="mark">{{ data.mark }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
