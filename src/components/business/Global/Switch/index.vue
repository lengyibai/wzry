<script setup lang="ts">
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
const { show_tip, title, btn_text, content, align, noTipName, btn, btnFn, tip } = useTip();

/* 挂载全局 */
$switchStore.$patch({
  $msg: msg,
  $loading: loading,
  $clickAudio: $clickAudioStore.play,
  $tip: tip,
});

/* 全局监听事件 */
const events = ["resize", "mousemove", "mouseup"];
for (const v of events) {
  window.addEventListener(v, (e) => {
    $bus.emit(v, e);
  });
}
</script>

<template>
  <div class="GlobalSwitch">
    <!-- loading -->
    <K-Loading :show="show_loading" :text="loading_text" />

    <!-- 消息提醒 -->
    <K-Message :messages="messages" />

    <!-- NPC -->
    <transition :name="align">
      <K-Tip
        v-if="show_tip"
        v-model="show_tip"
        v-model:btn="btn"
        :text="content"
        :align="align"
        :no-tip-name="noTipName"
        :title="title"
        :btn-text="btn_text"
        :btn-fn="btnFn"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
