<script setup lang="ts">
import { $loading, $message, $tool } from "@/utils";

/** 图片链接 */
const modelValue = defineModel({ default: "", required: true });

const fn = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  $loading.show("图片压缩中...");
  $tool.imageOptimizer({
    file,
    /** 压缩尺寸 */
    width: 150,
    /** 压缩率 */
    ratio: 0.75,
    /** 超过多大进行压缩 */
    maxSize: 300,
    /* 成功回调 */
    success: (...data) => {
      $loading.close();
      modelValue.value = data[2];
    },
    fail() {
      $loading.close();
      $message("请上传图片文件", "error");
    },
  });
};
</script>

<template>
  <div class="upload-img">
    <input v-show="false" id="file" type="file" @change="fn" />
    <img v-if="modelValue" class="img" :src="modelValue" />
    <label v-if="modelValue" for="file" class="op">
      <img src="./img/edit.svg" class="edit" alt="" />
    </label>
    <label v-if="!modelValue" for="file" class="add">
      <img src="./img/add.svg" alt="" />
    </label>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
