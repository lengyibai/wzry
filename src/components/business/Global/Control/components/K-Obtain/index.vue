<script setup lang="ts">
import { ref } from "vue";

import { ObtainInfo } from "./interface";

import { KButton } from "@/components/business";
import { vMaskGradient, vParticleEffect } from "@/directives";
import { AudioStore } from "@/store";
import { $bus } from "@/utils/eventBus";
import { _isArray } from "@/utils/tool";

const $audioStore = AudioStore();

/** 是否显示 */
const show = ref(false);
/** 显示背景 */
const show_bg = ref(false);
/** 物品信息 */
const prop_list = ref<ObtainInfo[]>();

$bus.on("obtain", (v) => {
  $audioStore.play("jo36");
  show.value = true;

  if (!_isArray(v)) {
    prop_list.value = [v as ObtainInfo];
  } else {
    prop_list.value = v as ObtainInfo[];
  }

  setTimeout(() => {
    show_bg.value = true;
  }, 100);
});

/* 关闭 */
const handleClose = () => {
  show.value = false;
  show_bg.value = false;
  prop_list.value = undefined;
  $audioStore.play("pj83");
};
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="show && prop_list"
        v-mask-gradient="{
          color: 'rgba(40, 100, 195, 0.5)',
          start: '0%',
          end: '25%',
        }"
        class="k-obtain"
      >
        <div class="title" data-text="恭喜你获得">恭喜你获得</div>
        <div
          v-particle-effect="{
            size: 6,
            speed: 2000,
            count: 30,
          }"
          class="content"
          :class="{
            hide: !show_bg,
          }"
        >
          <div
            class="article-list"
            :class="{
              alone: prop_list.length === 1,
            }"
          >
            <div v-for="(item, index) in prop_list" :key="index" class="box">
              <div v-if="show_bg && prop_list.length === 1" class="shine">
                <span style="--i: 1"></span>
                <span style="--i: 2"></span>
                <span style="--i: 3"></span>
                <span style="--i: 4"></span>
                <span style="--i: 5"></span>
                <span style="--i: 6"></span>
                <span style="--i: 7"></span>
                <span style="--i: 8"></span>
                <span style="--i: 9"></span>
                <span style="--i: 10"></span>
                <span style="--i: 11"></span>
                <span style="--i: 12"></span>
                <span style="--i: 13"></span>
                <span style="--i: 14"></span>
                <span style="--i: 15"></span>
                <span style="--i: 16"></span>
              </div>
              <div class="icon-box">
                <img :src="item.icon" alt="" class="icon" />
                <div v-if="item.num" class="num" :data-text="item.num">
                  {{ item.num }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <KButton class="k-button" @click="handleClose">确定</KButton>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
