<template>
  <div class="Epigraph">
    <transition name="epigraph">
      <EpigraphCategory v-show="show_epigraph" />
    </transition>
    <div class="EpigraphMain">
      <EpigraphList :data="$epigraphStore.filter_list" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getEpigraph } from '@/api/main/game/index';
import switchStore from '@/store/globalSwitch';
import epigraphStore from '@/store/epigraph';
import EpigraphCategory from './childComps/EpigraphCategory/index.vue'; //铭文类型分类
import EpigraphList from './childComps/EpigraphList/index.vue'; //铭文列表

const $switchStore = switchStore();
const $epigraphStore = epigraphStore();

const show_epigraph = ref(false); //显示铭文顶部分类

$switchStore.$loading.show('正在请求铭文列表');
getEpigraph().then(async (res) => {
  await $switchStore.$loading.close();
  show_epigraph.value = true;
  $epigraphStore.setEpigraphList(res.data);
});
</script>
<style scoped lang="less">
@import './index.less';
</style>
