<script setup lang="ts">
import { $tool } from "@/utils";

interface Props {
  /** 技能类型 */
  type: string;
}

const $props = withDefaults(defineProps<Props>(), {
  type: "",
});

const name = $tool.pinyin($props.type)[0];
</script>

<template>
  <div class="k-skill-type-tag">
    <div class="skill-type" :class="name">{{ type }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
