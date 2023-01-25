<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import SkinCard from "./childComps/SkinCard/index.vue"; //英雄卡片
import SkinToolbar from "./childComps/SkinToolbar/index.vue"; //顶部工具栏
import SkinVoice from "./childComps/SkinVoice/index.vue"; //皮肤语音

import { getSkinVoice } from "@/api/main/games/voice";
import { $debounce } from "@/utils";
import $bus from "@/utils/eventBus";
import skinStore from "@/store/skin";
import otherStore from "@/store/collapse";
import switchStore from "@/store/switch";

const $skinStore = skinStore();
const $otherStore = otherStore();
const $switchStore = switchStore();

const skinListRef = ref(); //布局容器
const poster = ref(""); // 查看的海报链接
const count = ref(0); //一行显示的数目
const show = ref(false); //显示列表
const show_poster = ref(false); //查看海报
const show_voice = ref(false); //查看语音
const voices = ref<Hero.Voice[]>([]); //语音列表

$switchStore.$clickAudio("9u8z");
$switchStore.$loading.close();

if ($skinStore.skin_list.length === 0) {
  $skinStore.getSkin(); //获取皮肤列表
}

/* 滚动触发 */
const EmitScroll = (v: number) => {
  $debounce(() => {
    $skinStore.setScroll(v);
  }, 250);
};

/* 加载更多 */
const EmitLoadMore = () => {
  $skinStore.loadMore();
  nextTick(() => {
    skinListRef.value.updateHeight();
  });
};

/* 点击工具栏中的选项 */
const EmitShowTool = (v: { type: string; data: Hero.Skin }) => {
  if (v.type === "poster") {
    poster.value = v.data.poster;
    show_poster.value = true;
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
    show.value = false;

    nextTick(() => {
      show.value = true;
    });
  },
  { deep: true, immediate: true }
);

/* 折叠展开侧边栏时触发 */
$otherStore.setTriggerFn(() => {
  skinListRef.value.updateHeight();
});

onMounted(() => {
  //实时修改一行个数
  const change = [
    [1550, 3],
    [1450, 2],
    [1300, 1],
  ];
  const changeCount = () => {
    const v = document.documentElement.clientWidth;

    if (v > 1400) {
      count.value = 3;
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
  $otherStore.clearTrigger();
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <SkinToolbar />
      <transition name="card-list">
        <LibGridLayout
          v-if="$skinStore.show_list.length && show"
          ref="skinListRef"
          scroll-id="skin_list"
          class="skin-list"
          gap="25px"
          :count="count"
          :eqh-multiple="0.46"
          :scroll-top="$skinStore.scroll"
          @load-more="EmitLoadMore"
          @scroll="EmitScroll"
        >
          <div
            v-for="(item, index) in $skinStore.show_list"
            :key="item.id"
            :style="{
              'transition-delay': 0.025 * index + 's',
            }"
            @mouseenter="handleEnterCard"
          >
            <SkinCard :data="item" @showTool="EmitShowTool" />
          </div>
        </LibGridLayout>
      </transition>
    </div>

    <!--右侧职业分类侧边栏-->
    <transition name="sidebar" appear>
      <FilterSidebar type="skin" />
    </transition>

    <!-- 大图预览 -->
    <transition name="fade">
      <LibViewImg v-if="show_poster" v-model="show_poster" :link="poster" />
    </transition>

    <!-- 语音列表 -->
    <transition name="fade">
      <K-Dialog
        v-if="show_voice"
        v-model="show_voice"
        width="920px"
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
