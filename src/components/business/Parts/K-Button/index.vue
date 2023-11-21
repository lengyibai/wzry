<script setup lang="ts">
import { vParticle } from "@/directives";
import { SettingStore } from "@/store";
import { $concise } from "@/utils";

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

const { getImgLink } = $concise;

/** 粒子颜色 */
const particle_color = {
  info: "#3f9ed3",
  error: "#d83e41",
  warning: "#e1c673",
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
    :class="[type, { disable: disabled }]"
    class="k-button"
    :style="{
      backgroundImage: `url(${getImgLink(`btn_${type}`)})`,
    }"
  >
    <span class="text">
      <slot>按钮</slot>
    </span>
  </button>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
