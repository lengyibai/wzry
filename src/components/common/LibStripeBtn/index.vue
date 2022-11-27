<template>
  <div class="StripeBtn" @click="fn" :style="{ backgroundColor: bgColor, color: color }" ref="StripeBtn">
    <span>{{ text }}</span>
    <div
      class="stripe"
      v-show="modelValue"
      :style="{
        backgroundImage: themeColor[theme],
      }"
    ></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: "white",
    validator: (value) => {
      return ["white", "black"].indexOf(value) !== -1;
    },
  },
  text: {
    type: String,
    default: "按钮",
  },
  bgColor: {
    type: String,
    default: "#909399",
  },
  color: {
    type: String,
    default: "#fff",
  },
});

const themeColor = {
  white:
    "repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.75) 0px,rgba(255, 255, 255, 0.75) 1em,rgb(255, 255, 255) calc(1em - 1px),rgb(255, 255, 255) 2em)",
  black:
    "repeating-linear-gradient(115deg, rgba(0, 0, 0, 0.85) 0px,rgba(0, 0, 0, 0.85) 1em,rgb(0, 0, 0) calc(1em - 1px), rgb(0, 0, 0) 2em)",
};

const StripeBtn = ref();
onMounted(() => {
  StripeBtn.value.style.setProperty("--height", `${StripeBtn.value.offsetHeight}px`);
});

const emit = defineEmits(["click", "update:modelValue"]);
const fn = () => {
  emit("click");
  emit("update:modelValue", true);
};
</script>
<style scoped lang="less">
.StripeBtn {
  --height: 0;

  position: relative;
  overflow: hidden;
  padding: 0.75em 1.5em;
  border-radius: 0.5em;
  font-size: 25px;
  cursor: pointer;
  user-select: none;

  .stripe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: 0 0;
    background-size: calc(var(--height) - 0.625em) var(--height);
    opacity: 0.35;
    animation: grow 0.5s linear infinite;

    @keyframes grow {
      0% {
        background-position: 0 0;
      }

      100% {
        background-position: calc(var(--height) - 0.7em) 0;
      }
    }
  }
}
</style>
