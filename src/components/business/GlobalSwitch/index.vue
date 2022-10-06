<template>
  <div class="GlobalSwitch">
    <!-- loading -->
    <LibLoading :show="show_loading" :text="loading_text" />
    <!-- 消息提醒 -->
    <K-Message :messages="messages" />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import switchStore from '@/store/globalSwitch.js'; //全局开关
import $bus from '@/utils/eventBus.js'; //事件总线
import useLoading from './hooks/useLoading.js'; //全局loading
import useSound from './hooks/useSound.js'; //全局点击音效
import useTip from './hooks/useTip.js'; //全局消息提醒

const store = switchStore();
const { messages } = useTip(store);
const { show_loading, loading_text } = useLoading(store);
useSound(store);

onMounted(() => {
  const events = ['resize', 'click', 'mousedown', 'mouseup'];
  for (const v of events) {
    window.addEventListener(v, (e) => {
      $bus.emit(v, e);
    });
  }
});
</script>
