<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { $bus, $concise } from "@/utils";
import { SettingStore, AudioStore, TipStore } from "@/store";
import { KButton } from "@/components/business";
import { vTypewriterMultiple } from "@/directives";

const { show_tip: show, content, align, noTipName, btnFn } = storeToRefs(TipStore());
const { tip, toTip, setShowTip } = TipStore();

$bus.on("tip", (data) => {
  tip(data);
});

const $settingStore = SettingStore();
const $audioStore = AudioStore();

const { getImgLink } = $concise;

/** 是否锁定按钮 */
const disable = ref(true);
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

/* 打字机结束后触发 */
const finish = () => {
  disable.value = false;
};

/* 不再提示 */
const handleClose = () => {
  if (disable.value) return;
  disable.value = true;
  noTipName.value && $settingStore.setNoTip(noTipName.value as TipKeys);
  setShowTip(false);
  $audioStore.play("6xc6");

  setTimeout(() => {
    btnFn.value();
    toTip();
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
            <div v-typewriterMultiple="finish" class="content">{{ content }}</div>

            <!-- 按钮 -->
            <div class="btns" :class="{ disable }">
              <KButton class="k-button" :disabled="disable" @click="handleClose">确定</KButton>
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
