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
import { $imageOptimizer } from "@/utils";
import switchStore from "@/store/switch";
interface Props {
  modelValue?: string;
}
defineProps<Props>();

interface Emits {
  (e: "update:modelValue", v: string): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const fn = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  $switchStore.$loading.show("图片压缩中...");
  $imageOptimizer({
    file,
    width: 150, //压缩尺寸
    ratio: 0.75, //压缩率
    maxsize: 300, //超过多大进行压缩
    /* 成功回调 */
    success: (...data: any[]) => {
      $switchStore.$loading.close();
      emit("update:modelValue", data[2]);
    },
    fail: () => {
      $switchStore.$loading.close();
      $switchStore.$msg("请上传图片文件", "error");
    },
  });
};
</script>
<style scoped lang="less">
.upload-img {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 3px solid var(--theme-color-three);
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
      width: 100%;
      height: 100%;
      padding: 25px;

      &:hover {
        background-color: var(--black-25);
      }
    }
  }

  .add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    img {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
