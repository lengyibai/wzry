<template>
  <div class="EpigraphCard flex" v-maskGradient="{ color: 'rgb(45, 90, 142)', num1: '-35%', num2: '35%' }">
    <img :src="data.img" alt="" />
    <div class="box">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div class="type" v-for="(item, index) in data.effect" :key="index">{{ item.type }}+{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>
<style scoped lang="less">
.EpigraphCard {
  position: relative;
  background-color: var(--black-25);
  padding: 20px 0;
  background-color: rgba(27, 43, 66, 0.5);
  box-shadow: var(--b-shadow);
  img {
    width: 100px;
    filter: drop-shadow(0px 3px 3px #000);
    margin-right: 25px;
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--white);
    text-shadow: var(--t-shadow);
    .name {
      font-size: 26px;
      margin-bottom: 10px;
    }
    .attr {
      color: var(--theme-color-nine);
      .type {
        font-size: 18px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
