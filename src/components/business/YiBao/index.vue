<script setup lang="ts">
import { onMounted, ref } from "vue";
import { provide } from "vue";
import { storeToRefs } from "pinia";

import Eyes from "./components/Eyes/index.vue";
import Blush from "./components/Blush/index.vue";
import Mouth from "./components/Mouth/index.vue";
import Antenna from "./components/Antenna/index.vue";
import Annulus from "./components/Annulus/index.vue";
import Wing from "./components/Wing/index.vue";
import { bigYiBaoBody } from "./helper/yiBaoBig";
import { smallYiBaoBody } from "./helper/yiBaoSmall";

import { AuthStore, YibaoStore } from "@/store";

interface Props {
  /** 小乂宝还是大乂宝 */
  type: "small" | "big";
}
const $props = defineProps<Props>();

const $yibaoStore = YibaoStore();
const $authStore = AuthStore();

const { temp_part_detail } = storeToRefs($yibaoStore);

const yiBaoMoveBoxRefs = ref<HTMLElement>();
const yiBaoRotateBoxRefs = ref<HTMLElement>();
const yiBaoRefs = ref<HTMLElement>();
const frontRef = ref<HTMLElement>();
const backRef = ref<HTMLElement>();
const topRef = ref<HTMLElement>();
const bottomRef = ref<HTMLElement>();
const leftRef = ref<HTMLElement>();
const rightRef = ref<HTMLElement>();
const eyesRef = ref<InstanceType<typeof Eyes>>();
const mouthRef = ref<InstanceType<typeof Mouth>>();

provide("yibao-type", $props.type);

onMounted(() => {
  if ($props.type === "small") {
    smallYiBaoBody.init(yiBaoRefs.value!, yiBaoMoveBoxRefs.value!, yiBaoRotateBoxRefs.value!);
  } else {
    bigYiBaoBody.init(yiBaoRefs.value!);
  }
});
</script>

<template>
  <div v-show="$authStore.user_status" ref="yiBaoMoveBoxRefs" class="yi-bao-move-box" :class="type">
    <div ref="yiBaoRotateBoxRefs" class="yi-bao-rotate-box">
      <div
        ref="yiBaoRefs"
        class="yi-bao"
        :class="{
          img: temp_part_detail.side.type === 'IMG',
          color: temp_part_detail.side.type === 'COLOR',
        }"
      >
        <!-- 正面 -->
        <div class="side front-box">
          <div ref="frontRef" class="side-item front">
            <Eyes ref="eyesRef" />
            <Blush />
            <Mouth ref="mouthRef" />
          </div>
        </div>

        <!-- 背面 -->
        <div class="side back-box">
          <div ref="backRef" class="side-item back"></div>
        </div>

        <!-- 上面 -->
        <div class="side top-box">
          <div ref="topRef" class="side-item top">
            <Antenna />
          </div>
        </div>

        <!-- 底部 -->
        <div class="side bottom-box">
          <div ref="bottomRef" class="side-item bottom"></div>
        </div>

        <!-- 左侧 -->
        <div class="side left-box">
          <div ref="leftRef" class="side-item left">
            <Annulus />
            <Wing direction="left" />
          </div>
        </div>

        <!-- 右侧 -->
        <div class="side right-box">
          <div ref="rightRef" class="side-item right">
            <Annulus />
            <Wing direction="right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
