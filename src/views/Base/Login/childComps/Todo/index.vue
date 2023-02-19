<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";
import { Todo } from "@/api/main/data";

const $switchStore = switchStore();

const todo = ref("");

Todo().then((res) => {
  todo.value = res.data;
});

$switchStore.$clickAudio("u4c5");
</script>

<template>
  <K-Dialog v-bind="$attrs" width="900px" header="微信小程序">
    <div class="todo">
      <h1>商城系统</h1>
      <div class="content" v-html="todo"></div>
    </div>
  </K-Dialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
