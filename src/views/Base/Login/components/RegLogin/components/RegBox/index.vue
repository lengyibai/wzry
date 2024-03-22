<script setup lang="ts">
import { reactive } from "vue";
import dayjs from "dayjs";
import { Base64 } from "js-base64";

import IntoBtn from "../../common/components/IntoBtn/index.vue";
import RegLogTop from "../../common/components/RegLogTop/index.vue";

import RoleSelect from "./components/RoleSelect/index.vue";

import { AudioStore } from "@/store";
import { KButton, KInput } from "@/components/business";
import { vMouseTip } from "@/directives";
import { DEFAULT, MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { $input, $message } from "@/utils/busTransfer";
import { _exportCard, _selectAvatarCompress } from "@/utils/privateTool";
import { _existEmpty } from "@/utils/tool";

const $emit = defineEmits<{
  success: [];
}>();

const $audioStore = AudioStore();

/** 表单数据 */
const form = reactive<Global.UserData>(DEFAULT.userDefaultInfo());

/* 选择图片 */
const handleSelectAvatar = (e: Event) => {
  _selectAvatarCompress(e, (v) => {
    form.avatar = v;
  });
};

/* 设置角色 */
const onSelectRole = (role: number) => {
  if (role === 0) {
    $input({
      title: "开发者身份确认",
      placeholder: "请输入开发者密钥",
      close() {
        form.role = 1;
      },
      confirm(v, close) {
        if (v !== "200012") {
          form.role = 1;
          $message(MESSAGE_TIP.rh43, "error");
          return;
        }
        close();
        $message(MESSAGE_TIP.kq89);
      },
    });
  }
};

/* 注册 */
const handleReg = () => {
  if (_existEmpty(form, ["avatar", "password", "username"])) {
    $message(MESSAGE_TIP.mj67, "error");
    return;
  }

  form.id = Base64.encode(dayjs().valueOf().toString());
  form.createTime = dayjs().valueOf();
  form.isDev = import.meta.env.DEV;
  _exportCard(form);

  $emit("success");
  $message(MESSAGE_TIP.fh97);
  $audioStore.play("pj83");
};
</script>

<template>
  <div class="reg-box">
    <RegLogTop title="注册召唤师卡" />

    <!-- 选择头像 -->
    <div class="avatar-select">
      <input
        v-show="false"
        id="file"
        type="file"
        accept="png,jpg,jpeg"
        @change="handleSelectAvatar"
      />

      <div class="avatar-box">
        <img v-if="form.avatar" :src="form.avatar" alt="" class="avatar" />
      </div>
      <label for="file" class="label">
        <KButton v-mouse-tip type="warning" class="k-button">点击选择头像</KButton>
      </label>
    </div>

    <!-- 帐号 -->
    <div class="reg-box__box">
      <i class="iconfont wzry-user" />
      <KInput
        v-model="form.username"
        v-mouse-tip="{
          type: 'INPUT',
        }"
        class="k-input"
        :max="6"
        :min="2"
        placeholder="请输入昵称"
        required
      />
    </div>

    <!-- 密码 -->
    <div class="reg-box__box">
      <i class="iconfont wzry-password" />
      <KInput
        v-model="form.password"
        v-mouse-tip="{
          type: 'INPUT',
        }"
        class="k-input"
        :max="6"
        :min="4"
        type="number"
        placeholder="请输入密码"
        required
      />
    </div>

    <!-- 权限选择 -->
    <RoleSelect
      v-model="form.role"
      v-mouse-tip="{
        text: MOUSE_TIP.wk98,
      }"
      class="reg-box__role-select"
      :option="['开发者', '用户']"
      @update:model-value="onSelectRole"
    />

    <!-- 注册 -->
    <div class="reg-box__btns">
      <IntoBtn
        v-mouse-tip="{
          text: MOUSE_TIP.cl81,
        }"
        text="注册"
        desc="REGISTER"
        @click="handleReg"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
