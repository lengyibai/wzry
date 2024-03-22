<script setup lang="ts">
interface Props {
  /** 左边距 */
  marginLeft?: string;
  /** 右边距 */
  marginRight?: string;
  /** 尺寸 */
  size?: string;
}

withDefaults(defineProps<Props>(), {
  marginLeft: "0rem",
  marginRight: "0rem",
  size: "1.5rem",
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
    }"
  >
    <div
      class="text"
      :style="{
        fontSize: `calc(${size} * 0.83)`,
      }"
    >
      ?
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
