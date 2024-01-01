<script setup lang="ts">
import { vParticle } from "@/directives";
import { SettingStore } from "@/store";

interface Props {
  /** 类型 */
  type?: "info" | "error" | "warning";
  /** 是否禁用 */
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: "info",
});

const $settingStore = SettingStore();

/** 粒子颜色 */
const particle_color = {
  info: "#3f9ed3",
  error: "#d83e41",
  warning: "#e1c673",
};

/** 类名 */
const class_name = {
  info: "spirit_btn-info",
  error: "spirit_btn-error",
  warning: "spirit_btn-warning",
};
</script>

<template>
  <button
    v-particle="{
      color: particle_color[type],
      size: 5,
      enable: $settingStore.config.particle,
    }"
    :disabled="disabled"
    :class="[type, { disable: disabled }, class_name[type]]"
    class="k-button"
  >
    <span class="text">
      <slot>按钮</slot>
    </span>
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
