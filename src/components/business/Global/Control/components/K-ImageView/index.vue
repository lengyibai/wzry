<script setup lang="ts">
import { ref } from "vue";

import { ScaleFLIPImage } from "./helper/ImageView";

import { $bus, $tool } from "@/utils";
import type { ImageViewParams } from "@/utils/modules/imageView";
import { KButton } from "@/components/business";
import { getImgLink } from "@/utils/modules/concise";
import { AudioStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $audioStore = AudioStore();

let scaleFLIPImage: ScaleFLIPImage;

const mainRef = ref<HTMLElement>();
const info = ref<ImageViewParams>();

const show = ref(false);
const status = ref<"loading" | "finish" | "error">("loading");

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
    return;
  }

  current_index.value = index;
  audioPlayer.play(voice);
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
            <div v-if="status === 'loading'" class="loading">
              <img :src="getImgLink('logo_inside')" alt="" class="inside" @dragstart.prevent />
              <img :src="getImgLink('logo_outside')" alt="" class="outside" @dragstart.prevent />
            </div>
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

        <transition v-if="info?.type === 'HERO'" name="sidebar">
          <div v-if="show" class="sidebar">
            <transition name="card" appear>
              <div class="img-info">
                <div class="head-card">
                  <img :src="info?.heroAvatar" alt="" class="avatar" />
                  <div class="info">
                    <div class="hero-name">{{ info?.heroName }}</div>
                    <div class="skin-name">{{ info?.skinName }}</div>
                  </div>
                </div>
                <div class="btn">
                  <KButton
                    v-mouse-tip="{
                      text: MOUSE_TIP.vs71,
                    }"
                    type="warning"
                    @click="handleDownload"
                  >
                    下载原图
                  </KButton>
                </div>
              </div>
            </transition>

            <transition name="fade" appear>
              <div class="title">语音列表</div>
            </transition>

            <transition name="voice" appear>
              <div class="voice-list">
                <div
                  v-for="(item, index) in info?.voices"
                  :key="index"
                  v-mouse-tip="{
                    text: MOUSE_TIP.lq42,
                  }"
                  :class="{
                    active: current_index === index,
                  }"
                  class="voice"
                  @click="handlePlay(item.link, index)"
                >
                  {{ item.text }}
                </div>
              </div>
            </transition>
          </div>
        </transition>

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
