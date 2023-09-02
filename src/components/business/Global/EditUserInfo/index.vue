<script setup lang="ts">
import { ref } from "vue";

import { API_USER } from "@/api";
import { $message } from "@/config";
import { AuthStore, AudioStore } from "@/store";

interface Props {
  /** 帐号 */
  id: string;
  /** 信息是否修改 */
  status: boolean;
}
defineProps<Props>();

interface Emits {
  (e: "close"): void;
  (e: "update:status", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $authStore = AuthStore();
const $audioStore = AudioStore();

/** 用户信息 */
const user_info = ref<User>({ ...$authStore.userInfo });

/* 判断信息是否被修改 */
const handleContrast = () => {
  if (JSON.stringify(user_info.value) !== JSON.stringify($authStore.userInfo)) {
    emit("update:status", true);
  } else {
    emit("update:status", false);
  }
};

/* 保存个人信息 */
const handleSave = () => {
  $authStore.setUserInfo(user_info.value);
  $audioStore.play("36jn");

  //更新本地当前用户信息
  API_USER.updateUser($authStore.userInfo.id, user_info.value).then(() => {
    localStorage.setItem("user", JSON.stringify(user_info.value));

    //更新记住密码
    localStorage.setItem(
      "remember_user",
      JSON.stringify({
        id: user_info.value.id,
        password: user_info.value.password,
      }),
    );

    $message("保存成功");
  });

  emit("close");
};
</script>

<template>
  <div class="edit-user-info">
    <!-- 帐号 -->
    <div class="option">
      <div class="label">{{ $t("帐号") }}</div>
      <span class="id">{{ id }}</span>
    </div>

    <!-- 头像 -->
    <div class="option">
      <div class="label">{{ $t("头像") }}</div>
      <LibUploadImg v-model="user_info.headImg" @update:model-value="handleContrast" />
    </div>

    <!-- 用户名 -->
    <div class="option">
      <div class="label">{{ $t("用户名") }}</div>
      <K-Input
        v-model="user_info.nickname"
        class="input"
        border-color="var(--theme-border-color-two)"
        width="15.625rem"
        align="center"
        @update:model-value="handleContrast"
      />
    </div>

    <!-- 密码 -->
    <div class="option">
      <div class="label">{{ $t("密码") }}</div>
      <K-Input
        v-model="user_info.password"
        class="input"
        border-color="var(--theme-border-color-two)"
        width="15.625rem"
        align="center"
        @update:model-value="handleContrast"
      />
    </div>
  </div>

  <!-- 保存 -->
  <K-Button type="warning" @click="handleSave">{{ $t("保存") }}</K-Button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
