<script setup lang="ts">
import { vAnimateNumber } from "@/directives";
import { _formatKilobitNumber } from "@/utils/tool";

interface Props {
  /** 长数字 */
  value: number;
}
defineProps<Props>();
</script>

<template>
  <div
    v-if="value < 1000"
    v-animate-number="{
      num: value,
      duration: 2000,
      once: false,
    }"
    class="k-long-num"
  ></div>
  <div v-else class="k-long-num">{{ _formatKilobitNumber(value) }}</div>
</template>
