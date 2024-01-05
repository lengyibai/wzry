<script setup lang="ts">
import { $tool } from "@/utils";
</script>

<template>
  <teleport to="body">
    <div v-if="$tool.isPhone" class="k-phone">版本迭代阶段<br />暂不支持手机查看</div>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
