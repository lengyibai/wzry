<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

import { useGetHeroAtlas } from "./hooks/useGetHeroAtlas";

import Waterfall from "@/components/common/LibWaterfall/index.vue";
import { $tool } from "@/utils";

const { hero_atlas } = useGetHeroAtlas();

const waterfallRef = ref<InstanceType<typeof Waterfall>>();

/** 当前页数 */
const page = ref(0);
/** 总数 */
const total = ref(0);
/** 总页数 */
const total_page = ref(0);
/** 一页个数 */
const limit = ref(50);
/** 当前展示数据 */
const data = ref<HeroAtlas[]>([]);
/** 一行个数 */
const count = ref(2);

const loadMore = () => {
  if (page.value > total_page.value) {
    return;
  }
  if (page.value === 0) {
    total.value = hero_atlas.value.length;
    total_page.value = Math.ceil(total.value / limit.value);
  }

  const start = page.value * limit.value;
  const end = start + limit.value;
  const newData = hero_atlas.value.slice(start, end);
  data.value = data.value.concat(newData);
  page.value += 1;

  nextTick(() => {
    waterfallRef.value?.updateLoad();
  });
};

const setCount = () => {
  const w = document.documentElement.clientWidth;
  if (w >= 1500) {
    count.value = 5;
  } else if (w >= 1000) {
    count.value = 4;
  } else if (w >= 500) {
    count.value = 3;
  } else if (w < 500) {
    count.value = 2;
  }

  waterfallRef.value?.updateLoad();
};

onMounted(() => {
  setTimeout(() => {
    loadMore();
    setCount();
  });
});

window.addEventListener("resize", () => {
  $tool.debounce(() => {
    setCount();
  }, 500);
});
</script>

<template>
  <div class="savor">
    <Waterfall ref="waterfallRef" :count="count" @load-more="loadMore">
      <div v-for="(item, index) in data" :key="index" class="atlas-card">
        <img :src="item.cover" alt="" />
      </div>
    </Waterfall>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
