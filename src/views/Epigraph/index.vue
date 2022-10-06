<template>
  <div class="Epigraph">
    <transition name="epigraph">
      <EpigraphCategory v-show="show_epigraph" />
    </transition>
    <div class="EpigraphMain">
      <EpigraphList :data="epigraph_list" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getEpigraph } from '@/api/main/other/epigraph';
import switchStore from '@/store/globalSwitch.js';
import EpigraphCategory from './childComps/EpigraphCategory/index.vue'; //铭文类型分类
import EpigraphList from './childComps/EpigraphList/index.vue';
//铭文列表
const show_epigraph = ref(false); //显示铭文顶部分类
const epigraph_list = ref([]);

const $store = switchStore();
$store.$loading.show('正在请求铭文列表');
getEpigraph().then((res) => {
  $store.$loading.close();
  epigraph_list.value = res;
});

onMounted(() => {
  setTimeout(() => {
    show_epigraph.value = true;
  }, 250);
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
  }
}

/* 路由 */
.epigraph-enter {
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
