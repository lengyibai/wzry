<script setup lang="ts">
import { ref } from "vue";

import { API_USER } from "@/api";
import audioStore from "@/store/modules/audio";

interface Emits {
  (e: "into", v: string): void;
}
const emit = defineEmits<Emits>();

const $audioStore = audioStore();

const user_list = ref<User[]>([]); //本地用户列表

API_USER.userList().then((res) => {
  user_list.value = res;
});

/* 进入方式 */
const handleInto = (v: string) => {
  emit("into", v);
  if (v === "注册") {
    $audioStore.play("0o5c");
  } else {
    $audioStore.play("36jn");
  }
};
</script>

<template>
  <div class="select-into">
    <K-Button class="reg" @click="handleInto('注册')">{{ $t("注册") }}</K-Button>
    <K-Button v-if="user_list.length" class="login" type="warning" @click="handleInto('登录')">{{
      $t("登录")
    }}</K-Button>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
