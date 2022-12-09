<template>
  <td :style="{ minWidth: minWidth, width: width, padding: '0.5em 1em' }">
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
    width: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
