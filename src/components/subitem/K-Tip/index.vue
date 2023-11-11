<script setup lang="ts">
import { ref, watch } from "vue";

import useTip from "./hooks/useTip";

import { $bus, $concise } from "@/utils";
import { SettingStore, AudioStore } from "@/store";

const { show_tip: show, content, align, noTipName, btnFn, tip } = useTip();

$bus.on("tip", (data) => {
  tip(data);
});

const $settingStore = SettingStore();
const $audioStore = AudioStore();

const { getImgLink } = $concise;

const show_tip = ref(false);

const position = {
  "left-top": {
    left: 0,
    top: "3.125rem",
  },
  "right-top": {
    right: 0,
    top: "3.125rem",
  },
  "left-bottom": {
    left: 0,
    bottom: 0,
  },
  "right-bottom": {
    right: 0,
    bottom: 0,
  },
};

/* 不再提示 */
const handleClose = () => {
  noTipName.value && $settingStore.setNoTip(noTipName.value as TipKeys);
  show.value = false;
  $audioStore.play("6xc6");

  setTimeout(() => {
    btnFn.value();
  }, 500);
};

watch(
  () => show.value,
  (v) => {
    setTimeout(() => {
      show_tip.value = v;
    });
  },
);
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="show" class="mask">
        <transition :name="align">
          <div v-show="show_tip" class="k-tip" :style="position[align]">
            <div class="top">
              <!-- 左上角标题 -->
              <div class="title">小贴士</div>

              <!-- 小兵 -->
              <img class="soldier" :src="getImgLink('warn')" alt="小兵" />
            </div>

            <!-- 内容 -->
            <div v-typewriterMultiple class="content">{{ content }}</div>

            <!-- 按钮 -->
            <div class="btns">
              <K-Button width="9.375rem" height="2.5rem" font-size="1.25rem" @click="handleClose">
                确定
              </K-Button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
