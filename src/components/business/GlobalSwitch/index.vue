<script setup lang="ts">
import { onMounted } from "vue";
import useLoading from "./hooks/useLoading";
import useMessage from "./hooks/useMessage";
import useTip from "./hooks/useTip";
import $bus from "@/utils/eventBus";
import switchStore from "@/store/globalSwitch";
import settingStore from "@/store/setting";
import tipStore from "@/store/tip";
import clickAudio from "@/store/clickAudio";

const $switchStore = switchStore();
const $tipStore = tipStore();
const $clickAudioStore = clickAudio();
const $settingStore = settingStore();

const { loading, show_loading, loading_text } = useLoading();
const { msg, messages } = useMessage($switchStore);
const { show_tip, content, align, noTipName, tip } = useTip(
  $switchStore,
  $tipStore,
  $settingStore
);
/* 挂载全局 */
$switchStore.$patch({
  $msg: msg,
  $loading: loading,
  $clickAudio: $clickAudioStore.play,
  $tip: tip,
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
        v-model="show_tip"
        v-if="show_tip"
        :text="content"
        :align="align"
        :noTipName="noTipName"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
.left-top-enter-from,
.left-bottom-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.right-top-enter-from,
.right-bottom-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.left-bottom-leave-active,
.left-top-leave-active,
.right-bottom-leave-active,
.right-top-leave-active {
  opacity: 0;
}

.left-top-enter-active,
.left-top-leave-active,
.left-bottom-enter-active,
.left-bottom-leave-active,
.right-top-enter-active,
.right-top-leave-active,
.right-bottom-enter-active,
.right-bottom-leave-active {
  transition: all 0.5s;
}
</style>
