<script setup lang="ts">
import { useTip } from "./hooks/useTip";

import { KButton } from "@/components/business";
import { vMouseTip, vTypewriterMultiple } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { _getImgLink } from "@/utils/concise";

const {
  show_tip,
  show_mask,
  content,
  align,
  disabled,
  is_once,
  btn_text,
  handleSetAllowClick,
  handleConfirm,
  need_mask_color,
} = useTip();

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
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="show_mask"
        class="tip-mask"
        :class="{
          mask: need_mask_color,
        }"
      >
        <transition :name="align">
          <div
            v-show="show_tip"
            class="k-tip"
            :style="[
              position[align],
              {
                backgroundImage: `url(${_getImgLink('dialog')})`,
              },
            ]"
          >
            <div class="top">
              <!-- 左上角标题 -->
              <div class="title">小贴士</div>

              <!-- 小兵 -->
              <div class="soldier"></div>
            </div>

            <!-- 内容 -->
            <div
              v-typewriter-multiple="{
                callback: handleSetAllowClick,
                content,
              }"
              class="content"
            ></div>

            <!-- 按钮 -->
            <div class="btns" :class="{ disabled }">
              <KButton
                v-mouse-tip="{
                  text: disabled ? MOUSE_TIP.zx48 : MOUSE_TIP.x5a6,
                  disabled: disabled,
                }"
                class="k-button"
                :disabled="disabled"
                @click="handleConfirm"
              >
                {{ is_once ? "不再提示" : btn_text }}
              </KButton>
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
