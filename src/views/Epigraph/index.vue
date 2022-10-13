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

<script setup>
import { ref } from 'vue';
import { getEpigraph } from '@/api/main/game/index.js';
import switchStore from '@/store/globalSwitch.js';
import epigraphStore from '@/store/epigraph.js';
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
.Epigraph {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .EpigraphMain {
    flex: 1;
    overflow: auto;
    padding-right: 15px;
    transition: all 0.25s;
  }
}

.epigraph-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.epigraph-leave-to {
  opacity: 0;
}

.epigraph-leave-active,
.epigraph-enter-active {
  transition: all 0.25s;
}
</style>
