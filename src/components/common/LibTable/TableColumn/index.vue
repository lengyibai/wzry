<template>
  <td :style="{ minWidth: minWidth, width: width, padding: '0.5em 1em' }">
    <slot></slot>
  </td>
</template>
<script lang="ts" setup>
interface Props {
  minWidth: string;
  width: string;
}
withDefaults(defineProps<Props>(), {
  minWidth: "0",
  width: "",
});
</script>
