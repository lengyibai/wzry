<script setup lang="ts">
import FormLabel from "@/components/business/Form/FormLabel/index.vue";
import KInput from "@/components/business/Parts/K-Input/index.vue";
</script>
<template>
  <FormLabel v-bind="$attrs">
    <KInput v-bind="$attrs" width="15.625rem" line color="var(--theme-font-color-four)" />
  </FormLabel>
</template>
