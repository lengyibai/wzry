<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import { AuthStore } from "@/store";
import { MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { $input, $message, $selectAvatar } from "@/utils/busTransfer";
import { _selectAvatarCompress } from "@/utils/privateTool";

const $emit = defineEmits<{
  close: [];
}>();

/** 信息是否修改 */
const status = defineModel<boolean>("status", { required: true });

const $authStore = AuthStore();
const { avatar, username, password, secondaryPassword } = $authStore.user_data;

/** 用户信息 */
const user_data = reactive<Partial<User.Data>>({
  avatar,
  username,
  password,
  secondaryPassword,
});

/* 选择头像 */
const handleSelectAvatar = (e: Event) => {
  _selectAvatarCompress(e, (v) => {
    user_data.avatar = v;
  });
};

/* 选择内置头像 */
const handleSelectBuiltInAvatar = () => {
  $selectAvatar((v) => {
    user_data.avatar = v;
  });
};

/** 用户名 */
const handleRename = () => {
  $input({
    title: "修改昵称",
    placeholder: "请输入新昵称",
    value: user_data.username,
    confirm: (v, close) => {
      user_data.username = v;
      close();
    },
  });
};

/** 修改密码 */
const handleResetPwd = () => {
  // 确认旧密码
  $input({
    title: "确认旧密码",
    placeholder: "请输入旧密码",
    value: "",
    confirm: (v, close) => {
      if (v === user_data.password) {
        // close();
        // 旧密码验证通过后，输入新密码
        $input({
          title: "设置新密码",
          placeholder: "请输入新密码",
          value: "",
          confirm: (p, close) => {
            if (user_data.password === p) {
              $message("新密码与旧密码重复");
              return;
            }
            user_data.password = p;
            $message("修改密码成功！！");
            close();
          },
        });
      } else {
        $message("旧密码不正确，请重试", "error");
      }
    },
  });
};

/** 修改二级密码 */
const handleResetSecPwd = () => {
  $input({
    title: "确认二级旧密码",
    placeholder: "请输入二级旧密码",
    value: "",
    confirm: (v, close) => {
      if (v === user_data.secondaryPassword) {
        // 旧密码验证通过后，输入新密码
        $input({
          title: "设置二级新密码",
          placeholder: "请输入二级新密码",
          value: "",
          confirm: (p, close) => {
            if (user_data.secondaryPassword === p) {
              $message("新密码与旧密码重复");
              return;
            }
            user_data.secondaryPassword = p;
            $message("修改密码成功！！");
            close();
          },
        });
      } else {
        $message("旧密码不正确，请重试", "error");
      }
    },
  });
};

/** 是否修改了资料 */
const edit_status = computed(() => {
  return (
    user_data.avatar !== $authStore.user_data.avatar ||
    user_data.username !== $authStore.user_data.username ||
    user_data.password !== $authStore.user_data.password ||
    user_data.secondaryPassword !== $authStore.user_data.secondaryPassword
  );
});

/* 保存个人信息 */
const handleSave = () => {
  $authStore.updateUserData(user_data);
  $message(MESSAGE_TIP.l23d);
  $emit("close");
};

watchEffect(() => {
  status.value = edit_status.value;
});
</script>

<template>
  <div v-scroll-virtualization class="edit-user-info">
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

      <div class="select-btn">
        <label for="file">
          <KButton
            v-mouse-tip="{
              text: MOUSE_TIP.ix29,
            }"
            class="k-button"
          >
            自定义头像
          </KButton>
        </label>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.lb97,
          }"
          class="k-button"
          @click="handleSelectBuiltInAvatar"
        >
          选择内置头像
        </KButton>
      </div>
    </div>

    <!-- 用户名 -->
    <div class="option">
      <div class="label">{{ user_data.username }}</div>
      <KButton v-mouse-tip @click="handleRename">修改昵称</KButton>
    </div>

    <!-- 密码 -->
    <div class="option">
      <div class="label">{{ user_data.password!.replace(/./g, "*") }}</div>
      <KButton v-mouse-tip class="k-button" @click="handleResetPwd">修改密码</KButton>
    </div>

    <!-- 二级密码 -->
    <div class="option">
      <div class="label">{{ user_data.secondaryPassword!.replace(/./g, "*") }}</div>
      <KButton v-mouse-tip class="k-button" @click="handleResetSecPwd">修改二级密码</KButton>
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
