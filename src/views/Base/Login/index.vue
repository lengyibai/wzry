<script setup lang="ts">
import { ref, computed } from "vue";

import RegLogin from "./components/RegLogin/index.vue";
import Notice from "./components/Notice/index.vue";
import Team from "./components/Team/index.vue";
import ToolBar from "./components/ToolBar/index.vue";
import DownLoad from "./components/DownLoad/index.vue";
import UpdateLog from "./components/UpdateLog/index.vue";

import { KVideo } from "@/components/business";
import { useStaticResourceVersion } from "@/hooks";
import { _getImgLink, _getVideoLink } from "@/utils/concise";
import { VersionStore } from "@/store";

const $versionStore = VersionStore();

const { video_home_version, load } = useStaticResourceVersion();

/** 静音 */
const muted = ref(true);
/** 显示公告 */
const show_notice = ref(false);
/** 显示更新日志 */
const show_update = ref(false);
/** 显示开黑 */
const show_team = ref(false);
/** 显示下载进度 */
const show_download = ref(false);
/** 数据下载完成 */
const finish = ref(false);

/** 隐藏注册登录盒子 */
const hideRegLogin = computed(() => !finish.value || show_notice.value || show_team.value);

$versionStore
  .getVersion()
  .then(() => {
    show_download.value = true;
  })
  .catch(load);

/** @description 关闭更新弹窗 */
const onCloseUpdateDialog = () => {
  show_download.value = true;
  show_update.value = false;
};

/**
 * 点击右上角工具栏
 * @param v 点击工具栏的静音、README、公告按钮类型
 */
const onToolType = (v: string) => {
  if (v === "readme") {
    open("https://juejin.cn/post/7373937820177940518");
  }

  if (v === "sound") {
    muted.value = !muted.value;
  }

  show_notice.value = v === "notice";
  show_team.value = v === "team";
  show_update.value = v === "update";
};

setTimeout(() => {
  show_notice.value = true;
}, 1000);
</script>

<template>
  <div class="login">
    <div class="login__logo">
      <img :src="_getImgLink('logo')" alt="" />
    </div>

    <!-- 登录注册盒子 -->
    <RegLogin v-if="finish" :class="{ 'hide-reg-login': hideRegLogin }" />

    <!-- 工具栏 -->
    <ToolBar v-if="finish" @clicks="onToolType" />

    <!-- 公告 -->
    <Notice v-if="show_notice && finish" v-model="show_notice" />

    <!-- 开黑 -->
    <Team v-if="show_team" v-model="show_team" />

    <!-- 下载进度 -->
    <DownLoad v-if="!finish && show_download" v-model:finish="finish" />

    <!-- 更新日志 -->
    <teleport to="body">
      <UpdateLog v-if="$versionStore.show_update || show_update" @close="onCloseUpdateDialog" />
    </teleport>

    <!-- 图片背景 -->
    <img
      v-if="video_home_version"
      class="bg"
      :src="_getImgLink('login_bg', video_home_version, 'jpg')"
      alt=""
    />

    <!-- 视频背景 -->
    <KVideo
      v-if="finish && video_home_version"
      :link="_getVideoLink('login_bg', video_home_version)"
      :muted="muted"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
