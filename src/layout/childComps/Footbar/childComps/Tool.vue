<script setup lang="ts">
import musicStore from "@/store/music";
import MuiscList from "./MuiscList.vue";

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
    <div class="tool" @click.stop v-show="$musicStore.show_tool">
      <i
        class="iconfont wzry-last"
        @click="handleTool('last')"
        title="上一首"
      />
      <i
        class="iconfont"
        :class="$musicStore.status ? 'wzry-play' : 'wzry-pause'"
        @click="handleTool(!$musicStore.status ? 'play' : 'pause')"
        title="播放/暂停"
      />
      <i
        class="iconfont wzry-next"
        @click="handleTool('next')"
        title="下一首"
      />
      <i
        class="iconfont wzry-musiclist"
        @click="handleTool('list')"
        title="播放列表"
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
  transition: all 0.25s;
}
</style>
