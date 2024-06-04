<script setup lang="ts">
import { ref, computed } from "vue";
import { Base64 } from "js-base64";

import { _isPhone, _timeGreet, _blobTextToBase64, dayjs } from "@/utils/tool";
import { MESSAGE_TIP, CONFIRM_TIP, DEFAULT, $msgTipText, MOUSE_TIP } from "@/config";
import { AuthStore } from "@/store";
import { $input, $message, $confirm } from "@/utils/busTransfer";
import { _decryption } from "@/utils/privateTool";
import { _getMiscLink } from "@/utils/concise";
import { vDebounceClick, vDragAnalysis, vMouseTip, vParticleEffect } from "@/directives";
import { useParallax, usePlayAudio } from "@/hooks";

const { playAudio } = usePlayAudio();

const RegLoginRef = ref<HTMLElement>();

const $authStore = AuthStore();

/** 是否处于读取状态*/
const is_reading = ref(true);
/** 拖拽文件进入状态 */
const drag_enter = ref(false);
/** 是否显示删除按钮 */
const show_del = ref(false);
/** 用户数据 */
const user_data = ref<User.Data>();

//鼠标移动视差动画
useParallax((x: number, y: number) => {
  if (!RegLoginRef.value) return;
  RegLoginRef.value.style.transform = `translate(-50%, -50%) rotateX(${y * 10}deg) rotateY(${
    -x * 10
  }deg)`;
});

/** 当前标题 */
const title = computed(() => {
  return is_reading.value ? (drag_enter.value ? "松开解析卡片" : "请放置召唤师卡") : "欢迎登录";
});

/** @description 拖拽进入 */
const onDragEnter = () => {
  drag_enter.value = true;
};

/** @description 拖拽离开 */
const onDragLeave = () => {
  drag_enter.value = false;
};

/** @description 解析文件
 * @param file 拖拽放置的文件
 */
const onDragEnd = (file: File) => {
  readFile(file);
  onDragLeave();
};

/** @description 读取文件
 * @param e 解析选择的文件或拖拽放置的文件
 */
const readFile = (e: Event | File) => {
  let file: File;
  let el: HTMLInputElement;
  if (e instanceof Event) {
    el = e.target as HTMLInputElement;
    file = el.files![0];
  } else {
    file = e;
  }

  if (file.name.endsWith(".wzry")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target!.result!.toString();

      try {
        user_data.value = _decryption(content);

        if (import.meta.env.DEV && !user_data.value.isDev) {
          $message($msgTipText("mg14", { v: "生产" }), "error");
          return;
        }

        if (!import.meta.env.DEV && user_data.value.isDev) {
          $message($msgTipText("mg14", { v: "开发" }), "error");
          return;
        }

        const handleInput = () => {
          $input({
            title: "读取召唤师卡",
            placeholder: "请输入密码",
            confirm(v, close) {
              if (v === user_data.value!.password) {
                is_reading.value = false;
                close();
                $message(`${_timeGreet}，${user_data.value?.username}`);
              } else {
                $message(MESSAGE_TIP.rh43, "error");
                handleInput();
              }
            },
          });
        };
        handleInput();
      } catch (error) {
        $message(MESSAGE_TIP.by88, "error");
      }

      el && (el.value = "");
    };

    reader.readAsText(file);
  } else {
    $message(MESSAGE_TIP.ai11, "error");
  }
};

/** @description 一键注册卡片 */
const handleRegister = async () => {
  const form = DEFAULT.userInfoDefault();
  form.avatar = await _blobTextToBase64(_getMiscLink("head"));
  form.username = "召唤师";
  form.password = "123456";
  form.id = Base64.encode(dayjs().valueOf().toString());
  form.createTime = dayjs().valueOf();
  form.isDev = import.meta.env.DEV;

  $message(MESSAGE_TIP.fh97);
  $authStore.login(form);
  playAudio("e84n");
};

/** @description 换卡 */
const handleExit = () => {
  $confirm({
    text: CONFIRM_TIP.wi59,
    confirm() {
      is_reading.value = true;
      user_data.value = undefined;
    },
  });
};

/** @description 登录 */
const debounceLogin = () => {
  if (!user_data.value) return;

  $authStore.login(user_data.value);
  playAudio("e84n");
};
</script>

<template>
  <div
    ref="RegLoginRef"
    v-drag-analysis="{
      getFile: onDragEnd,
      enter: onDragEnter,
      leave: onDragLeave,
    }"
    class="reg-login"
  >
    <!-- logo -->
    <div
      v-particle-effect="{
        down: true,
        colors: ['#EFD68F', '#E0B34E'],
      }"
      class="logo-box"
    >
      <img class="logo" :src="_getMiscLink('login_logo')" alt="logo" />
    </div>

    <!-- 标题 -->
    <div class="title" :data-text="title">
      {{ title }}
    </div>

    <!-- 选择卡片 -->
    <template v-if="is_reading">
      <input v-show="false" id="file" type="file" @change="readFile" />
      <label
        v-mouse-tip="{
          text: MOUSE_TIP.g9x6,
        }"
        for="file"
        class="label"
      >
        <i class="iconfont wzry-chaka" />
        <div class="text">
          <div class="select">点击选择卡片文件</div>
          <div v-if="!_isPhone" class="tip">支持拖拽文件到此处</div>
        </div>
      </label>
    </template>

    <!-- 卡片信息 -->
    <div
      v-else
      class="card-info"
      :class="{
        del: show_del,
      }"
      @click="handleExit"
      @mouseenter="show_del = true"
      @mouseleave="show_del = false"
    >
      <template v-if="!show_del">
        <img :src="user_data?.avatar" alt="" class="avatar" />
        <div class="username">{{ user_data?.username }}</div>
      </template>
      <div v-else v-mouse-tip class="text">换卡</div>
    </div>

    <!-- 游客访问 -->
    <div
      v-debounce-click="handleRegister"
      v-mouse-tip="{
        text: MOUSE_TIP.xj79,
      }"
      class="demo"
    >
      没有卡片？点击此处生成
    </div>

    <!-- 登录 -->
    <div
      v-if="!is_reading"
      v-particle-effect="{
        colors: ['#986B33', '#CEA64E'],
      }"
      v-debounce-click="debounceLogin"
      class="into-btn"
      :style="{
        backgroundImage: `url(${_getMiscLink('login_btn')})`,
      }"
    >
      <span class="text">登录</span>
      <span class="desc">LOGIN</span>
      <img class="bg" :src="_getMiscLink('login_btn')" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
