<template>
  <td :style="{ minWidth: minWidth + 'px' }">
    <slot></slot>
  </td>
</template>
<script>
export default {
  name: "TableColumn",
  props: {
    minWidth: {
      type: String,
      default: "0",
    },
  },
};
</script>
