<template>
  <div class="K-SkillTypeTag">
    <div class="skill-type" :class="name">{{ type }}</div>
  </div>
</template>
<script setup lang="ts">
import { $pinyin } from "@/utils";

interface Props {
  type: string; //技能类型
}
const props = withDefaults(defineProps<Props>(), {
  type: "金币",
});

const name = $pinyin(props.type)[0];
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
