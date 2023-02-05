<script setup lang="ts" name="skin">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import SkinCard from "./childComps/SkinCard/index.vue"; //英雄卡片
import SkinToolbar from "./childComps/SkinToolbar/index.vue"; //顶部工具栏
import SkinVoice from "./childComps/SkinVoice/index.vue"; //皮肤语音

import { getSkinVoice } from "@/api/main/games/voice";
import { $debounce, $ScaleImage } from "@/utils";
import $bus from "@/utils/eventBus";
import skinStore from "@/store/skin";
import switchStore from "@/store/switch";

const $skinStore = skinStore();
const $switchStore = switchStore();

const skinListRef = ref(); //布局容器
const count = ref(0); //一行显示的数目
const show_list = ref(false); //显示列表
const show_poster = ref(false); //查看海报
const show_voice = ref(false); //查看语音
const voices = ref<Hero.Voice[]>([]); //语音列表

$switchStore.$clickAudio("9u8z");

$skinStore.getSkin(); //获取皮肤列表

/* 滚动触发 */
const EmitScroll = (v: number) => {
  $debounce(() => {
    $skinStore.setScroll(v);
  }, 250);
};

/* 加载更多 */
const EmitLoadMore = () => {
  $skinStore.loadMore();
};

/* 点击工具栏中的选项 */
const EmitShowTool = (v: { type: string; data: Hero.Skin }) => {
  if (v.type === "poster") {
    show_poster.value = true;
    new $ScaleImage(v.data.poster);
  } else if (v.type === "voice") {
    getSkinVoice(v.data.heroName, v.data.name).then((res) => {
      voices.value = res;
      show_voice.value = true;
    });
  }
  $switchStore.$clickAudio();
};

/* 悬浮卡片 */
const handleEnterCard = () => {
  $switchStore.$clickAudio("n4r4");
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
  { deep: true, immediate: true }
);

onMounted(() => {
  //实时修改一行个数
  const change = [
    [1600, 3],
    [1400, 2],
    [960, 1],
  ];
  const changeCount = () => {
    const v = document.documentElement.clientWidth;

    if (v > 1600) {
      count.value = 4;
    }
    for (const [a, b] of change) {
      if (v < a) {
        count.value = b;
      }
    }
  };
  changeCount();
  $bus.on("resize", () => {
    changeCount();
  });
});

onBeforeUnmount(() => {
  $bus.off("resize");
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
          gap="25px"
          :count="count"
          :scroll-top="$skinStore.scroll"
          @load-more="EmitLoadMore"
          @scroll="EmitScroll"
        >
          <div v-for="item in $skinStore.show_list" :key="item.id" class="skin-card" @mouseenter="handleEnterCard">
            <SkinCard :data="item" @showTool="EmitShowTool" />
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
      <K-Dialog v-if="show_voice" v-model="show_voice" width="920px" title="皮肤语音列表">
        <SkinVoice :voices="voices" />
      </K-Dialog>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
