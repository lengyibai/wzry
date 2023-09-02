<script setup lang="ts">
import { Util } from "@/utils";

interface Props {
  /** 技能类型 */
  type: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "",
});

const name = Util.TOOL.pinyin(props.type)[0];
</script>

<template>
  <div class="k-skilltypetag">
    <div class="skill-type" :class="name">{{ type }}</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
