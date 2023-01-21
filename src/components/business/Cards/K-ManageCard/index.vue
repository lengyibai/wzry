<script setup lang="ts">
interface Props {
  type: string; //图标类型
  title: string; //文字
}
withDefaults(defineProps<Props>(), {
  type: "add",
  title: "英雄",
});

const icon_type: Record<string, string> = {
  add: "wzry-addbig",
  edit: "wzry-editbig",
  delete: "wzry-delbig",
};

//卡片背景图
const cardImg = (src: string) => `${IMGBED}/image/card_${src}.jpg`;
</script>

<template>
  <div class="k-managecard cursor-pointer">
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
