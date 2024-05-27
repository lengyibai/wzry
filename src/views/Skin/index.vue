<script setup lang="ts">
import { onActivated, ref, onDeactivated, nextTick } from "vue";
import { storeToRefs } from "pinia";

import SkinCard from "./components/SkinCard/index.vue";
import SkinToolbar from "./components/SkinToolbar/index.vue";

import { SkinStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { $imageView } from "@/utils/busTransfer";
import { _debounce, _promiseTimeout } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";
import { LibVirtualList } from "@/components/common";

defineOptions({
  name: "Skin",
});

const $skinStore = SkinStore();

const { scroll, filter_list } = storeToRefs($skinStore);

const { playAudio } = usePlayAudio();

const virtualListRef = ref<GenericComponentInstanceType<typeof LibVirtualList>>();

//实时修改一行个数
const interval_count = [
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
];

const skinToolbarRef = ref<InstanceType<typeof SkinToolbar>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_skin_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$skinStore.getSkin();

/** @description 实时修改一行个数 */
const changeCount = () => {
  const v = document.documentElement.clientWidth;

  if (v >= 2000) {
    count.value = 4;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
};

/** @description 滚动触发 */
const debounceScroll = _debounce((v: number) => {
  $skinStore.setScroll(v);
  back_top.value = v > 250;
}, 250);

/** @description 页面筛选隐藏显示动画 */
const onFilterChange = () => {
  debounceScroll(0);
  show_skin_list.value = false;
  nextTick(() => {
    show_skin_list.value = true;
  });
};

/** @description 点击侧边栏触发 */
const onSidebarChange = () => {
  onFilterChange();
  skinToolbarRef.value?._clearName();
};

/** @description 点击工具栏中的选项
 * @param id 皮肤id
 */
const onViewDetail = (e: Event, id: number) => {
  $imageView({
    id,
    parent: e.target as HTMLElement,
    type: "SKIN",
  });
  playAudio("u4c5");
};

/** @description 悬浮卡片 */
const handleEnterCard = () => {
  playAudio("n4r4");
};

/** @description 返回顶部 */
const onBackTop = () => {
  virtualListRef.value?._setPosition(0, false);
};

onActivated(async () => {
  changeCount();
  playAudio("gz43");
  window.addEventListener("resize", changeCount);

  virtualListRef.value?._setPosition(scroll.value);
  virtualListRef.value?._updateStatus();

  //显示皮肤列表
  await _promiseTimeout(250);
  show_skin_list.value = true;
});

onDeactivated(() => {
  window.removeEventListener("resize", changeCount);
});
</script>

<template>
  <div class="skin">
    <div class="skin-main">
      <transition name="to-bottom" appear>
        <SkinToolbar ref="skinToolbarRef" @change="onFilterChange" />
      </transition>

      <KBackTop :active="back_top" @back-top="onBackTop" />

      <transition name="fade">
        <LibVirtualList
          v-if="filter_list.length && show_skin_list"
          ref="virtualListRef"
          :data="filter_list"
          :column-count="count"
          @scroll="debounceScroll"
          v-slot="{ data }"
        >
          <div
            v-for="item in data"
            :key="item.id"
            @mouseenter="handleEnterCard"
            @touchstart="handleEnterCard"
          >
            <skinCard :data="item" @view="onViewDetail" />
          </div>
        </LibVirtualList>
      </transition>

      <KEmpty v-if="filter_list.length === 0" tip="你还没有拥有皮肤" />
    </div>

    <!--右侧职业分类侧边栏-->
    <FilterSidebar type="skin" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
