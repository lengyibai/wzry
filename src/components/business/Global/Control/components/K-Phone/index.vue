<script setup lang="ts">
import { ref } from "vue";

import { $tool } from "@/utils";
const show = ref(true);
</script>

<template>
  <teleport to="body">
    <div v-if="$tool.isPhone && show" class="k-phone" @dblclick="show = false">
      版本迭代阶段<br />暂不支持手机查看
    </div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
