<script setup lang="ts">
import { computed, reactive } from "vue";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import KInput from "@/components/business/Parts/K-Input/index.vue";
import { LOCAL_USER } from "@/api";
import { AuthStore } from "@/store";
import { $message } from "@/utils";
import { LibUploadImg } from "@/components/common";
import { LOCAL_KEY, MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

interface Props {
  /** 帐号 */
  id: string;
}

defineProps<Props>();
const $emit = defineEmits<{
  close: [];
}>();

/** 信息是否修改 */
const status = defineModel("status", { required: true });

const $authStore = AuthStore();

/** 用户信息 */
const user_info = reactive<Global.User>({ ...$authStore.userInfo });

/** 是否修改了资料 */
const edit_status = computed(() => {
  return JSON.stringify(user_info) !== JSON.stringify($authStore.userInfo);
});

/* 判断信息是否被修改 */
const handleContrast = () => {
  status.value = edit_status.value;
};

/* 保存个人信息 */
const handleSave = () => {
  $authStore.setUserInfo(user_info);

  //更新本地当前用户信息
  LOCAL_USER.updateUser($authStore.userInfo.id, user_info).then(() => {
    localStorage.setItem(LOCAL_KEY.USER_INFO, JSON.stringify(user_info));

    //更新记住密码
    localStorage.setItem(
      LOCAL_KEY.REMEMBER_USER,
      JSON.stringify({
        id: user_info.id,
        password: user_info.password,
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
      <span
        v-mouse-tip="{
          text: MOUSE_TIP.d7i9,
          disabled: true,
        }"
        class="id"
      >
        {{ id }}
      </span>
    </div>

    <!-- 头像 -->
    <div class="option">
      <div class="label">头像</div>
      <LibUploadImg
        v-model="user_info.avatar"
        v-mouse-tip="{
          text: MOUSE_TIP.uc74,
        }"
        @update:model-value="handleContrast"
      />
    </div>

    <!-- 用户名 -->
    <div class="option">
      <div class="label">用户名</div>
      <KInput
        v-model="user_info.nickname"
        v-mouse-tip
        class="k-input"
        @update:model-value="handleContrast"
      />
    </div>

    <!-- 密码 -->
    <div class="option">
      <div class="label">密码</div>
      <KInput
        v-model="user_info.password"
        v-mouse-tip
        class="k-input"
        @update:model-value="handleContrast"
      />
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
