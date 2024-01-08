<script setup lang="ts">
interface Props {
  text: string;
}
defineProps<Props>();
</script>

<template>
  <TransitionGroup name="fade-a">
    <span v-for="item in text.split('')" :key="item" style="display: inline-block">{{ item }}</span>
  </TransitionGroup>
</template>
