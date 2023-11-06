<script setup lang="ts">
import { ref } from "vue";
import _debounce from "lodash/debounce";

import DescSet from "@/components/subitem/DescSet/index.vue";
import { setLanguage } from "@/language";
import { configDefault } from "@/default";
import { AudioStore, MusicStore, SettingStore, CssVarStore } from "@/store";
import { $message, $tip } from "@/utils";

const $audioStore = AudioStore();
const $musicStore = MusicStore();
const $settingStore = SettingStore();
const $cssVarStore = CssVarStore();

/** 默认配置 */
const default_config: SettingConfig = { ...configDefault() };

/** 是否显示确认重置弹窗 */
const show_confirm_reset = ref(false);
const config = ref<SettingConfig>({ ...$settingStore.config });

/* 语言 */
const onLanguage = (v: number) => {
  setLanguage(v as 0 | 1 | 2);
  debounceSaveConfig();
};

/* 开启音乐 */
const onMusic = (v: boolean) => {
  debounceSaveConfig();
  if (v) {
    $musicStore.play(false);
  } else {
    $musicStore.pause();
  }
};

/* 音乐音量调节 */
const onMusicVolume = (v: number) => {
  $musicStore.setVolume(v);
  debounceSaveConfig();
};

/* 支持控制音乐进度 */
const onMusicProgress = () => {
  debounceSaveConfig();
};

/* 开启音效 */
const onAudio = (v: boolean) => {
  $audioStore.setAudio(v);
  debounceSaveConfig();
};

/* 音效音量调节 */
const onAudioVolume = (v: number) => {
  $audioStore.setVolume(v);
  debounceSaveConfig();
};

/* 线条 */
const onBorder = (v: boolean) => {
  $cssVarStore.setBorder(v);
  debounceSaveConfig();
};

/* 阴影 */
const onShadow = (v: boolean) => {
  $cssVarStore.setShadow(v);
  debounceSaveConfig();
};

/* 柔光 */
const onShine = (v: boolean) => {
  $cssVarStore.setShine(v);
  debounceSaveConfig();
};

/* 粒子特效 */
const onParticle = () => {
  debounceSaveConfig();
};

/* 启用/禁用Tip */
const onTip = (v: boolean) => {
  debounceSaveConfig();
  v && $tip({ text: "2rb7" });
};

/* 恢复所有小贴士 */
const handleResetTip = () => {
  $settingStore.restoreTip();
  $message("已恢复所有小贴士");
};

/* 保存配置 */
const debounceSaveConfig = _debounce(() => {
  $settingStore.saveConfig(config.value);
}, 500);

/* 重置配置 */
const onResetConfig = () => {
  $settingStore.saveConfig(default_config);
  config.value = { ...default_config };
  $audioStore.setAudio(config.value.audio);
  $audioStore.setVolume(config.value.audioVolume);
  $musicStore.setVolume(config.value.musicVolume);
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
            <DescSet desc="开启后，点击底部导航栏就可以调整播放进度" />
          </div>
          <K-Check
            v-model="config.musicProgress"
            @update:model-value="onMusicProgress"
          />
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
            <DescSet desc="开启后，在一些地方悬浮、选中元素会有发光效果" />
          </div>
          <K-Check v-model="config.shine" @update:model-value="onShine" />
        </div>

        <!-- 粒子特效 -->
        <div class="option">
          <div class="label">
            {{ $t("粒子特效") }}
            <DescSet
              desc="开启后，对性能有一点影响，主要是对登录页logo、登录注册按钮、蓝黄红按钮、底部音乐播放器添加粒子效果"
            />
          </div>
          <K-Check v-model="config.particle" @update:model-value="onParticle" />
        </div>

        <!-- 视频背景 -->
        <div class="option">
          <div class="label">
            {{ $t("视频背景") }}
            <DescSet
              desc="主要是登录页和登录后的背景，PC端默认为视频背景，手机端默认为图片背景是为了解决手机端部分浏览器使用视频背景会全屏遮挡的问题，但注意的是重置配置会开启视频背景，手机端如果出现全屏遮挡问题需要刷新浏览器解决"
            />
          </div>
          <K-Check
            v-model="config.videoBg"
            @update:model-value="debounceSaveConfig"
          />
        </div>

        <!-- 小贴士 -->
        <div class="option">
          <div class="label">
            {{ $t("小贴士") }}
            <DescSet
              desc="在某些场景会触发小贴士，在左上、右上、左下、右下角弹出，介绍一些功能信息"
            />
          </div>
          <K-Check v-model="config.tip" @update:model-value="onTip" />
        </div>

        <!-- 恢复所有不再提示 -->
        <div class="option">
          <div class="label">{{ $t("恢复所有小贴士") }}</div>
          <K-Button
            width="6.5rem"
            height="2.1875rem"
            font-size="1.25rem"
            @click="handleResetTip"
            >{{ $t("恢复") }}</K-Button
          >
        </div>
      </div>

      <!-- 重置配置 -->
      <K-Button type="error" @click="show_confirm_reset = true">{{
        $t("重置配置")
      }}</K-Button>
    </K-Dialog>

    <!-- 确认重置 -->
    <transition name="fade">
      <ConfirmClose
        v-if="show_confirm_reset"
        v-model="show_confirm_reset"
        text="确定重置所有配置项？"
        @confirm="onResetConfig"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
