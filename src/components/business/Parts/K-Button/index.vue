<template>
  <button
    class="K-Button flex"
    v-particle="{
      color: particle_color[type],
      size: 5,
    }"
    :style="style1"
  >
    <span :style="style2">
      <slot>按钮</slot>
    </span>
    <img :src="getIcon(type)" />
  </button>
</template>
<script setup lang="ts">
interface Props {
  type?: "info" | "error" | "warning"; //类型
  width?: string; //宽度
  height?: string; //高度
  fontSize?: string; //文字大小
  autoSize?: boolean; //是否自适应
}
const props = withDefaults(defineProps<Props>(), {
  type: "info",
  width: "224px",
  height: "56px",
  fontSize: "24px",
  autoSize: false,
});

const getIcon = (src: string) => `${IMGBED}/image/btn_${src}.png`;

const style1 = {
  width: props.autoSize ? "100%" : props.width,
  height: props.autoSize ? "100%" : props.height,
};

const style2 = {
  fontSize: props.fontSize,
};

const particle_color: Record<string, string> = {
  info: "#3f9ed3",
  error: "#d83e41",
  warning: "#e1c673",
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
