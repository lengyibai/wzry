<script setup lang="ts">
import { onMounted } from "vue";

import useLoading from "./hooks/useLoading"; //loading
import useMessage from "./hooks/useMessage"; //消息提醒
import useTip from "./hooks/useTip"; //小贴士

import $bus from "@/utils/eventBus";
import clickAudio from "@/store/audio";
import switchStore from "@/store/switch";

const $switchStore = switchStore();
const $clickAudioStore = clickAudio();

const { loading, show_loading, loading_text } = useLoading();
const { msg, messages } = useMessage();
const { show_tip, content, align, noTipName, tip } = useTip();

/* 挂载全局 */
$switchStore.setTriggerFn({
  msg: msg,
  loading: loading,
  clickAudio: $clickAudioStore.play,
  tip: tip,
});

/* 全局监听事件 */
onMounted(() => {
  const events = ["resize", "click", "mousedown", "mouseup"];
  for (const v of events) {
    window.addEventListener(v, (e) => {
      $bus.emit(v, e.target);
    });
  }
});
</script>

<template>
  <div class="GlobalSwitch">
    <!-- loading -->
    <LibLoading :show="show_loading" :text="loading_text" />

    <!-- 消息提醒 -->
    <K-Message :messages="messages" />

    <!-- NPC -->
    <transition :name="align">
      <K-Tip
        v-if="show_tip"
        v-model="show_tip"
        :text="content"
        :align="align"
        :no-tip-name="noTipName"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
