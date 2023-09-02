<script setup lang="ts">
interface Props {
  /** 图标类型 */
  type: string;
  /** 文字 */
  title: string;
}
defineProps<Props>();

const icon_type: Record<string, string> = {
  add: "wzry-addbig",
  edit: "wzry-editbig",
  delete: "wzry-delbig",
};

/** 卡片背景图 */
const cardImg = (src: string) => `${IMGBED}/image/card_${src}.jpg`;
</script>

<template>
  <div class="k-manage cursor-pointer">
    <div class="box flex">
      <i class="iconfont" :class="icon_type[type]" />
      <div class="title">{{ title }}</div>
    </div>
    <img :src="cardImg(type)" alt="" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
