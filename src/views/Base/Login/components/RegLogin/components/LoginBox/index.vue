<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";

import IntoBtn from "../../common/components/IntoBtn/index.vue";
import RegLogTop from "../../common/components/RegLogTop/index.vue";

import { $confirm, $input, $message, $privateTool, $tool } from "@/utils";
import { vDragAnalysis, vMouseTip } from "@/directives";
import { AuthStore } from "@/store";
import { CONFIRM_TIP, MESSAGE_TIP } from "@/config";

const $authStore = AuthStore();

/** 是否处于读取状态*/
const is_reading = ref(true);
/** 拖拽文件进入状态 */
const drag_enter = ref(false);
/** 是否显示删除按钮 */
const show_del = ref(false);
/** 用户数据 */
const user_data = ref<Global.UserData>();

/** 当前标题 */
const title = computed(() => {
  return is_reading.value ? (drag_enter.value ? "松开解析卡片" : "请放置召唤师卡") : "欢迎登录";
});

/* 拖拽进入 */
const onDragEnter = () => {
  drag_enter.value = true;
};

/* 拖拽离开 */
const onDragLeave = () => {
  drag_enter.value = false;
};

/* 解析文件 */
const onDragEnd = (file: File) => {
  readFile(file);
  onDragLeave();
};

/* 读取文件 */
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
        user_data.value = $privateTool.decryption(content);

        const handleInput = () => {
          $input({
            title: "读取召唤师卡",
            placeholder: "请输入密码",
            confirm(v, close) {
              if (v === user_data.value!.password) {
                is_reading.value = false;
                close();
                $message(`${$tool.timeGreet}，${user_data.value?.username}`);
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
  }
};

/* 退卡 */
const handleExit = () => {
  $confirm({
    text: CONFIRM_TIP.wi59,
    confirm() {
      is_reading.value = true;
      user_data.value = undefined;
    },
  });
};

/* 登录 */
const handleLogin = () => {
  if (!user_data.value) return;
  $authStore.login(user_data.value!);
};
</script>

<template>
  <div
    v-drag-analysis="{
      getFile: onDragEnd,
      enter: onDragEnter,
      leave: onDragLeave,
    }"
    class="log-box"
  >
    <RegLogTop :title="title" />

    <!-- 选择卡片 -->
    <template v-if="is_reading">
      <input v-show="false" id="file" type="file" accept=".wzry" @change="readFile" />
      <label v-mouse-tip for="file" class="label">
        <i class="iconfont wzry-chaka" />
        <div class="text">点击选择卡片文件</div>
      </label>
      <div v-if="!$tool.isPhone" class="tip">支持拖拽文件到此处</div>
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

    <!-- 登录 -->
    <div v-if="!is_reading" class="log-box__btns">
      <IntoBtn v-mouse-tip text="登录" desc="LOGIN" @click="handleLogin" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
