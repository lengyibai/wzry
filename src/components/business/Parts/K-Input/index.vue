<template>
  <div class="form-input" :class="{ disabled: disabled }">
    <input
      :type="type"
      :value="modelValue === 0 ? '' : modelValue"
      :placeholder="placeholder"
      :style="{
        width: width,
        borderColor: borderColor,
        color: color,
        textAlign: align,
        fontSize: fontSize,
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
      <div v-if="!legal" v-typewriterSingle class="tip">{{ tip }}</div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

import switchStore from "@/store/switch";

interface Props {
  modelValue: number | string; //值
  width?: string; //整体宽度
  disabled?: boolean; //禁用
  placeholder?: string; //输入框描述
  validate?: (val: string) => string; //自定义表单验证
  required?: boolean; //必填
  number?: boolean; //为数字
  borderColor?: string; //边框颜色
  line?: boolean; //显示聚焦线
  color?: string; //字体颜色
  align?: "left" | "center" | "right"; //对齐方式
  fontSize?: string; //字体大小
  type?: string; //输入框类型
}
interface Emits {
  (e: "update:modelValue", v: string | number): void;
  (e: "blur", v: string | number): void;
  (e: "focus"): void;
}

const props = withDefaults(defineProps<Props>(), {
  width: "initial",
  modelValue: "",
  placeholder: "请输入",
  validate: () => "",
  borderColor: "#fff",
  color: "#fff",
  align: "left",
  fontSize: "26px",
  type: "text",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const tip = ref(""); //不合法提示
const legal = ref(true); //是否合法
const is_focus = ref(false); //是否获取焦点

/* 获取焦点 */
const focus = () => {
  is_focus.value = true;
  emit("focus");
  $switchStore.$clickAudio();
};

/* 失去焦点 */
const blur = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  is_focus.value = false;
  legal.value = true;
  setTimeout(() => {
    if (props.validate(v)) {
      tip.value = props.validate(v);
      legal.value = false;
    }

    if (props.required && v === "") {
      tip.value = "必填项";
      legal.value = false;
    }
    if (props.number && v && isNaN(Number(v))) {
      tip.value = "限制为数字";
      legal.value = false;
    }
  });

  emit("blur", v);
};

const input = (e: Event) => {
  const v = (e.target as HTMLInputElement).value;
  emit("update:modelValue", props.number ? (isNaN(Number(v)) ? v : Number(v)) : v);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
