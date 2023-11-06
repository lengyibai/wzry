<script setup lang="ts">
import { $concise } from "@/utils";

interface Props {
  /** 图标类型 */
  type: string;
  /** 文字 */
  title: string;
}

defineProps<Props>();

const { getImgLink } = $concise;

const icon_type: Record<string, string> = {
  add: "wzry-addbig",
  edit: "wzry-editbig",
  delete: "wzry-delbig",
};
</script>

<template>
  <div class="k-manage">
    <div class="box">
      <i class="iconfont" :class="icon_type[type]" />
      <div class="title">{{ title }}</div>
    </div>
    <img :src="getImgLink(`card_${type}`, 'jpg')" alt="" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
