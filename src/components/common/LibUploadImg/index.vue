<template>
  <div class="upload-img">
    <input v-show="false" id="file" type="file" @change="fn" />
    <img v-if="modelValue" class="img" :src="modelValue" @dragstart.prevent />
    <label v-if="modelValue" for="file" class="op">
      <img src="./img/edit.svg" class="edit cursor-pointer" alt="" @dragstart.prevent />
    </label>
    <label v-if="!modelValue" for="file" class="add">
      <img src="./img/add.svg" alt="" @dragstart.prevent />
    </label>
  </div>
</template>
<script setup lang="ts">
import { $loading, $message } from "@/config";
import { $tool } from "@/utils";

interface Props {
  /** 图片链接 */
  modelValue?: string;
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: string): void;
}
const emit = defineEmits<Emits>();

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
    maxsize: 300,
    /* 成功回调 */
    success: (...data: any[]) => {
      $loading.close();
      emit("update:modelValue", data[2]);
    },
    fail: () => {
      $loading.close();
      $message("请上传图片文件", "error");
    },
  });
};
</script>
<style scoped lang="less">
.upload-img {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  width: 6.25rem;
  height: 6.25rem;
  border: 0.1875rem solid var(--theme-border-color-two);
  border-radius: 50%;

  &:hover {
    border-style: dashed;
  }

  label {
    margin-bottom: 0;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .op {
    position: absolute;
    width: 100%;
    height: 100%;

    &:hover {
      .edit {
        display: block;
      }
    }

    .edit {
      position: absolute;
      z-index: 2;
      display: none;
      padding: 1.5625rem;
      width: 100%;
      height: 100%;

      &:hover {
        background-color: var(--black-25);
      }
    }
  }

  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
