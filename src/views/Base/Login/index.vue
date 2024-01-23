<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import RegLogin from "./components/RegLogin/index.vue";
import Notice from "./components/Notice/index.vue";
import Team from "./components/Team/index.vue";
import ToolBar from "./components/ToolBar/index.vue";
import DownLoad from "./components/DownLoad/index.vue";

import { SettingStore } from "@/store";
import { $concise, $focus, $tip } from "@/utils";
import { KVideo } from "@/components/business";
import { SCENE_TIP } from "@/config";
import { useStaticResourceVersion } from "@/hooks";

const $settingStore = SettingStore();

const { config } = storeToRefs($settingStore);

const { getImgLink, getVideoLink, getHtmlLink } = $concise;

const { login_video_bg_version, login_video_cover_version } = useStaticResourceVersion();

const toolbarRef = ref<InstanceType<typeof ToolBar>>();

/** 显示公告 */
const show_notice = ref(true);
/** 显示开黑 */
const show_team = ref(false);
/** 数据下载完成 */
const finish = ref(false);

/* 隐藏注册登录盒子 */
const hideRegLogin = computed(() => !finish.value || show_notice.value || show_team.value);

/**
 * 点击右上角工具栏
 * @param v 点击工具栏的静音、README、公告按钮类型
 */
const onToolType = (v: string) => {
  if (v === "readme") {
    open(getHtmlLink("readme"));
  }
  show_notice.value = v === "notice";
  show_team.value = v === "team";
};

/* 关闭公告触发 */
const onCloseNotice = () => {
  $tip({
    text: SCENE_TIP.mu63,
    align: "right-bottom",
    color: false,
    createFn() {
      $focus.show(toolbarRef.value!._el!);
    },
    btnFn: $focus.close,
  });
};
</script>

<template>
  <div class="login">
    <div class="login__logo">
      <img :src="getImgLink('logo')" alt="" />
    </div>

    <!-- 登录注册盒子 -->
    <RegLogin v-if="finish" :class="{ 'hide-reg-login': hideRegLogin }" />

    <!-- 工具栏 -->
    <ToolBar ref="toolbarRef" :notice="finish" @clicks="onToolType" />

    <!-- 公告 -->
    <Notice v-if="show_notice && finish" v-model="show_notice" @close="onCloseNotice" />

    <!-- 开黑 -->
    <Team v-if="show_team" v-model="show_team" />

    <!-- 下载进度 -->
    <DownLoad v-if="!finish" v-model:finish="finish" />

    <!-- 图片背景 -->
    <img
      class="bg"
      :src="$concise.getImgLink('/login_bg', 'jpg', login_video_cover_version)"
      alt=""
    />

    <!-- 视频背景 -->
    <KVideo
      v-if="finish && login_video_bg_version"
      :link="getVideoLink('login_bg', login_video_bg_version)"
      :muted="config.muted"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
