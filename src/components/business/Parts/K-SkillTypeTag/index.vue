<script setup lang="ts">
import { $pinyin } from "@/utils";

interface Props {
  type: string; //技能类型
}
const props = withDefaults(defineProps<Props>(), {
  type: "",
});

const name = $pinyin(props.type)[0];
</script>

<template>
  <div class="k-skilltypetag">
    <div class="skill-type" :class="name">{{ type }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
