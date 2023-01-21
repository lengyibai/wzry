<script setup lang="ts">
import { computed } from "vue";

import switchStore from "@/store/switch";
import settingStore from "@/store/setting";

interface Props {
  notice?: boolean; //显示公告按钮
}
withDefaults(defineProps<Props>(), {
  notice: true,
});

interface Emits {
  (e: "clicks", v: string): void;
}
const emit = defineEmits<Emits>();

const $settingStore = settingStore();
const $switchStore = switchStore();

const muted = computed(() => $settingStore.config.muted);

const icon = computed(() => {
  return muted.value ? "wzry-jingyin" : "wzry-laba";
});

/* 点击某个按钮 */
const handleShowNotice = (v: string) => {
  emit("clicks", v);
  if (v === "sound") {
    $settingStore.saveConfig({ muted: !muted.value });
    $switchStore.$clickAudio("n4r4");
  }
};
</script>

<template>
  <div class="tool-bar">
    <div class="line"></div>
    <div
      class="box cursor-pointer"
      :style="{ opacity: !muted ? 0.75 : 1 }"
      @click="handleShowNotice('sound')"
    >
      <i class="iconfont" :class="icon" />
    </div>
    <div v-if="notice" class="line"></div>
    <div
      v-if="notice"
      class="box cursor-pointer"
      @click="handleShowNotice('notice')"
    >
      <i class="iconfont wzry-gonggao" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
