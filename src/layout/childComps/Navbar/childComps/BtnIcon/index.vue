<script setup lang="ts">
import { ref } from "vue";
import settingStore from "@/store/setting";
import DescSet from "./childComps/DescSet/index.vue"; //悬浮问号显示tip

const $settingStore = settingStore();

const show_setting = ref(false); //是否显示设置弹窗
const config = ref();

config.value = JSON.parse(JSON.stringify($settingStore.config));

/* 显示设置弹窗 */
const handleShowSetting = () => {
  show_setting.value = true;
};

/* 保存配置 */
const EmitSaveConfig = () => {
  $settingStore.saveConfig(config.value);
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
        @close="EmitSaveConfig"
        title="仅展示，功能尚未开发"
        width="920px"
        v-model="show_setting"
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

        <!-- 点击音效 -->
        <div class="option">
          <div class="label">点击音效</div>
          <K-Range
            v-model="config.audioVolume"
            :text="config.audioVolume + '%'"
            :disabled="!config.audio"
          />
          <K-Check v-model="config.audio" />
        </div>

        <!-- 背景音乐 -->
        <div class="option">
          <div class="label">背景音乐</div>
          <K-Range
            v-model="config.musicVolume"
            :text="config.musicVolume + '%'"
            :disabled="!config.music"
          />
          <K-Check v-model="config.music" />
        </div>

        <!-- 视频背景 -->
        <div class="option">
          <div class="label">
            视频背景
            <DescSet
              desc="默认为图片背景是为了解决手机端部分浏览器使用视频背景会全屏遮挡的问题（PC端默认为视频背景）"
            />
          </div>
          <K-Check v-model="config.videoBg" />
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
      </K-Dialog>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
