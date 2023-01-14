<script setup lang="ts">
import { ref, computed } from "vue";
import { $timeGreet } from "@/utils";
import { updateUser } from "@/api/main/user";
import authStore from "@/store/auth";
import switchStore from "@/store/globalSwitch";

const $authStore = authStore();
const $switchStore = switchStore();

const show_menu = ref(false); //显示用户菜单
const show_edit = ref(false); //显示编辑个人信息弹窗
const user_info = $authStore.userInfo;

const timeGreet = computed(() => $timeGreet());

const role = computed(() => {
  return user_info.role === 0 ? "管理员" : "普通用户";
});

/* 退出登录 */
const logout = async () => {
  $switchStore.$clickAudio();
  $switchStore.$loading.show("正在退出");
  await $authStore.logout();
  await $switchStore.$loading.close();
};

/* 编辑个人信息 */
const handleEditInfo = () => {
  show_edit.value = true;
};

/* 保存个人信息 */
const EmitSaveInfo = () => {
  show_edit.value = false;
  updateUser(user_info.id!, user_info).then(() => {
    localStorage.setItem("user", JSON.stringify(user_info)); //更新本地当前用户信息
    $switchStore.$tip("本地信息更新成功");
  });
};
</script>

<template>
  <div
    class="user-menu"
    @mouseenter="show_menu = true"
    @mouseleave="show_menu = false"
    :class="{ hover: show_menu }"
  >
    <img
      class="head-img"
      :src="
        user_info.headImg ||
        'https://lengyibai.gitee.io/img-bed/wzry/image/unknown.png'
      "
      alt="头像"
    />
    <div class="user-card">
      <div class="name lib-one-line">
        {{ timeGreet }}，{{ user_info.nickname }}
      </div>
      <div class="role">身份：{{ role }}</div>

      <div class="btns">
        <div class="edit">
          <K-Button fontSize="20px" @click="handleEditInfo" autoSize
            >编辑个人信息</K-Button
          >
        </div>
        <div class="logout" @click="logout">
          <K-Button type="error" fontSize="20px" autoSize>退出登录</K-Button>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
    <K-Dialog
      v-if="show_edit"
      @close="EmitSaveInfo"
      title="编辑个人资料"
      width="920px"
      v-model="show_edit"
    >
      <!-- 头像 -->
      <div class="option">
        <div class="label">头像</div>
        <UploadImg v-model="user_info.headImg" />
      </div>

      <!-- 用户名 -->
      <div class="option">
        <div class="label">用户名</div>
        <K-Input
          class="input"
          border-color="var(--theme-color-three)"
          width="10em"
          v-model="user_info.nickname"
        />
      </div>

      <!-- 密码 -->
      <div class="option">
        <div class="label">密码</div>
        <K-Input
          class="input"
          border-color="var(--theme-color-three)"
          width="12em"
          v-model="user_info.password"
        />
      </div>
    </K-Dialog>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
