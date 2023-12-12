<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { KDialog } from "@/components/business";
import { API_DATA } from "@/api";

const $audioStore = AudioStore();

const todo = ref("");

API_DATA.Todo().then((res) => {
  todo.value = res.data;
});

$audioStore.play("kj62");
</script>

<template>
  <KDialog :audio="false" v-bind="$attrs" width="56.25rem" header="网站计划清单" up>
    <div class="todo">
      <div class="content" v-html="todo"></div>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
