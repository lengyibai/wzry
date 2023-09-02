<script setup lang="ts">
import { ref } from "vue";

import DescSet from "./childComps/DescSet/index.vue";

import { setLanguage } from "@/language";
import { configDefault } from "@/default";
import { $message, $tip } from "@/config";
import { AudioStore, MusicStore, SettingStore, CssVarStore } from "@/store";
import { $tool } from "@/utils";

const $audioStore = AudioStore();
const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $cssVarStore = CssVarStore();

/** 默认配置 */
const default_config: SettingConfig = { ...configDefault };

/** 是否显示确认重置弹窗 */
const show_confirm_reset = ref(false);
const config = ref<SettingConfig>({ ...$settingStore.config });

/* 语言 */
const onLanguage = (v: number) => {
  setLanguage(v as 0 | 1 | 2);
  onSaveConfig();
};

/* 动画速率 */
const onSpeed = (v: number) => {
  $cssVarStore.setSpeed(v as 0 | 1 | 2);
  onSaveConfig();
};

/* 开启音乐 */
const onMusic = (v: boolean) => {
  onSaveConfig();
  if (v) {
    $musicStore.play(false);
  } else {
    $musicStore.pause();
  }
};

/* 音乐音量调节 */
const onMusicVolume = (v: number) => {
  $musicStore.setVolume(v);
  $tool.debounce(() => {
    onSaveConfig();
  }, 1000);
};

/* 支持控制音乐进度 */
const onMusicProgress = () => {
  onSaveConfig();
};

/* 开启音效 */
const onAudio = (v: boolean) => {
  $audioStore.setAudio(v);
  onSaveConfig();
};

/* 音效音量调节 */
const onAudioVolume = (v: number) => {
  $audioStore.setVolume(v);
  $tool.debounce(() => {
    onSaveConfig();
  }, 1000);
};

/* 线条 */
const onBorder = (v: boolean) => {
  $cssVarStore.setBorder(v);
  onSaveConfig();
};

/* 阴影 */
const onShadow = (v: boolean) => {
  $cssVarStore.setShadow(v);
  onSaveConfig();
};

/* 柔光 */
const onShine = (v: boolean) => {
  $cssVarStore.setShine(v);
  onSaveConfig();
};

/* 粒子特效 */
const onParticle = () => {
  onSaveConfig();
};

/* 启用/禁用Tip */
const onTip = (v: boolean) => {
  onSaveConfig();
  v && $tip({ text: "2rb7" });
};

/* 恢复所有小贴士 */
const handleResetTip = () => {
  $settingStore.restoreTip();
  $message("已恢复所有小贴士");
};

/* 保存配置 */
const onSaveConfig = () => {
  $settingStore.saveConfig(config.value);
};

/* 重置配置 */
const onResetConfig = () => {
  $settingStore.saveConfig(default_config);
  config.value = { ...default_config };
  $audioStore.setAudio(config.value.audio);
  $audioStore.setVolume(config.value.audioVolume);
  $musicStore.setVolume(config.value.musicVolume);
  $cssVarStore.setSpeed(config.value.speed);
  $cssVarStore.setShine(config.value.shine);
  $cssVarStore.setShadow(config.value.shadow);
  $cssVarStore.setBorder(config.value.border);
  $message("已重置所有配置项");
};
</script>

<template>
  <div class="setting-dialog">
    <K-Dialog v-bind="$attrs" title="设置" width="57.5rem" ctx-width="90%" up>
      <div class="options">
        <!-- 语言 -->
        <div class="option">
          <div class="label">{{ $t("语言") }}</div>
          <K-Select
            v-model="config.language"
            width="7rem"
            :option="['中文', '繁体', 'English']"
            @update:model-value="onLanguage"
          />
        </div>

        <!-- 动画速率 -->
        <div class="option">
          <div class="label">{{ $t("动画") }}</div>
          <K-Select
            v-model="config.speed"
            width="7rem"
            :option="[$t('迅速'), $t('均衡'), $t('优雅')]"
            @update:model-value="onSpeed"
          />
        </div>

        <!-- 音效 -->
        <div class="option">
          <div class="label">{{ $t("音效") }}</div>
          <K-Range
            v-model="config.audioVolume"
            :text="config.audioVolume + '%'"
            :disabled="!config.audio"
            @update:model-value="onAudioVolume"
          />
          <K-Check v-model="config.audio" @update:model-value="onAudio" />
        </div>

        <!-- 音乐 -->
        <div class="option">
          <div class="label">{{ $t("音乐") }}</div>
          <K-Range
            v-model="config.musicVolume"
            :text="config.musicVolume + '%'"
            :disabled="!config.music"
            @update:model-value="onMusicVolume"
          />
          <K-Check v-model="config.music" @update:model-value="onMusic" />
        </div>

        <!-- 音乐进度控制 -->
        <div class="option">
          <div class="label">
            {{ $t("音乐进度控制") }}
            <DescSet desc="音乐进度控制描述" />
          </div>
          <K-Check v-model="config.musicProgress" @update:model-value="onMusicProgress" />
        </div>

        <!-- 线条 -->
        <div class="option">
          <div class="label">{{ $t("元素线条") }}</div>
          <K-Check v-model="config.border" @update:model-value="onBorder" />
        </div>

        <!-- 阴影 -->
        <div class="option">
          <div class="label">{{ $t("元素阴影") }}</div>
          <K-Check v-model="config.shadow" @update:model-value="onShadow" />
        </div>

        <!-- 柔光 -->
        <div class="option">
          <div class="label">
            {{ $t("元素发光") }}
            <DescSet desc="元素发光描述" />
          </div>
          <K-Check v-model="config.shine" @update:model-value="onShine" />
        </div>

        <!-- 粒子特效 -->
        <div class="option">
          <div class="label">
            {{ $t("粒子特效") }}
            <DescSet desc="粒子特效描述" />
          </div>
          <K-Check v-model="config.particle" @update:model-value="onParticle" />
        </div>

        <!-- 视频背景 -->
        <div class="option">
          <div class="label">
            {{ $t("视频背景") }}
            <DescSet desc="视频背景描述" />
          </div>
          <K-Check v-model="config.videoBg" @update:model-value="onSaveConfig" />
        </div>

        <!-- 小贴士 -->
        <div class="option">
          <div class="label">
            {{ $t("小贴士") }}
            <DescSet desc="小贴士描述" />
          </div>
          <K-Check v-model="config.tip" @update:model-value="onTip" />
        </div>

        <!-- 恢复所有不再提示 -->
        <div class="option">
          <div class="label">{{ $t("恢复所有小贴士") }}</div>
          <K-Button width="6.5rem" height="2.1875rem" font-size="1.25rem" @click="handleResetTip">{{
            $t("恢复")
          }}</K-Button>
        </div>
      </div>

      <!-- 重置配置 -->
      <K-Button type="error" @click="show_confirm_reset = true">{{ $t("重置配置") }}</K-Button>
    </K-Dialog>

    <!-- 确认重置 -->
    <transition name="fade">
      <ConfirmClose v-if="show_confirm_reset" v-model="show_confirm_reset" text="重置配置项" @confirm="onResetConfig" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
