<script setup lang="ts">
interface Props {
  /** 垂直偏移 */
  top?: string;
  /** 左边距 */
  marginLeft?: string;
  /** 右边距 */
  marginRight?: string;
  /** 尺寸 */
  size?: string;
  /** 符号垂直偏移 */
  textTop?: string;
  /** 符号水平 */
  textLeft?: string;
}

withDefaults(defineProps<Props>(), {
  marginLeft: "0rem",
  marginRight: "0rem",
  size: "1.5rem",
  top: "0",
  textTop: "0.15rem",
  textLeft: "0",
});
</script>

<template>
  <div
    class="k-help"
    :style="{
      marginLeft: marginLeft,
      marginRight: marginRight,
      width: size,
      height: size,
      transform: `translateY(${top})`,
    }"
  >
    <div
      class="text"
      :style="{
        fontSize: `calc(${size} * 0.83)`,
        transform: `translate(${textLeft},${textTop})`,
      }"
    >
      <slot>?</slot>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
