<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { vFocus, vMouseTip } from "@/directives";
import KButton from "@/components/business/Parts/K-Button/index.vue";
import KDialog from "@/components/business/Parts/K-Dialog/index.vue";

interface Props {
  /** 添加链接弹窗标题 */
  title: string;
  /** 图片比例 */
  type?: "width" | "height" | "square";
}

withDefaults(defineProps<Props>(), {
  type: "square",
});

/** 图片路径 */
const modelValue = defineModel({ default: "" });

const $audioStore = AudioStore();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** 是否显示添加链接弹窗 */
const show_AddLink = ref(false);
/** 输入的链接 */
const input_link = ref("");

/* 选择图片 */
const handleSelect = () => {
  show_AddLink.value = true;
  $audioStore.play("v6p0");
};

/* 获取链接 */
const handleConfirm = () => {
  modelValue.value = input_link.value;
  dialogRef.value!._close();
};
</script>

<template>
  <div class="select-img" :class="[type, { border: !modelValue }]" @click="handleSelect">
    <img v-show="modelValue" :src="modelValue" alt="" />
    <i v-show="!modelValue" class="iconfont wzry-add" />
  </div>

  <!-- 添加图片链接弹窗组件 -->
  <teleport to="body">
    <KDialog
      v-if="show_AddLink"
      v-bind="$attrs"
      ref="dialogRef"
      v-model="show_AddLink"
      align="center"
    >
      <input
        v-model="input_link"
        v-focus
        type="text"
        placeholder="请输入"
        @keyup.enter="handleConfirm"
      />
      <KButton v-mouse-tip type="warning" @click="handleConfirm">确定</KButton>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
