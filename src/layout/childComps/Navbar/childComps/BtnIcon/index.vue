<script setup lang="ts">
import { ref } from "vue";
import settingStore from "@/store/setting";
import musicStore from "@/store/music";
import clickAudio from "@/store/clickAudio";
import switchStore from "@/store/globalSwitch";
import { $debounce } from "@/utils";
import DescSet from "./childComps/DescSet/index.vue"; //悬浮问号显示tip

const $settingStore = settingStore();
const $musicStore = musicStore();
const $switchStore = switchStore();
const $clickAudio = clickAudio();

// 默认配置
const default_config = {
  tip: true,
  videoBg: true,
  audio: true,
  audioVolume: 50,
  music: true,
  musicVolume: 50,
  lazy: true,
  theme: 0,
  speed: 1,
  loginSound: true,
};

const show_setting = ref(false); //是否显示设置弹窗
const show_confirm_reset = ref(false); //是否显示确认重置弹窗
const config = ref<SettingConfig>($settingStore.config);

/* 本地配置立即生效 */
const setTakeEffect = () => {
  $musicStore.setVolume(config.value.musicVolume);
  $clickAudio.setVolume(config.value.audioVolume);
};
setTakeEffect();

/* 开启音乐 */
const EmitMusic = (v: boolean) => {
  EmitSaveConfig();
  if (!v) $musicStore.pause();
};
/* 音乐音量调节 */
const EmitMusicVolume = (v: number) => {
  $debounce(() => {
    $musicStore.setVolume(v);
    $debounce(() => {
      EmitSaveConfig();
    }, 1000);
  }, 50);
};

/* 开启音效 */
const EmitAudio = (v: boolean) => {
  $clickAudio.setAudio(v);
  EmitSaveConfig();
};
/* 音效音量调节 */
const EmitAudioVolume = (v: number) => {
  $debounce(() => {
    $clickAudio.setVolume(v);
    $debounce(() => {
      EmitSaveConfig();
    }, 1000);
  }, 100);
};

/* 视频背景 */
const EmitVideoBg = () => {
  EmitSaveConfig();
};

/* 显示设置弹窗 */
const handleShowSetting = () => {
  show_setting.value = true;
  $switchStore.$tip("a");
};

/* 保存配置 */
const EmitSaveConfig = () => {
  $settingStore.saveConfig(config.value!);
};

/* 重置配置 */
const EmitResetConfig = () => {
  $settingStore.saveConfig(default_config);
  config.value = default_config;
  setTakeEffect();
  $switchStore.$msg("已重置所有配置项");
};
</script>

<template>
  <div class="btn-icon">
    <i
      class="iconfont wzry-setting cursor-pointer"
      @click="handleShowSetting"
      title="设置"
    />
    <a href="https://github.com/lengyibai/wzry" target="_blank">
      <i class="iconfont wzry-mark-github" title="Github" />
    </a>

    <transition name="fade">
      <K-Dialog
        v-if="show_setting"
        title="仅展示，功能尚未开发"
        width="920px"
        v-model="show_setting"
        up
      >
        <!-- 主题 -->
        <div class="option">
          <div class="label">主题</div>
          <K-Select v-model="config.theme" :option="['蓝', '暗']" />
        </div>

        <!-- 动画速率 -->
        <div class="option">
          <div class="label">动画速率</div>
          <K-Select
            v-model="config.speed"
            :option="['0.25x', '0.5x', '1x', '2x']"
          />
        </div>

        <!-- 音效 -->
        <div class="option">
          <div class="label">音效</div>
          <K-Range
            @update:model-value="EmitAudioVolume"
            v-model="config.audioVolume"
            :text="config.audioVolume + '%'"
            :disabled="!config.audio"
          />
          <K-Check v-model="config.audio" @change="EmitAudio" />
        </div>

        <!-- 音乐 -->
        <div class="option">
          <div class="label">音乐</div>
          <K-Range
            v-model="config.musicVolume"
            @update:model-value="EmitMusicVolume"
            :text="config.musicVolume + '%'"
            :disabled="!config.music"
          />
          <K-Check v-model="config.music" @change="EmitMusic" />
        </div>

        <!-- 视频背景 -->
        <div class="option">
          <div class="label">
            视频背景
            <DescSet
              desc="默认为图片背景是为了解决手机端部分浏览器使用视频背景会全屏遮挡的问题（PC端默认为视频背景）"
            />
          </div>
          <K-Check v-model="config.videoBg" @change="EmitVideoBg" />
        </div>

        <!-- 小贴士 -->
        <div class="option">
          <div class="label">
            小贴士
            <DescSet
              desc="在某些场景会触发小贴士，在右下角弹出，介绍一些功能信息"
            />
          </div>
          <K-Check v-model="config.tip" />
        </div>

        <!-- 列表分页展示 -->
        <div class="option">
          <div class="label">
            列表分页展示
            <DescSet
              desc="英雄列表与皮肤列表的数据将会一次性全部展示，不会进行分页加载，但这会延长加载时间"
            />
          </div>
          <K-Check v-model="config.lazy" />
        </div>

        <!-- 重置配置 -->
        <K-Button
          v-if="show_setting"
          type="error"
          @click="show_confirm_reset = true"
          >重置配置</K-Button
        >
      </K-Dialog>
    </transition>

    <!-- 确认重置 -->
    <transition name="fade">
      <ConfirmClose
        v-model="show_confirm_reset"
        v-if="show_confirm_reset"
        @confirm="EmitResetConfig"
        text="确定重置所有配置项？"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
