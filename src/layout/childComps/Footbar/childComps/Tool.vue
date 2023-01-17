<script setup lang="ts">
import MuiscList from "./MuiscList.vue";

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
.tool {
  display: flex;
  align-items: center;
  height: 100%;

  .iconfont {
    display: inline-block;
    margin: 0 10px;
    color: var(--theme-color-five);
    font-size: 28px;
    font-weight: bold;

    &:hover {
      color: var(--blue);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }
  }
}

.tool-enter-from,
.tool-leave-active {
  transform: translateY(100%);
}

.tool-leave-active,
.tool-enter-active {
  transition: all var(--time-250);
}
</style>
