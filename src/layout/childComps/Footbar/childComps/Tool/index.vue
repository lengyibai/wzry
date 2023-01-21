<script setup lang="ts">
import MuiscList from "../MuiscList/index.vue";

import musicStore from "@/store/music";

interface Emits {
  (e: "toggle", v: string): void;
}
const emit = defineEmits<Emits>();

const $musicStore = musicStore();

/* 点击按钮 */
const handleTool = (type: string) => {
  emit("toggle", type);
};
</script>

<template>
  <transition name="tool">
    <div v-show="$musicStore.show_tool" class="tool" @click.stop>
      <i
        class="iconfont wzry-last"
        title="上一首"
        @click="handleTool('last')"
      />
      <i
        class="iconfont"
        :class="$musicStore.status ? 'wzry-play' : 'wzry-pause'"
        title="播放/暂停"
        @click="handleTool(!$musicStore.status ? 'play' : 'pause')"
      />
      <i
        class="iconfont wzry-next"
        title="下一首"
        @click="handleTool('next')"
      />
      <i
        class="iconfont wzry-musiclist"
        title="播放列表"
        @click="handleTool('list')"
      />

      <MuiscList class="muisc-list" />
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
