<template>
  <div class="form-input" :class="{ disabled: disabled }" :style="{ width: width }">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :maxlength="max"
      :style="{
        borderColor: borderColor,
        color: color,
        textAlign: align,
        fontSize: fontSize,
        paddingLeft: paddingLeft,
      }"
      @input="input"
      @focus="focus"
      @blur="blur"
    />

    <!-- 获取焦点拉长线条 -->
    <transition name="border">
      <div v-if="line" v-show="is_focus" class="focus"></div>
    </transition>

    <!-- 输入不合法拉长线条 -->
    <transition name="border">
      <div v-show="!legal" class="border"></div>
    </transition>

    <!-- 输入不合法提示 -->
    <transition name="tip">
      <div v-if="!legal" :style="{ marginLeft: paddingLeft }" class="tip">
        {{ tip }}
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";

interface Props {
  /** 值 */
  modelValue: number | string;
  /** 整体宽度 */
  width?: string;
  /** 禁用 */
  disabled?: boolean;
  /** 输入框描述 */
  placeholder?: string;
  /** 边框颜色 */
  borderColor?: string;
  /** 显示聚焦线 */
  line?: boolean;
  /** 字体颜色 */
  color?: string;
  /** 左内边距 */
  paddingLeft?: string;
  /** 对齐方式 */
  align?: "left" | "center" | "right";
  /** 字体大小 */
  fontSize?: string;
  /** 输入框类型 */
  type?: string;
  /** 最小位数 */
  min?: number;
  /** 最大位数 */
  max?: number;
  /** 必填 */
  required?: boolean;
  /** 为数字 */
  number?: boolean;
  /** 禁止含有特殊字符 */
  noSpecial?: boolean;
  /** 自定义表单验证 */
  validate?: (val: string) => string;
}
interface Emits {
  (e: "update:modelValue", v: string | number): void;
  (e: "blur", v: string | number): void;
  (e: "focus"): void;
  (e: "update:empty", v: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  width: "initial",
  modelValue: "",
  placeholder: "请输入",
  validate: () => "",
  borderColor: "#fff",
  color: "#fff",
  align: "left",
  fontSize: "1.625rem",
  type: "text",
  noSpecial: false,
});
const emit = defineEmits<Emits>();

const $audioStore = AudioStore();

/** 不合法提示 */
const tip = ref("");
/** 是否合法 */
const legal = ref(true);
/** 是否获取焦点 */
const is_focus = ref(false);

/* 获取焦点 */
const focus = () => {
  is_focus.value = true;
  emit("focus");
  $audioStore.play();
};

/* 失去焦点 */
const blur = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  is_focus.value = false;
  emit("update:empty", false);
  setTimeout(() => {
    if (props.required && v === "") {
      tip.value = "必填项";
      legal.value = false;
      return;
    }
    if (props.noSpecial && !/^[\u4E00-\u9FA5A-Za-z0-9._]+$/.test(v) && v !== "") {
      tip.value = "不能含有特殊字符";
      legal.value = false;
      return;
    }

    if (props.number && !/^[0-9]*$/.test(v)) {
      tip.value = "限制为数字";
      legal.value = false;
      return;
    }

    if (props.min && v.length < props.min) {
      tip.value = `至少${props.min}位`;
      legal.value = false;
      return;
    }

    if (props.validate(v)) {
      tip.value = props.validate(v);
      legal.value = false;
      return;
    }

    legal.value = true;
    emit("update:empty", true);
  });

  emit("blur", v);
};

const input = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  emit("update:modelValue", v);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
