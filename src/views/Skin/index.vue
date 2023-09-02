<script setup lang="ts" name="skin">
import { nextTick, onBeforeUnmount, onActivated, onMounted, ref, watch } from "vue";

import SkinCard from "./childComps/SkinCard/index.vue";
import SkinToolbar from "./childComps/SkinToolbar/index.vue";
import SkinVoice from "./childComps/SkinVoice/index.vue";

import { Util } from "@/utils";
import { API_VOICE } from "@/api";
import { SkinStore, AudioStore } from "@/store";

const $skinStore = SkinStore();
const $audioStore = AudioStore();

const skinListRef = ref();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_list = ref(false);
/** 查看海报 */
const show_poster = ref(false);
/** 查看语音 */
const show_voice = ref(false);
/** 语音列表 */
const voices = ref<Hero.Voice[]>([]);

/* 获取皮肤列表 */
$skinStore.getSkin();

/* 滚动触发 */
const onScroll = (v: number) => {
  Util.TOOL.debounce(() => {
    $skinStore.setScroll(v);
  }, 250);
};

/* 加载更多 */
const onLoadMore = () => {
  $skinStore.loadMore();
};

/* 点击工具栏中的选项 */
const onShowTool = (v: { type: string; data: Hero.Skin }) => {
  if (v.type === "poster") {
    show_poster.value = true;
    new Util.TOOL.ScaleImage(v.data.poster);
  } else if (v.type === "voice") {
    API_VOICE.getSkinVoice(v.data.heroName, v.data.name).then((res) => {
      voices.value = res;
      show_voice.value = true;
    });
  }
  $audioStore.play();
};

/* 悬浮卡片 */
const handleEnterCard = () => {
  $audioStore.play("n4r4");
};

/* 监听筛选后的英雄列表 */
watch(
  () => $skinStore.filter_list,
  () => {
    show_list.value = false;

    nextTick(() => {
      show_list.value = true;
    });
  },
  { deep: true, immediate: true },
);

onActivated(() => {
  $audioStore.play("9u8z");
});

onMounted(() => {
  //实时修改一行个数
  const change = [
    [2400, 5],
    [2000, 4],
    [1600, 3],
    [1400, 2],
    [960, 1],
  ];
  const changeCount = () => {
    const v = document.documentElement.clientWidth;

    if (v > 2400) {
      count.value = 6;
    }
    for (const [a, b] of change) {
      if (v < a) {
        count.value = b;
      }
    }
  };
  changeCount();
  Util.$Bus.on("resize", () => {
    changeCount();
  });
});

onBeforeUnmount(() => {
  Util.$Bus.off("resize");
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <SkinToolbar />
      <transition name="card-list">
        <LibGrid
          v-if="$skinStore.show_list.length && show_list"
          ref="skinListRef"
          scroll-id="skin_list"
          class="skin-list"
          gap="1.5625rem"
          :count="count"
          :scroll-top="$skinStore.scroll"
          @load-more="onLoadMore"
          @scroll="onScroll"
        >
          <div v-for="item in $skinStore.show_list" :key="item.id" class="skin-card" @mouseenter="handleEnterCard">
            <SkinCard :data="item" @showTool="onShowTool" />
          </div>
        </LibGrid>
      </transition>
    </div>

    <!--右侧职业分类侧边栏-->
    <transition name="sidebar" appear>
      <FilterSidebar type="skin" />
    </transition>

    <!-- 语音列表 -->
    <transition name="fade">
      <K-Dialog v-if="show_voice" v-model="show_voice" width="45rem" title="皮肤语音列表">
        <SkinVoice :voices="voices" />
      </K-Dialog>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
