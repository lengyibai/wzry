<script setup lang="ts">
import { ref } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { ScaleFLIPImage } from "./helper/ImageView";
import VerticalScreen from "./components/VerticalScreen/index.vue";
import LandscapeScreen from "./components/LandscapeScreen/index.vue";
import type { ImageView } from "./interface";

import { $mouseTipText, MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";
import { KLoadingIcon } from "@/components/business";
import { GAME_HERO, KVP_HERO } from "@/api";
import { $bus } from "@/utils/eventBus";
import { _AudioPlayer, _downloadImage } from "@/utils/tool";

const under_960 = useMediaQuery("(max-width: 960px)");
const { playAudio } = usePlayAudio();

let scaleFLIPImage: ScaleFLIPImage;

const mainRef = ref<HTMLElement>();
const info = ref<ImageView>();

/** 是否显示主页面 */
const show = ref(false);
/** 用于关闭 */
const close = ref(true);
/** 图片加载状态 */
const status = ref<"loading" | "finish" | "error">("loading");
/** 是否处于播放中 */
const playing = ref(false);
/** 语音时长 */
const duration = ref(0);

$bus.on("img-view", async (v) => {
  const { type, id } = v;

  if (type === "SKIN" && id) {
    const hero = (await GAME_HERO.getHeroKvp())[id];
    const skin = (await GAME_HERO.getSkinKvp())[id];

    //如果找不到皮肤，则为原皮
    if (skin) {
      const { posterBig, posterBlur, name, heroName, hero } = skin;
      const voices = (await GAME_HERO.getSkinVoice(hero, name)).voice;
      const heroAvatar = (await KVP_HERO.getHeroAvatarKvp())[hero];

      info.value = {
        ...v,
        bigImage: posterBig,
        blurImage: posterBlur,
        heroAvatar,
        heroName,
        voices,
      };

      handlePlay(voices[0].link, 0);
    } else {
      const { posterBig, posterBlur, name, avatar } = hero;
      const voices = (await GAME_HERO.getSkinVoice(id, "原皮")).voice;

      info.value = {
        ...v,
        bigImage: posterBig,
        blurImage: posterBlur,
        heroAvatar: avatar,
        heroName: name,
        voices,
      };

      handlePlay(voices[0].link, 0);
    }
  } else {
    info.value = v;
  }

  status.value = "loading";
  show.value = true;
  close.value = false;

  scaleFLIPImage = new ScaleFLIPImage(
    info.value.parent,
    mainRef.value!,
    info.value.bigImage!,
    info.value.blurImage!,
    () => {
      status.value = "finish";
    },
  );
});

/** 当前播放索引 */
const current_index = ref(-1);
/** 语音播放器 */
const audioPlayer = new _AudioPlayer({
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
  playAudio("ba09");
  close.value = true;

  setTimeout(() => {
    show.value = false;
    scaleFLIPImage.destruction();
  }, 750);
};

/* 下载图片 */
const handleDownload = () => {
  _downloadImage(info.value!.bigImage!, info.value!.skinName!);
};
</script>

<template>
  <teleport to="body">
    <transition name="enlarge-close">
      <div v-show="show && !close" class="k-image-view">
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

        <transition name="right-top-close" appear>
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
        <template v-if="show && info?.type === 'SKIN'">
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
                text: $mouseTipText('n1w6', { v: '放大' }),
              }"
              class="iconfont wzry-fangda"
              @click="scaleFLIPImage.zoomIn"
            ></i>
            <i
              v-mouse-tip="{
                text: $mouseTipText('n1w6', { v: '缩小' }),
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
