<script setup lang="ts">
import { onUnmounted, onActivated, onMounted, ref } from "vue";
import _debounce from "lodash/debounce";
import { storeToRefs } from "pinia";

import SkinCard from "./childComps/SkinCard/index.vue";
import SkinToolbar from "./childComps/SkinToolbar/index.vue";
import SkinVoice from "./childComps/SkinVoice/index.vue";

import LibGrid from "@/components/common/LibGrid/index.vue";
import { API_VOICE } from "@/api";
import { SkinStore, AudioStore } from "@/store";
import { $tool, $bus } from "@/utils";

defineOptions({
  name: "skin",
});

const { getSkin, setScroll, loadMore } = SkinStore();
const { scroll, finish, show_list } = storeToRefs(SkinStore());
const $audioStore = AudioStore();

const skinListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_skinlist = ref(false);
/** 查看海报 */
const show_poster = ref(false);
/** 显示工具栏 */
const show_tool = ref(false);
/** 查看语音 */
const show_voice = ref(false);
/** 语音列表 */
const voices = ref<Hero.Voice[]>([]);

/* 获取皮肤列表 */
getSkin();

const debounceScroll = _debounce((v: number) => {
  setScroll(v);
}, 250);
/* 滚动触发 */
const onScroll = (v: number) => {
  debounceScroll(v);
};

/* 加载更多 */
const onLoadMore = () => {
  loadMore();
};

/* 点击工具栏中的选项 */
const onShowTool = (v: { type: string; data: Hero.Skin }) => {
  if (v.type === "poster") {
    show_poster.value = true;
    new $tool.ScaleImage(v.data.poster);
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

onActivated(() => {
  $audioStore.play("9u8z");
  skinListRef.value?.setPosition(scroll.value);
});

onMounted(async () => {
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

    if (v >= 2400) {
      count.value = 6;
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

  //显示工具栏
  await $tool.promiseTimeout(() => {
    show_tool.value = true;
  }, 500);
  //显示英雄列表
  await $tool.promiseTimeout(() => {
    show_skinlist.value = true;
  }, 250);
});

onUnmounted(() => {
  $bus.off("resize");
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <transition name="fade" appear>
        <SkinToolbar v-show="show_tool" />
      </transition>

      <transition name="card-list">
        <LibGrid
          v-if="show_list.length && show_skinlist"
          ref="skinListRef"
          :finish="finish"
          scroll-id="skin_list"
          gap="1.5625rem"
          :count="count"
          :scroll-top="scroll"
          @load-more="onLoadMore"
          @scroll="onScroll"
        >
          <div
            v-for="item in show_list"
            :key="item.id"
            class="skin-card"
            @mouseenter="handleEnterCard"
          >
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
      <K-Dialog
        v-if="show_voice"
        v-model="show_voice"
        width="45rem"
        title="皮肤语音列表"
      >
        <SkinVoice :voices="voices" />
      </K-Dialog>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
