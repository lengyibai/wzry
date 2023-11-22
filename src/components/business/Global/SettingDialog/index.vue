<script setup lang="ts">
import { ref } from "vue";

import DescSet from "./components/DescSet/index.vue";

import KDialog from "@/components/business/Parts/K-Dialog/index.vue";
import KButton from "@/components/business/Parts/K-Button/index.vue";
import KCheck from "@/components/business/Parts/K-Check/index.vue";
import KRange from "@/components/business/Parts/K-Range/index.vue";
import KSelect from "@/components/business/Parts/K-Select/index.vue";
import { setLanguage } from "@/language";
import { configDefault } from "@/default";
import { AudioStore, MusicStore, SettingStore, CssVarStore, BarrageStore } from "@/store";
import { $bus, $message, $tip } from "@/utils";

const $audioStore = AudioStore();
const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $cssVarStore = CssVarStore();
const $barrageStore = BarrageStore();

/** 默认配置 */
const default_config: SettingConfig = { ...configDefault() };

const config = ref<SettingConfig>({ ...$settingStore.config });

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

/* 线条 */
const onBorder = (v: boolean) => {
  $cssVarStore.setBorder(v);
  saveConfig();
};

/* 阴影 */
const onShadow = (v: boolean) => {
  $cssVarStore.setShadow(v);
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
  saveConfig();
  v && $tip({ text: "2rb7" });
};

/* 恢复所有小贴士 */
const handleResetTip = () => {
  $settingStore.restoreTip();
  $message("已恢复所有小贴士");
};

/* 保存配置 */
const saveConfig = () => {
  $settingStore.saveConfig(config.value);
};

/* 显示确认重置弹窗 */
const handleResetConfig = () => {
  $bus.emit("confirm", {
    text: "确定重置所有配置项？",
    confirm: onResetConfig,
  });
};

/* 重置配置 */
const onResetConfig = () => {
  $settingStore.saveConfig(default_config);
  config.value = { ...default_config };
  const { audio, audioVolume, musicVolume, shine, shadow, border, barrage } = config.value;
  $audioStore.setAudio(audio);
  $audioStore.setVolume(audioVolume);
  $musicStore.setVolume(musicVolume);
  $barrageStore.setBarrage(barrage);
  $cssVarStore.setShine(shine);
  $cssVarStore.setShadow(shadow);
  $cssVarStore.setBorder(border);
  $message("已重置所有配置项");
};
</script>

<template>
  <KDialog v-bind="$attrs" title="设置" width="57.5rem" ctx-width="90%" up>
    <div class="options">
      <!-- 语言 -->
      <div class="option">
        <div class="label">{{ $t("语言") }}</div>
        <KSelect
          v-model="config.language"
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
        <KCheck v-model="config.audio" @update:model-value="onAudio" />
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
        <KCheck v-model="config.music" @update:model-value="onMusic" />
      </div>

      <!-- 音乐进度控制 -->
      <div class="option">
        <div class="label">
          {{ $t("弹幕语音") }}
        </div>
        <KCheck v-model="config.barrage" @update:model-value="onBarrage" />
      </div>

      <!-- 音乐进度控制 -->
      <div class="option">
        <div class="label">
          {{ $t("音乐进度控制") }}
          <DescSet desc="开启后，点击底部导航栏就可以调整播放进度" />
        </div>
        <KCheck v-model="config.musicProgress" @update:model-value="onMusicProgress" />
      </div>

      <!-- 线条 -->
      <div class="option">
        <div class="label">{{ $t("元素线条") }}</div>
        <KCheck v-model="config.border" @update:model-value="onBorder" />
      </div>

      <!-- 阴影 -->
      <div class="option">
        <div class="label">{{ $t("元素阴影") }}</div>
        <KCheck v-model="config.shadow" @update:model-value="onShadow" />
      </div>

      <!-- 柔光 -->
      <div class="option">
        <div class="label">
          {{ $t("元素发光") }}
          <DescSet desc="开启后，在一些地方悬浮、选中元素会有发光效果" />
        </div>
        <KCheck v-model="config.shine" @update:model-value="onShine" />
      </div>

      <!-- 粒子特效 -->
      <div class="option">
        <div class="label">
          {{ $t("粒子特效") }}
          <DescSet
            desc="开启后，对性能有一点影响，主要是对登录页logo、登录注册按钮、蓝黄红按钮、底部音乐播放器添加粒子效果"
          />
        </div>
        <KCheck v-model="config.particle" @update:model-value="onParticle" />
      </div>

      <!-- 小贴士 -->
      <div class="option">
        <div class="label">
          {{ $t("小贴士") }}
          <DescSet
            desc="在某些场景会触发小贴士，在左上、右上、左下、右下角弹出，介绍一些功能信息"
          />
        </div>
        <KCheck v-model="config.tip" @update:model-value="onTip" />
      </div>

      <!-- 恢复所有不再提示 -->
      <div class="option">
        <div class="label">{{ $t("恢复所有小贴士") }}</div>
        <KButton class="k-button" @click="handleResetTip">
          {{ $t("恢复") }}
        </KButton>
      </div>
    </div>

    <!-- 重置配置 -->
    <KButton type="error" @click="handleResetConfig">{{ $t("重置配置") }}</KButton>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
