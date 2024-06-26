<script setup lang="ts">
import type { ImageView } from "../../interface";

import { MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { KButton, KMarquee } from "@/components/business";

interface Props {
  data: ImageView;
  duration: number;
  currentIndex: number;
}
defineProps<Props>();

const $emit = defineEmits<{
  download: [];
  play: [link: string, index: number];
}>();
</script>

<template>
  <transition name="sidebar" appear>
    <div class="landscape-screen">
      <transition name="card" appear>
        <div class="img-info">
          <div class="head-card">
            <img :src="data.heroAvatar" alt="" class="avatar" />
            <div class="info">
              <div class="hero-name">{{ data.heroName }}</div>
              <div class="skin-name">{{ data.skinName }}</div>
            </div>
          </div>
          <div class="btn">
            <KButton
              v-mouse-tip="{
                text: MOUSE_TIP.vs71,
              }"
              type="warning"
              @click="$emit('download')"
            >
              下载原图
            </KButton>
          </div>
        </div>
      </transition>

      <transition name="voice" appear>
        <div class="voice-content">
          <div class="title">语音列表</div>
          <div v-scroll-virtualization class="voice-list">
            <div
              v-for="(item, index) in data.voices"
              :key="index"
              v-mouse-tip="{
                text: MOUSE_TIP.sg22,
              }"
              :class="{
                active: currentIndex === index,
              }"
              class="voice"
              @click="$emit('play', item.link, index)"
            >
              <KMarquee height="3.125rem" :playing="currentIndex === index" :duration="duration">
                {{ item.text }}
              </KMarquee>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
