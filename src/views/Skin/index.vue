<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  onActivated,
  ref,
  watch,
} from "vue";
import { $lazyLoadImages } from "@/utils";
import $bus from "@/utils/eventBus";
import skinStore from "@/store/skin";
import otherStore from "@/store/other";
import SkinCard from "./childComps/SkinCard/index.vue"; //英雄卡片
import SkinSidebar from "./childComps/SkinSidebar/index.vue"; //侧边栏
import SkinToolbar from "./childComps/SkinToolbar/index.vue";

const $skinStore = skinStore();
const $otherStore = otherStore();

let page = 1; //当前页数
let page_count = 30; //一页显示的个数
let page_total = 0; //总页数

const skinListRef = ref(); //布局容器
const poster = ref(""); // 查看的海报链接
const count = ref(0); //一行显示的数目
const show = ref(false); //是否显示列表
const show_poster = ref(false); //查看海报
const cache_list = ref<Hero.Skin[]>([]); //所有数据缓存
const skin_list = ref<Hero.Skin[]>([]); //当前展示的皮肤列表

$skinStore.getSkin(); //获取皮肤列表

/* 加载更多 */
const EmitLoadMore = () => {
  if (page_total > page) {
    page += 1;
    skin_list.value.push(
      ...cache_list.value.slice(page * page_count, (page + 1) * page_count)
    );
    nextTick(() => {
      skinListRef.value.updateHeight();
      const imgs = skinListRef.value.childrens.map((item: HTMLElement) => {
        return item.children[0].firstChild;
      });
      $lazyLoadImages(imgs);
    });
  }
};

/* 查看海报 */
const handleViewImg = (img: string) => {
  show_poster.value = true;
  poster.value = img;
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
    nextTick(() => {
      show.value = true;
      page_total = Math.round(cache_list.value.length / page_count);
    });
  },
  { deep: true, immediate: true }
);

/* 进入页面后更新高度 */
onActivated(() => {
  nextTick(() => {
    skinListRef.value.updateHeight();
  }).catch(() => {});
});

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
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <SkinToolbar />
      <transition name="card-list">
        <LibGridLayout
          scrollId="skin_list"
          class="skin-list"
          ref="skinListRef"
          gap="25px"
          v-if="skin_list.length && show"
          :count="count"
          :eqhMultiple="0.46"
          @load-more="EmitLoadMore"
        >
          <div
            v-for="(item, index) in skin_list"
            @click="handleViewImg(item.poster)"
            :style="{
              'transition-delay': 0.025 * index + 's',
            }"
            :key="item.id"
          >
            <SkinCard :data="item" />
          </div>
        </LibGridLayout>
      </transition>
    </div>

    <!--右侧职业分类侧边栏-->
    <transition name="sidebar" appear>
      <SkinSidebar />
    </transition>

    <transition name="fade">
      <LibViewImg v-model="show_poster" v-if="show_poster" :link="poster" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
