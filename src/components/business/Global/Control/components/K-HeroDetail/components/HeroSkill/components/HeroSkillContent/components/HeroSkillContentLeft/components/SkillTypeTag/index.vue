<script setup lang="ts">
import { pinyin } from "pinyin-pro";

interface Props {
  /** 技能类型 */
  type: string;
}

const $props = withDefaults(defineProps<Props>(), {
  type: "",
});

const name = pinyin($props.type, { toneType: "none", v: true, separator: "" });
</script>

<template>
  <div class="k-skill-type-tag">
    <div class="skill-type" :class="name">{{ type }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
