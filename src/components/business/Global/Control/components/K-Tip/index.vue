<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { $bus } from "@/utils";
import { SettingStore, AudioStore, TipStore } from "@/store";
import { KButton } from "@/components/business";
import { vMouseTip, vTypewriterMultiple } from "@/directives";
import { MOUSE_TIP } from "@/config";

const { show_tip: show, content, align, noTipName, btnFn } = storeToRefs(TipStore());
const { tip, toTip, setShowTip } = TipStore();

$bus.on("tip", (data) => {
  tip(data);
});

const $settingStore = SettingStore();
const $audioStore = AudioStore();

/** 是否锁定按钮 */
const disable = ref(true);
/** 显示tip */
const show_tip = ref(false);
/** 显示蒙版 */
const show_mask = ref(false);

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

/* 打字机结束后触发 */
const finish = () => {
  disable.value = false;
};

/* 不再提示 */
const handleClose = () => {
  if (disable.value) return;
  disable.value = true;
  setShowTip(false);
  noTipName.value && $settingStore.setNoTip(noTipName.value as keyof Global.Tip.Key<string>);
  $audioStore.play("ba09");

  setTimeout(() => {
    btnFn.value();
    toTip();
  }, 1000);
};

watch(
  () => show.value,
  (v) => {
    //解决没有动画的bug
    if (v) {
      show_mask.value = true;
      setTimeout(() => {
        show_tip.value = v;
      });
    } else {
      show_tip.value = v;
      setTimeout(() => {
        show_mask.value = false;
      }, 500);
    }
  },
);
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="show_mask" class="mask">
        <transition :name="align">
          <div v-show="show_tip" class="k-tip" :style="position[align]">
            <div class="top">
              <!-- 左上角标题 -->
              <div class="title">小贴士</div>

              <!-- 小兵 -->
              <div class="soldier"></div>
            </div>

            <!-- 内容 -->
            <div
              v-typewriterMultiple="{
                callback: finish,
              }"
              class="content"
            >
              {{ content }}
            </div>

            <!-- 按钮 -->
            <div class="btns" :class="{ disable }">
              <KButton
                v-mouse-tip="{
                  text: disable ? MOUSE_TIP.zx48 : MOUSE_TIP.x5a6,
                  disabled: disable,
                }"
                class="k-button"
                :disabled="disable"
                @click="handleClose"
              >
                确定
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
