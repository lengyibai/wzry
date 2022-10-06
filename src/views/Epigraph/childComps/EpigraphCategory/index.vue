<template>
  <div class="EpigraphCategory">
    <img
      class="cursor-pointer"
      :style="{ left: currentIndex * 11.11 + '%' }"
      src="@/assets/img/part/icon/epigraph_active.png"
      alt
    />
    <div
      class="title cursor-pointer"
      :class="{ active: currentIndex === index }"
      @click="toggle(index)"
      v-for="(item, index) in epigraph"
      :key="index"
    >
      <span class="cursor-pointer">{{ item.title }}</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import switchStore from '@/store/globalSwitch.js';

const currentIndex = ref(0);
const epigraph = [
  { title: '全部' },
  { title: '攻击' },
  { title: '生命' },
  { title: '防御' },
  { title: '功能' },
  { title: '吸血' },
  { title: '攻速' },
  { title: '暴击' },
  { title: '穿透' },
];

const $store = switchStore();
const toggle = (index) => {
  $store.$clickAudio(`tab${index}`); //由于连续点击同样的音效名会触发重复，所以追加索引号实现唯一性
  currentIndex.value = index;
};
</script>
<style scoped lang="less">
.EpigraphCategory {
  width: 100%;
  position: relative;
  padding-bottom: 0.5em;
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  img {
    width: 11.25%;
    position: absolute;
    left: 0;
    height: 150%;
    bottom: -6px;
    transition: left 0.25s;
  }
  .title {
    text-align: center;
    position: relative;
    flex: 1;
    color: var(--theme-color-five);
    transition: color 0.25s 0.1s;
    span {
      font-size: 26px;
    }
  }
}
.active {
  color: #fff !important;
}
</style>
