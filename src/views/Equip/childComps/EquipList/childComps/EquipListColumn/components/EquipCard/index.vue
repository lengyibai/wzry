<script setup lang="ts">
import { ref, computed } from "vue";

import { vBlurLoad, vAnimateNumber } from "@/directives";
import { AudioStore, EquipStore } from "@/store";

interface Props {
  /** 装备信息 */
  equip: Equip.Data;
  /** 显示左线 */
  leftLine?: boolean;
  /** 显示右线 */
  rightLine?: boolean;
}

const $props = defineProps<Props>();

const $equipStore = EquipStore();
const $audioStore = AudioStore();

const iconRef = ref<HTMLElement>();
const priceRef = ref<HTMLElement>();

/** 获取点击的装备id */
const active_id = computed(() => $equipStore.active_id);
/** 装备文字是否开启柔光 */
const shine = computed(() => $props.leftLine || $props.rightLine);

/* 查看装备详情 */
const handleDetail = () => {
  $equipStore.setEquipActive($props.equip.id);
  $audioStore.play("n4r4");
};
</script>

<template>
  <div class="equip-card" @click="handleDetail">
    <!-- 选中圆圈 -->
    <transition name="border-fade">
      <div v-show="active_id === equip.id" class="border"></div>
    </transition>

    <!-- 装备图标 -->
    <img ref="iconRef" v-blurLoad="equip.icon" class="blur" :src="equip.iconBlur" alt="" />

    <!-- 左线 -->
    <transition name="left-line">
      <div v-if="leftLine" class="left-line"></div>
    </transition>

    <!-- 右线 -->
    <transition name="right-line" mode="in-out">
      <div v-if="rightLine" class="right-line"></div>
    </transition>

    <!-- 右侧装备信息 -->
    <div class="box">
      <div class="name" :class="{ shine: shine }">{{ equip.name }}</div>
      <div class="info">
        <div v-if="equip.desc" class="desc" :class="{ shine: shine }">
          {{ equip.desc }}
        </div>
        <div
          ref="priceRef"
          v-animateNumber="{
            num: equip.price,
          }"
          class="price"
          :class="{ shine: shine }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
