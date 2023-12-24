<script setup lang="ts">
import { ref } from "vue";

import { LOCAL_USER } from "@/api";
import { AudioStore } from "@/store";
import { KButton } from "@/components/business";

const $emit = defineEmits<{
  into: [v: string];
}>();

const $audioStore = AudioStore();

/** 本地用户列表 */
const user_list = ref<User[]>([]);

LOCAL_USER.userList().then((res) => {
  user_list.value = res;
});

/* 进入方式 */
const handleInto = (v: string) => {
  $emit("into", v);

  if (v === "注册") {
    $audioStore.play("v6p0");
  } else {
    $audioStore.play("pj83");
  }
};
</script>

<template>
  <div class="select-into">
    <KButton class="reg" @click="handleInto('注册')">注册</KButton>
    <KButton v-if="user_list.length" class="login" type="warning" @click="handleInto('登录')">
      登录
    </KButton>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
