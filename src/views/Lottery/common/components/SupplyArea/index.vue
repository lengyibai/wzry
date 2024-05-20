<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";

import SupplyMode from "./components/SupplyMode/index.vue";
import AnimateMove from "./components/AnimateMove/index.vue";
import ReceiveProp from "./components/ReceiveProp/index.vue";

import { SupplyStore } from "@/store";
import { CONFIRM_TIP } from "@/config";
import { $confirm } from "@/utils/busTransfer";
import { vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 补给站是英雄夺宝还是皮肤夺宝 */
  type: "HERO" | "SKIN";
}
const $props = defineProps<Props>();

const $supplyStore = SupplyStore();

const { playAudio } = usePlayAudio();

const animateMoveRef = ref<InstanceType<typeof AnimateMove>>();

/** 补给状态 */
const supply_status = computed(() => {
  return $props.type === "HERO" ? $supplyStore.hero_supply_status : $supplyStore.skin_supply_status;
});

/** @description 控制开关 */
const handleSwitch = () => {
  //确认终止提醒
  if (supply_status.value === "RUNNING") {
    $confirm({
      text: CONFIRM_TIP.jn63,
      confirm() {
        animateMoveRef.value!._clearAnimate();
        $supplyStore.stopCountdown($props.type);
        playAudio("pk92");
      },
    });

    return;
  }

  //空闲反选
  if (supply_status.value !== "IDLE") {
    $supplyStore.setSupplyStatus($props.type, "IDLE");
    playAudio("pk92");
    return;
  }

  //选择模式
  playAudio();
  $supplyStore.setSupplyStatus($props.type, "SELECT");
};
</script>

<template>
  <div class="supply-area">
    <!-- 开关按钮 -->
    <transition name="fade">
      <i
        v-if="supply_status !== 'RECEIVE'"
        v-mouse-tip
        class="iconfont"
        :class="[
          {
            active: supply_status !== 'IDLE',
          },
          supply_status === 'RUNNING' ? 'wzry-tingzhi' : 'wzry-kaiguan',
        ]"
        @click="handleSwitch"
      ></i>
    </transition>

    <div class="text">夺宝石补给站</div>

    <!-- 模式选择 -->
    <transition name="fade">
      <SupplyMode v-if="['SELECT', 'READY'].includes(supply_status)" :type="type" />
    </transition>

    <!-- 动画移动 -->
    <transition name="fade">
      <AnimateMove v-show="supply_status !== 'IDLE'" ref="animateMoveRef" :type="type" />
    </transition>

    <!-- 奖励领取 -->
    <transition name="fade">
      <ReceiveProp v-if="supply_status === 'RECEIVE'" :type="type" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
