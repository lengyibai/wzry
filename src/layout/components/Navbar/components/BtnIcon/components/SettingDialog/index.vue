<script setup lang="ts">
import { ref } from "vue";

import { setLanguage } from "@/language";
import { MusicStore, SettingStore } from "@/store";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { CONFIRM_TIP, CUSTOM_TIP, MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { KDialog, KButton, KRange, KSelect, KCheck } from "@/components/business";
import { $tip, $confirm, $message } from "@/utils/busTransfer";
import { useCssClassToggle, usePlayAudio } from "@/hooks";
import { useBarrages } from "@/layout/components/BarrageMain/hooks/useBarrages";

const $musicStore = MusicStore();
const $settingStore = SettingStore();

const { setAudioSwitch, setAudioVolume } = usePlayAudio();
const { setBarrage } = useBarrages();

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
  setBarrage(v);
  saveConfig();
};

/* 开启音效 */
const onAudio = (v: boolean) => {
  setAudioSwitch(v);
  saveConfig();
};

/* 音效音量调节 */
const onAudioVolume = (v: number) => {
  setAudioVolume(v);
  saveConfig();
};

/* 柔光 */
const onShine = (v: boolean) => {
  useCssClassToggle().setShine(v);
  saveConfig();
};

/* 启用/禁用Tip */
const onTip = (v: boolean) => {
  !v &&
    $tip({
      text: CUSTOM_TIP.qk36,
    });
  saveConfig();
  v &&
    $tip({
      text: CUSTOM_TIP.hg86,
    });
};

/* 恢复所有小贴士 */
const handleResetTip = () => {
  $tip({
    btnText: "立刻刷新",
    text: CUSTOM_TIP.sm04,
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
    text: CONFIRM_TIP.i8p8,
    confirm() {
      $settingStore.resetConfig();
      $message(MESSAGE_TIP.j5l7);
      config.value = $settingStore.config;
    },
  });
};
</script>

<template>
  <KDialog v-bind="$attrs" title="设置" width="57.5rem" up>
    <div class="setting">
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
            :option="['中文', 'English']"
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
            :show-step="false"
            max-width="100%"
            width="45%"
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
            max-width="100%"
            width="45%"
            :show-step="false"
            @update:model-value="onMusicVolume"
          />
          <KCheck v-model="config.music" v-mouse-tip @update:model-value="onMusic" />
        </div>

        <!-- 弹幕语音 -->
        <div class="option">
          <div class="label">
            {{ $t("弹幕语音") }}
          </div>
          <KCheck
            v-model="config.barrage"
            v-mouse-tip="{
              text: MOUSE_TIP.i7w1,
            }"
            @update:model-value="onBarrage"
          />
        </div>

        <!-- 夺宝动画 -->
        <div class="option">
          <div class="label">
            {{ $t("夺宝动画") }}
          </div>
          <KCheck
            v-model="config.lotteryAnimation"
            v-mouse-tip="{
              text: MOUSE_TIP.fc15,
            }"
            @update:model-value="saveConfig"
          />
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
            @update:model-value="saveConfig"
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
            @update:model-value="saveConfig"
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
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
