<script setup lang="ts">
import musicStore from "@/store/music";

const $musicStore = musicStore();

/* 关闭弹窗 */
const handleClose = () => {
  $musicStore.list();
};

/* 切换音乐 */
const handleToggleMusic = (index: number) => {
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
          :key="index"
          class="card cursor-pointer"
          :class="{ active: index === $musicStore.bgmIndex }"
          @dblclick="handleToggleMusic(index)"
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
.muisc-list {
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  width: 300px;
  height: 500px;
  border: 2px solid var(--theme-color-eleven);
  background-color: var(--theme-color-one);
  flex-direction: column;
  transform: translate(50%, -100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);

  .top {
    display: flex;
    align-items: center;
    padding: 10px;

    .wzry-guanbi {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .title {
      font-size: 24px;
    }
  }

  .list {
    display: flex;
    overflow: auto;
    width: 100%;
    flex: 1;
    flex-direction: column;

    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;
      padding: 0 10px;
      transition: all var(--time-500);

      &:hover {
        .left {
          transition: all 0s;
          transform: translateX(10px);
        }
      }

      .left {
        display: flex;
        align-items: center;
        transition: all var(--time-250);

        .num {
          width: 25px;
        }
      }

      .time {
        margin-left: auto;
        justify-self: flex-end;
      }

      &:hover {
        background-color: var(--theme-color-four);
        transition: all 0s;
      }
    }
  }
}

.active {
  color: var(--blue) !important;
}

.muisc-list-enter-from,
.muisc-list-leave-active {
  clip-path: polygon(50% 100%, 50% 100%, 100% 100%, 0% 100%) !important;
}

.muisc-list-leave-active,
.muisc-list-enter-active {
  transition: all var(--time-250);
}
</style>
