<script setup lang="ts">
import musicStore from "@/store/music";

const $musicStore = musicStore();

/* 关闭弹窗 */
const handleClose = () => {
  $musicStore.list();
};

/* 切换音乐 */
const handleToggleMusic = (index: number) => {
  if ($musicStore.bgmIndex === index) return;
  $musicStore.playIndex(index);
};
</script>

<template>
  <transition name="muisc-list">
    <div v-show="$musicStore.show_list" class="muisc-list cursor-default">
      <!-- 顶部标题 -->
      <div class="top">
        <div class="title">播放列表</div>
        <i class="iconfont wzry-guanbi" @click="handleClose" />
      </div>

      <!-- 播放列表 -->
      <div class="list" title="双击播放">
        <div
          v-for="(item, index) in $musicStore.musics"
          class="card cursor-pointer"
          :class="{ active: index === $musicStore.bgmIndex }"
          @click="handleToggleMusic(index)"
          :key="index"
        >
          <!-- 左侧音乐标题 -->
          <div class="left">
            <!-- 编号 -->
            <div class="num">
              <span v-if="index !== $musicStore.bgmIndex">{{ index + 1 }}</span>
              <i v-else class="iconfont wzry-playactive" />
            </div>

            <!-- 音乐名 -->
            <div class="name">
              {{ item.name }}
            </div>
          </div>

          <!-- 右侧时间 -->
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
