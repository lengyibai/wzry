<script setup lang="ts">
import { nextTick, ref } from "vue";

import MusicList from "../MusicList/index.vue";

import { MusicStore, SettingStore, DeviceStore } from "@/store";
import { $focus, $tip } from "@/utils";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP, SCENE_TIP } from "@/config";

const $emit = defineEmits<{
  toggle: [v: string];
}>();

const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $deviceStore = DeviceStore();

const musicToolRef = ref<HTMLElement>();

nextTick(() => {
  if (!$settingStore.config.music) return;

  $tip({
    text: SCENE_TIP.d7o5,
    align: "right-top",
    color: false,
    createFn() {
      $focus.show(musicToolRef.value!);
    },
    btnFn: $focus.close,
  });
});
/* 点击按钮 */
const handleTool = (type: string) => {
  $emit("toggle", type);
};
</script>

<template>
  <div ref="musicToolRef" class="music-tool" :class="{ center: $deviceStore.vertical }" @click.stop>
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.q3k7,
      }"
      class="iconfont wzry-last"
      @click="handleTool('last')"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.qf48,
      }"
      class="iconfont"
      :class="$musicStore.status ? 'wzry-play' : 'wzry-pause'"
      @click="handleTool(!$musicStore.status ? 'play' : 'pause')"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.q7a3,
      }"
      class="iconfont wzry-next"
      @click="handleTool('next')"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.r4r3,
      }"
      class="iconfont wzry-musiclist"
      @click="handleTool('list')"
    />

    <MusicList class="music-list" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
