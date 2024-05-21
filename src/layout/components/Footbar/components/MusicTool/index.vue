<script setup lang="ts">
import MusicList from "../MusicList/index.vue";

import { MusicStore } from "@/store";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { useDevice } from "@/hooks";

const $emit = defineEmits<{
  toggle: [v: string];
}>();

const $musicStore = MusicStore();

const { vertical } = useDevice();

/** @description 点击按钮
 * @param type 工具类型
 */
const handleTool = (type: string) => {
  $emit("toggle", type);
};
</script>

<template>
  <div class="music-tool" :class="{ center: vertical }" @click.stop>
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
