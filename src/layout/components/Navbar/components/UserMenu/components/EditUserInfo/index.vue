<script setup lang="ts">
import { computed, reactive } from "vue";
import { watchEffect } from "vue";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import { AuthStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { $input, $message, $privateTool } from "@/utils";

const $emit = defineEmits<{
  close: [];
}>();

/** 信息是否修改 */
const status = defineModel<boolean>("status", { required: true });

const $authStore = AuthStore();

/** 用户信息 */
const user_data = reactive({ ...$authStore.user_data });

/* 选择图片 */
const handleSelectAvatar = (e: Event) => {
  $privateTool.selectAvatarCompress(e, (v) => {
    user_data.avatar = v;
  });
};

/** 用户名 */
const handleRename = () => {
  $input({
    title: "修改昵称",
    placeholder: "请输入新昵称",
    value: user_data.username,
    confirm: (v) => {
      user_data.username = v;
    },
  });
};

/** 修改密码 */
const handleResetPwd = () => {
  $input({
    title: "修改密码",
    placeholder: "请输入新密码",
    value: user_data.password,
    confirm: (v) => {
      user_data.password = v;
    },
  });
};

/** 是否修改了资料 */
const edit_status = computed(() => {
  return JSON.stringify(user_data) !== JSON.stringify($authStore.user_data);
});

/* 保存个人信息 */
const handleSave = () => {
  $authStore.updateUserData(user_data);
  $message("保存成功");
  $emit("close");
};

watchEffect(() => {
  status.value = edit_status.value;
});
</script>

<template>
  <div class="edit-user-info">
    <!-- 头像 -->
    <div class="option avatar-select">
      <input
        v-show="false"
        id="file"
        type="file"
        accept="png,jpg,jpeg"
        @change="handleSelectAvatar"
      />

      <div class="avatar-box">
        <img v-if="user_data.avatar" :src="user_data.avatar" alt="" class="avatar" />
      </div>
      <label for="file" class="label">
        <KButton v-mouse-tip class="k-button">点击选择头像</KButton>
      </label>
    </div>

    <!-- 用户名 -->
    <div class="option">
      <div class="label">{{ user_data.username }}</div>
      <KButton v-mouse-tip class="k-button" @click="handleRename"> 点击修改昵称 </KButton>
    </div>

    <!-- 密码 -->
    <div class="option">
      <div class="label">{{ user_data.password.replace(/./g, "*") }}</div>
      <KButton v-mouse-tip class="k-button" @click="handleResetPwd"> 点击修改密码 </KButton>
    </div>
  </div>

  <!-- 保存 -->
  <KButton
    v-mouse-tip="{
      text: edit_status ? MOUSE_TIP.ty38 : MOUSE_TIP.sq28,
    }"
    type="warning"
    @click="handleSave"
  >
    保存
  </KButton>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
