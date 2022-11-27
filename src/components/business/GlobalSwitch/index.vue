<template>
  <div class="GlobalSwitch">
    <!-- loading -->
    <LibLoading :show="show_loading" :text="loading_text" />
    <!-- 消息提醒 -->
    <K-Message :messages="messages" />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import useLoading from "./hooks/useLoading";
import useSound from "./hooks/useSound";
import useTip from "./hooks/useTip";
import $bus from "@/utils/eventBus"; //事件总线

import switchStore from "@/store/globalSwitch"; //全局开关

const $switchStore = switchStore();

const { loading, show_loading, loading_text } = useLoading();
const { clickAudio } = useSound();
const { tip, messages } = useTip($switchStore);

/* 挂载全局 */
$switchStore.$patch({
  $tip: tip,
  $loading: loading,
  $clickAudio: clickAudio,
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
