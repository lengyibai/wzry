<script setup lang="ts">
import { ref } from "vue";

import { updateUser } from "@/api/main/user";
import authStore from "@/store/auth";
import switchStore from "@/store/switch";

interface Props {
  id: string; //帐号
  status: boolean; //信息是否修改
}
defineProps<Props>();

interface Emits {
  (e: "close"): void;
  (e: "update:status", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $authStore = authStore();
const $switchStore = switchStore();

const user_info = ref<User>({ ...$authStore.userInfo }); //用户信息

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
  $switchStore.$clickAudio("36jn");

  //更新本地当前用户信息
  updateUser($authStore.userInfo.id, user_info.value).then(() => {
    localStorage.setItem("user", JSON.stringify(user_info.value));

    //更新记住密码
    localStorage.setItem(
      "remember_user",
      JSON.stringify({
        id: user_info.value.id,
        password: user_info.value.password,
      })
    );

    $switchStore.$msg("保存成功");
  });

  emit("close");
};
</script>

<template>
  <div class="options">
    <!-- 帐号 -->
    <div class="option">
      <div class="label">帐号</div>
      <span class="id">{{ id }}</span>
    </div>

    <!-- 头像 -->
    <div class="option">
      <div class="label">头像</div>
      <UploadImg v-model="user_info.headImg" @update:model-value="handleContrast" />
    </div>

    <!-- 用户名 -->
    <div class="option">
      <div class="label">用户名</div>
      <K-Input
        v-model="user_info.nickname"
        class="input"
        border-color="var(--theme-color-three)"
        width="250px"
        align="center"
        @update:model-value="handleContrast"
      />
    </div>

    <!-- 密码 -->
    <div class="option">
      <div class="label">密码</div>
      <K-Input
        v-model="user_info.password"
        class="input"
        border-color="var(--theme-color-three)"
        width="250px"
        align="center"
        @update:model-value="handleContrast"
      />
    </div>
  </div>

  <!-- 保存 -->
  <K-Button type="warning" @click="handleSave">保存</K-Button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
