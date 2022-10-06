<template>
  <div class="K-HeroSort" :style="{ backgroundPositionY: '-' + y[occ] + 'px' }"></div>
</template>
<script setup>
defineProps({
  occ: {
    type: String,
    default: '',
  },
});

const y = {
  坦克: 0,
  法师: 70,
  战士: 140,
  辅助: 210,
  刺客: 280,
  射手: 350,
};
</script>
<style scoped lang="less">
.K-HeroSort {
  width: 290px;
  height: 70px;
  background-image: url('./img/k-profession.png');
  background-repeat: no-repeat;
  background-position: 0 0;
  filter: drop-shadow(0px 3px 1px #000);
}
</style>
