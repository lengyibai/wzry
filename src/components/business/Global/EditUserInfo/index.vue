<script setup lang="ts">
import { ref } from "vue";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import KInput from "@/components/business/Parts/K-Input/index.vue";
import { API_USER } from "@/api";
import { AuthStore, AudioStore } from "@/store";
import { $message } from "@/utils";
import { CONFIG } from "@/config";
import { LibUploadImg } from "@/components/common";

interface Props {
  /** 帐号 */
  id: string;
  /** 信息是否修改 */
  status: boolean;
}

defineProps<Props>();
const $emit = defineEmits<{
  close: [];
  "update:status": [v: boolean];
}>();

const $authStore = AuthStore();
const $audioStore = AudioStore();

/** 用户信息 */
const user_info = ref<User>({ ...$authStore.userInfo });

/* 判断信息是否被修改 */
const handleContrast = () => {
  if (JSON.stringify(user_info.value) !== JSON.stringify($authStore.userInfo)) {
    $emit("update:status", true);
  } else {
    $emit("update:status", false);
  }
};

/* 保存个人信息 */
const handleSave = () => {
  $authStore.setUserInfo(user_info.value);
  $audioStore.play("36jn");

  //更新本地当前用户信息
  API_USER.updateUser($authStore.userInfo.id, user_info.value).then(() => {
    localStorage.setItem(CONFIG.LOCAL_KEY.USER_INFO, JSON.stringify(user_info.value));

    //更新记住密码
    localStorage.setItem(
      CONFIG.LOCAL_KEY.REMEMBER_USER,
      JSON.stringify({
        id: user_info.value.id,
        password: user_info.value.password,
      }),
    );

    $message("保存成功");
  });

  $emit("close");
};
</script>

<template>
  <div class="edit-user-info">
    <!-- 帐号 -->
    <div class="option">
      <div class="label">帐号</div>
      <span class="id">{{ id }}</span>
    </div>

    <!-- 头像 -->
    <div class="option">
      <div class="label">头像</div>
      <LibUploadImg v-model="user_info.headImg" @update:model-value="handleContrast" />
    </div>

    <!-- 用户名 -->
    <div class="option">
      <div class="label">用户名</div>
      <KInput v-model="user_info.nickname" class="k-input" @update:model-value="handleContrast" />
    </div>

    <!-- 密码 -->
    <div class="option">
      <div class="label">密码</div>
      <KInput v-model="user_info.password" class="k-input" @update:model-value="handleContrast" />
    </div>
  </div>

  <!-- 保存 -->
  <KButton type="warning" @click="handleSave">保存</KButton>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
