<script setup lang="ts">
import FormLabel from "@/components/business/Form/FormLabel/index.vue";
import KInput from "@/components/business/Parts/K-Input/index.vue";
</script>

<template>
  <FormLabel v-bind="$attrs">
    <KInput class="k-input" v-bind="$attrs" line />
  </FormLabel>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
