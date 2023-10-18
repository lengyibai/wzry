<script setup lang="ts">
import { nextTick, ref } from "vue";

import MuiscList from "../MuiscList/index.vue";

import { MusicStore, SettingStore, DeviceStore } from "@/store";
import { $tip, $tool } from "@/utils";

const $emit = defineEmits<{
  toggle: [v: string];
}>();

const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $deviceStore = DeviceStore();

const musicToolRef = ref();

nextTick(() => {
  if ($tool.isPhone || !$settingStore.config.music) return;
  const musicToolFocus = new $tool.FocusElement(musicToolRef.value);
  $tip({
    text: "58mz",
    align: "right-top",
    createFn: () => {
      musicToolFocus.focus();
    },
    btnFn: () => {
      musicToolFocus.blur();
    },
  });
});
/* 点击按钮 */
const handleTool = (type: string) => {
  $emit("toggle", type);
};
</script>

<template>
  <transition name="tool">
    <div
      v-show="$musicStore.show_tool || $deviceStore.vertical"
      ref="musicToolRef"
      class="music-tool"
      :class="{ center: $deviceStore.vertical }"
      @click.stop
    >
      <i class="global_cursor-pointer iconfont wzry-last" title="上一首" @click="handleTool('last')" />
      <i
        class="global_cursor-pointer iconfont"
        :class="$musicStore.status ? 'wzry-play' : 'wzry-pause'"
        title="播放/暂停"
        @click="handleTool(!$musicStore.status ? 'play' : 'pause')"
      />
      <i class="global_cursor-pointer iconfont wzry-next" title="下一首" @click="handleTool('next')" />
      <i class="global_cursor-pointer iconfont wzry-musiclist" title="播放列表" @click="handleTool('list')" />

      <MuiscList class="muisc-list" />
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
