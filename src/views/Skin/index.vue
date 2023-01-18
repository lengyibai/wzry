<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import SkinCard from "./childComps/SkinCard/index.vue"; //英雄卡片
import SkinSidebar from "./childComps/SkinSidebar/index.vue"; //侧边栏
import SkinToolbar from "./childComps/SkinToolbar/index.vue"; //顶部工具栏
import SkinVoice from "./childComps/SkinVoice/index.vue"; //皮肤语音

import { getSkinVoice } from "@/api/main/games/voice";
import { $lazyLoadImages } from "@/utils";
import $bus from "@/utils/eventBus";
import skinStore from "@/store/skin";
import otherStore from "@/store/other";
import switchStore from "@/store/switch";
import { $debounceInstant } from "@/utils";

const $skinStore = skinStore();
const $otherStore = otherStore();
const $switchStore = switchStore();

let page = 1; //当前页数
let page_count = 30; //一页显示的个数
let page_total = 0; //总页数

const skinListRef = ref(); //布局容器
const poster = ref(""); // 查看的海报链接
const count = ref(0); //一行显示的数目
const show = ref(false); //是否显示列表
const show_poster = ref(false); //查看海报
const show_voice = ref(false); //查看语音
const voices = ref<Hero.Voice[]>([]); //语音列表
const cache_list = ref<Hero.Skin[]>([]); //所有数据缓存
const skin_list = ref<Hero.Skin[]>([]); //当前展示的皮肤列表

$skinStore.getSkin(); //获取皮肤列表

/* 设置图片懒加载 */
const setLazyImg = () => {
  const imgs = skinListRef.value.childrens.map((item: HTMLElement) => {
    return item.children[0].firstChild;
  });
  $lazyLoadImages(imgs);
};

/* 加载更多 */
const EmitLoadMore = () => {
  if (page_total > page) {
    page += 1;
    skin_list.value.push(
      ...cache_list.value.slice(page * page_count, (page + 1) * page_count)
    );
    nextTick(() => {
      skinListRef.value.updateHeight();
      setLazyImg();
    });
  }
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
  $debounceInstant(() => {
    $switchStore.$clickAudio("tab");
  }, 50);
};

/* 监听筛选后的英雄列表 */
watch(
  () => $skinStore.filter_list,
  (v) => {
    show.value = false;
    page = 0;
    skin_list.value = [];
    cache_list.value = v;
    skin_list.value = cache_list.value.slice(
      page * page_count,
      (page + 1) * page_count
    );
    page_total = Math.round(cache_list.value.length / page_count);

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

  $switchStore.$clickAudio("皮肤");
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
        <LibGridLayout
          v-if="skin_list.length && show"
          ref="skinListRef"
          scroll-id="skin_list"
          class="skin-list"
          gap="25px"
          :count="count"
          :eqh-multiple="0.46"
          @load-more="EmitLoadMore"
        >
          <div
            v-for="(item, index) in skin_list"
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
      <SkinSidebar />
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
