<script setup lang="ts">
import { ref, computed } from "vue";

import { vAnimateNumber, vMouseTip } from "@/directives";
import { EquipStore } from "@/store";
import { KLoadingRadiate } from "@/components/business";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 装备信息 */
  equip: Game.Equip.Data;
  /** 显示左线 */
  leftLine?: boolean;
  /** 显示右线 */
  rightLine?: boolean;
}

const $props = defineProps<Props>();

const $equipStore = EquipStore();

const { playAudio } = usePlayAudio();

const priceRef = ref<HTMLElement>();

/** 获取点击的装备id */
const active_id = computed(() => $equipStore.active_id);
/** 装备文字是否开启柔光 */
const shine = computed(() => $props.leftLine || $props.rightLine);

/** @description 查看装备详情 */
const handleDetail = () => {
  $equipStore.setEquipActive($props.equip.id);
  playAudio("n4r4");
};
</script>

<template>
  <div v-mouse-tip class="equip-card" @click="handleDetail">
    <!-- 选中圆圈 -->
    <transition name="fade">
      <div v-show="active_id === equip.id" class="round"></div>
    </transition>

    <!-- 装备图标 -->
    <KLoadingRadiate
      class="k-loading-radiate"
      :link="equip.icon"
      width="4.6875rem"
      height="4.6875rem"
    />

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
          v-animate-number="{
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
