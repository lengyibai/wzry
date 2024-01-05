<script setup lang="ts">
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
</script>
<template>
  <a
    v-mouse-tip="{
      text: MOUSE_TIP.vz77,
    }"
    class="copyright"
    href="https://github.com/lengyibai"
    target="_blank"
  >
    @{{ $t("冷弋白") }}
  </a>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
