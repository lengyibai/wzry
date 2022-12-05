<template>
  <div class="k-herosort" :style="{ backgroundPositionY: '-' + y[occ] + 'px' }"></div>
</template>
<script setup lang="ts">
interface Props {
  occ: string; //职业
}
withDefaults(defineProps<Props>(), {
  occ: "",
});

const y: Record<string, number> = {
  坦克: 0,
  法师: 70,
  战士: 140,
  辅助: 210,
  刺客: 280,
  射手: 350,
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
