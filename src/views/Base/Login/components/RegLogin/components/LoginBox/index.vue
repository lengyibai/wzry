<script setup lang="ts">
import { ref } from "vue";
import { Base64 } from "js-base64";
import { computed } from "vue";

import IntoBtn from "../../common/components/IntoBtn/index.vue";
import RegLogTop from "../../common/components/RegLogTop/index.vue";

import { $confirm, $input, $loading, $message, $tool } from "@/utils";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { AuthStore } from "@/store";

const $authStore = AuthStore();

/** 是否处于读取状态*/
const is_reading = ref(true);
/** 是否显示删除按钮 */
const show_del = ref(false);
/** 用户数据 */
const user_data = ref<Global.UserData>();

/** 当前标题 */
const title = computed(() => (is_reading.value ? "请插入召唤师卡" : "欢迎登录"));

/* 读取文件 */
const readFile = (e: Event) => {
  const el = e.target as HTMLInputElement;
  const file = el.files?.[0];
  if (!file) return;

  if (file.name.endsWith(".wzry")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target!.result!.toString();

      try {
        const decodePwd = Base64.decode(content);
        user_data.value = JSON.parse(decodePwd);

        const handleInput = () => {
          $input({
            title: "激活召唤师卡",
            placeholder: "请输入密码",
            confirm(v) {
              $loading.show("正在激活...");
              setTimeout(() => {
                $loading.close().then(() => {
                  if (v === user_data.value!.password) {
                    is_reading.value = false;
                    $message(`${$tool.timeGreet()}，${user_data.value?.username}`);
                  } else {
                    $message("密码错误，请重新输入", "error");
                    handleInput();
                  }
                });
              }, 1000);
            },
          });
        };
        handleInput();
      } catch (error) {
        $message("文件已损坏！！！！！", "error");
      }

      el.value = "";
    };

    reader.readAsText(file);
  }
};

/* 退卡 */
const handleExit = () => {
  $confirm({
    text: "确认换卡登录吗？",
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
  <div class="log-box">
    <RegLogTop :title="title" />

    <!-- 选择卡片 -->
    <template v-if="is_reading">
      <input v-show="false" id="file" type="file" accept=".wzry" @change="readFile" />
      <label for="file" class="label">
        <i class="iconfont wzry-chaka" />
        <div class="text">点击选择卡片文件</div>
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
      <div v-else class="text">换卡</div>
    </div>

    <!-- 登录 -->
    <div v-if="!is_reading" class="log-box__btns">
      <IntoBtn
        v-mouse-tip="{
          text: MOUSE_TIP.a20t,
        }"
        text="登录"
        desc="LOGIN"
        @click="handleLogin"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
