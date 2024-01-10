<script setup lang="ts">
import { ref } from "vue";

import { ScaleFLIPImage } from "./helper/ImageView";
import VerticalScreen from "./components/VerticalScreen/index.vue";
import LandscapeScreen from "./components/LandscapeScreen/index.vue";

import { $bus, $tool } from "@/utils";
import { KLoadingIcon } from "@/components/business";
import { AudioStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { useResponsive } from "@/hooks";
import { ImageViewParams } from "@/utils/interface";

const $audioStore = AudioStore();

const { under_960 } = useResponsive();

let scaleFLIPImage: ScaleFLIPImage;

const mainRef = ref<HTMLElement>();
const info = ref<ImageViewParams>();

/** 是否显示主页面 */
const show = ref(false);
/** 图片加载状态 */
const status = ref<"loading" | "finish" | "error">("loading");
/** 是否处于播放中 */
const playing = ref(false);
/** 语音时长 */
const duration = ref(0);

$bus.on("img-view", (v) => {
  status.value = "loading";
  show.value = true;
  info.value = v;
  scaleFLIPImage = new ScaleFLIPImage(v.event, mainRef.value!, v.bigImage, v.blurImage, () => {
    status.value = "finish";
  });
});

/** 当前播放索引 */
const current_index = ref(-1);
/** 语音播放器 */
const audioPlayer = new $tool.AudioPlayer({
  volume: 0.25,
  end() {
    current_index.value = -1;
  },
});

/* 点击播放 */
const handlePlay = (voice: string, index: number) => {
  //如果再次点击，则停止播放
  if (current_index.value === index) {
    audioPlayer.stop();
    playing.value = false;
    return;
  }

  audioPlayer.play(voice).then((res) => {
    duration.value = res.duration;
    current_index.value = index;
  });
};

/* 关闭页面 */
const handleHide = () => {
  $audioStore.play("ba09");
  show.value = false;
  scaleFLIPImage.destruction();
};

/* 下载图片 */
const handleDownload = () => {
  $tool.downloadImage(info.value!.bigImage, info.value!.skinName!);
};
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="show" class="k-image-view">
        <div
          ref="mainRef"
          class="main"
          :class="{
            disabled: status === 'loading',
          }"
        >
          <transition name="fade" appear>
            <KLoadingIcon v-if="status === 'loading'" width="7.5%" white />
          </transition>
        </div>

        <transition name="close" appear>
          <div
            v-show="show"
            v-mouse-tip="{
              text: MOUSE_TIP.mk66,
            }"
            class="close"
            @click="handleHide"
          ></div>
        </transition>

        <!-- 下载图片或查看语音 -->
        <template v-if="show && info?.type === 'HERO'">
          <VerticalScreen
            v-if="under_960"
            :current-index="current_index"
            :data="info"
            :duration="duration"
            @play="handlePlay"
            @download="handleDownload"
          />
          <LandscapeScreen
            v-else
            :current-index="current_index"
            :data="info"
            :duration="duration"
            @play="handlePlay"
            @download="handleDownload"
          />
        </template>

        <!-- 底部工具栏 -->
        <transition name="tool">
          <div v-show="show" class="tool">
            <i
              v-mouse-tip="{
                text: MOUSE_TIP.n1w6,
              }"
              class="iconfont wzry-fangda"
              @click="scaleFLIPImage.zoomIn"
            ></i>
            <i
              v-mouse-tip="{
                text: MOUSE_TIP.nz58,
              }"
              class="iconfont wzry-suoxiao"
              @click="scaleFLIPImage.zoomOut"
            ></i>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
