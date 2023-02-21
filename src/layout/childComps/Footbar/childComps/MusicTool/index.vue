<script setup lang="ts">
import MuiscList from "../MuiscList/index.vue";

import musicStore from "@/store/music";
import deviceStore from "@/store/device";

interface Emits {
  (e: "toggle", v: string): void;
}
const emit = defineEmits<Emits>();

const $musicStore = musicStore();
const $deviceStore = deviceStore();

/* 点击按钮 */
const handleTool = (type: string) => {
  emit("toggle", type);
};
</script>

<template>
  <transition name="tool">
    <div
      v-show="$musicStore.show_tool || $deviceStore.vertical"
      class="music-tool"
      :class="{ center: $deviceStore.vertical }"
      @click.stop
    >
      <i class="cursor-pointer iconfont wzry-last" title="上一首" @click="handleTool('last')" />
      <i
        class="cursor-pointer iconfont"
        :class="$musicStore.status ? 'wzry-play' : 'wzry-pause'"
        title="播放/暂停"
        @click="handleTool(!$musicStore.status ? 'play' : 'pause')"
      />
      <i class="cursor-pointer iconfont wzry-next" title="下一首" @click="handleTool('next')" />
      <i class="cursor-pointer iconfont wzry-musiclist" title="播放列表" @click="handleTool('list')" />

      <MuiscList class="muisc-list" />
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
