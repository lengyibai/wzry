<script setup lang="ts">
import { ref } from "vue";

import { setLanguage } from "@/language";
import { AudioStore, MusicStore, SettingStore, CssVarStore, BarrageStore } from "@/store";
import { $confirm, $message, $tip } from "@/utils";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { KDialog, KButton, KRange, KSelect, KCheck } from "@/components/business";

const $audioStore = AudioStore();
const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $cssVarStore = CssVarStore();
const $barrageStore = BarrageStore();

const config = ref<Global.SettingConfig>({ ...$settingStore.config });

/* 语言 */
const onLanguage = (v: number) => {
  setLanguage(v as 0 | 1 | 2);
  saveConfig();
};

/* 开启音乐 */
const onMusic = (v: boolean) => {
  saveConfig();
  if (v) {
    setTimeout(() => {
      $musicStore.play(false);
    }, 1000);
  } else {
    $musicStore.pause();
  }
};

/* 音乐音量调节 */
const onMusicVolume = (v: number) => {
  $musicStore.setVolume(v);
  saveConfig();
};

/* 开启弹幕 */
const onBarrage = (v: boolean) => {
  $barrageStore.setBarrage(v);
  saveConfig();
};

/* 支持控制音乐进度 */
const onMusicProgress = () => {
  saveConfig();
};

/* 开启音效 */
const onAudio = (v: boolean) => {
  $audioStore.setAudio(v);
  saveConfig();
};

/* 音效音量调节 */
const onAudioVolume = (v: number) => {
  $audioStore.setVolume(v);
  saveConfig();
};

/* 柔光 */
const onShine = (v: boolean) => {
  $cssVarStore.setShine(v);
  saveConfig();
};

/* 粒子特效 */
const onParticle = () => {
  saveConfig();
};

/* 启用/禁用Tip */
const onTip = (v: boolean) => {
  !v &&
    $tip({
      text: "我~~一~~定~~会~~回~~来~~的~~",
    });
  saveConfig();
  v &&
    $tip({
      text: "我又回来啦！",
    });
};

/* 恢复所有小贴士 */
const handleResetTip = () => {
  $tip({
    btnText: "立刻刷新",
    text: "恢复小贴士需要刷新浏览器才会生效。",
    btnFn() {
      $settingStore.restoreTip();
      location.reload();
    },
  });
};

/* 保存配置 */
const saveConfig = () => {
  $settingStore.saveConfig(config.value);
};

/* 显示确认重置弹窗 */
const handleResetConfig = () => {
  $confirm({
    text: "确定重置所有配置项？",
    confirm() {
      $settingStore.resetConfig();
      $message(MESSAGE_TIP.j5l7);
      config.value = $settingStore.config;
    },
  });
};
</script>

<template>
  <KDialog v-bind="$attrs" title="设置" width="57.5rem" ctx-width="90%" up>
    <div v-scroll-virtualization class="options">
      <!-- 语言 -->
      <div class="option">
        <div class="label">{{ $t("语言") }}</div>
        <KSelect
          v-model="config.language"
          v-mouse-tip="{
            text: MOUSE_TIP.v41b,
          }"
          width="7rem"
          :option="['中文', '繁体', 'English']"
          @update:model-value="onLanguage"
        />
      </div>

      <!-- 音效 -->
      <div class="option">
        <div class="label">{{ $t("音效") }}</div>
        <KRange
          v-model="config.audioVolume"
          :text="config.audioVolume + '%'"
          :disabled="!config.audio"
          @update:model-value="onAudioVolume"
        />
        <KCheck v-model="config.audio" v-mouse-tip @update:model-value="onAudio" />
      </div>

      <!-- 音乐 -->
      <div class="option">
        <div class="label">{{ $t("音乐") }}</div>
        <KRange
          v-model="config.musicVolume"
          :text="config.musicVolume + '%'"
          :disabled="!config.music"
          @update:model-value="onMusicVolume"
        />
        <KCheck v-model="config.music" v-mouse-tip @update:model-value="onMusic" />
      </div>

      <!-- 音乐进度控制 -->
      <div class="option">
        <div class="label">
          {{ $t("弹幕语音") }}
        </div>
        <KCheck v-model="config.barrage" v-mouse-tip @update:model-value="onBarrage" />
      </div>

      <!-- 音乐进度控制 -->
      <div class="option">
        <div class="label">
          {{ $t("音乐进度控制") }}
        </div>
        <KCheck
          v-model="config.musicProgress"
          v-mouse-tip="{
            text: MOUSE_TIP.pd85,
          }"
          @update:model-value="onMusicProgress"
        />
      </div>

      <!-- 柔光 -->
      <div class="option">
        <div class="label">
          {{ $t("元素发光") }}
        </div>
        <KCheck
          v-model="config.shine"
          v-mouse-tip="{
            text: MOUSE_TIP.ph01,
          }"
          @update:model-value="onShine"
        />
      </div>

      <!-- 粒子特效 -->
      <div class="option">
        <div class="label">
          {{ $t("粒子特效") }}
        </div>
        <KCheck
          v-model="config.particle"
          v-mouse-tip="{
            text: MOUSE_TIP.ph48,
          }"
          @update:model-value="onParticle"
        />
      </div>

      <!-- 小贴士 -->
      <div class="option">
        <div class="label">
          {{ $t("小贴士") }}
        </div>
        <KCheck
          v-model="config.tip"
          v-mouse-tip="{
            text: MOUSE_TIP.po14,
          }"
          @update:model-value="onTip"
        />
      </div>

      <!-- 恢复所有不再提示 -->
      <div class="option">
        <div class="label">{{ $t("恢复所有小贴士") }}</div>
        <KButton
          v-mouse-tip="{
            text: config.tip ? MOUSE_TIP.k5j1 : MOUSE_TIP.jb12,
            disabled: !config.tip,
          }"
          :disabled="!config.tip"
          class="k-button"
          @click="handleResetTip"
        >
          {{ $t("恢复") }}
        </KButton>
      </div>
    </div>

    <!-- 重置配置 -->
    <KButton v-mouse-tip type="error" @click="handleResetConfig">{{ $t("重置配置") }}</KButton>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
