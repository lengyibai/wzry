<template>
  <div class="K-ManageCard">
    <div class="box flex">
      <i class="iconfont" :class="icon_type[type]" />
      <div class="title">{{ title }}</div>
    </div>
    <img :src="getImg(type)" alt="" />
  </div>
</template>
<script setup lang="ts">
interface Props {
  type: string; //图标类型
  title: string; //文字
}

const icon_type: Record<string, string> = {
  add: "wzry-addbig",
  edit: "wzry-editbig",
  delete: "wzry-delbig",
};

withDefaults(defineProps<Props>(), {
  type: "add",
  title: "英雄",
});

const getImg = (src: string) => `https://lengyibai.gitee.io/wzry-material/image/card_${src}.jpg`;
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
