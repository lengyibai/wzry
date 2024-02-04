<script setup lang="ts">
import { reactive } from "vue";

import IntoBtn from "../../common/components/IntoBtn/index.vue";
import RegLogTop from "../../common/components/RegLogTop/index.vue";

import RoleSelect from "./components/RoleSelect/index.vue";

import { userDefaultInfo } from "@/default";
import { AudioStore } from "@/store";
import { $input, $message, $privateTool, $tool } from "@/utils";
import { KButton, KInput } from "@/components/business";

const $emit = defineEmits<{
  success: [];
}>();

const $audioStore = AudioStore();

/** 表单数据 */
const form = reactive<Global.UserData>({ ...userDefaultInfo() });

/* 选择图片 */
const handleSelectAvatar = (e: Event) => {
  $privateTool.selectAvatarCompress(e, (v) => {
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
      confirm(v) {
        if (v !== "200012") {
          form.role = 1;
          $message("密码错误", "error");
          return;
        }
        $message("开发者身份已确认");
      },
    });
  }
};

/* 注册 */
const handleReg = () => {
  if ($tool.existEmpty(form, ["avatar", "password", "username"])) {
    $message("请输入完整", "error");
    return;
  }

  $audioStore.play("pj83");
  $message("注册成功！请保管好你的召唤师卡！");
  $emit("success");

  $privateTool.exportCard(form);
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
        <KButton type="warning" class="k-button">点击选择头像</KButton>
      </label>
    </div>

    <!-- 帐号 -->
    <div class="reg-box__box">
      <i class="iconfont wzry-user" />
      <KInput
        v-model="form.username"
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
      class="reg-box__role-select"
      :option="['开发者', '用户']"
      @update:model-value="onSelectRole"
    />

    <!-- 注册 -->
    <div class="reg-box__btns">
      <IntoBtn text="注册" desc="REGISTER" @click="handleReg" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
