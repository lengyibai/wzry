<script setup lang="ts">
import { onActivated, ref, nextTick, watch } from "vue";
import { storeToRefs } from "pinia";

import SkinCard from "./components/SkinCard/index.vue";
import SkinToolbar from "./components/SkinToolbar/index.vue";

import { SkinStore } from "@/store";
import { FilterSidebar, KBackTop, KEmpty } from "@/components/business";
import { $imageView } from "@/utils/busTransfer";
import { _debounce, _promiseTimeout } from "@/utils/tool";
import { useChangeListLineNum, usePlayAudio } from "@/hooks";
import { LibVirtualList } from "@/components/common";
import { vCardIntoAnimate } from "@/directives";

defineOptions({
  name: "Skin",
});

interface Props {
  /** 为了解决虚拟列表更新问题，进入活动页或任务页时，页面会隐藏，再次进入列表可能会无法加载 */
  visible: boolean;
}
const $props = defineProps<Props>();

const $skinStore = SkinStore();
const { scroll, show_list, finish, loading } = storeToRefs($skinStore);

const { playAudio } = usePlayAudio();
const { line_num } = useChangeListLineNum(4, [
  [2000, 4],
  [1600, 3],
  [1400, 2],
  [720, 1],
]);

const skinToolbarRef = ref<InstanceType<typeof SkinToolbar>>();
const libVirtualListRef = ref<GenericComponentInstanceType<typeof LibVirtualList>>();

/** 显示列表 */
const show_skin_list = ref(false);
/** 是否显示返回顶部 */
const back_top = ref(false);

$skinStore.getSkin();

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

/** @description 加载更多 */
const onLoadMore = () => {
  $skinStore.loadMore().then(() => {
    libVirtualListRef.value?._updateStatus();
  });
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
  libVirtualListRef.value?._setPosition(0, false);
};

watch(
  () => $props.visible,
  (v) => {
    show_skin_list.value = v;

    nextTick(() => {
      libVirtualListRef.value?._setPosition(scroll.value);
    });
  },
);

onActivated(async () => {
  playAudio("gz43");
  libVirtualListRef.value?._setPosition(scroll.value);

  await _promiseTimeout(250);
  show_skin_list.value = true;
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
          v-if="show_list.length && show_skin_list"
          ref="libVirtualListRef"
          :data="show_list"
          :column-count="line_num"
          :loading="loading"
          :finish="finish"
          @scroll="debounceScroll"
          @load-more="onLoadMore"
          v-slot="{ data }"
        >
          <div
            v-for="(item, index) in data"
            :key="item.id"
            v-card-into-animate
            :style="{
              'transition-delay': (index % (line_num * 2)) * 0.1 + 's',
            }"
            @mouseenter="handleEnterCard"
            @touchstart="handleEnterCard"
          >
            <skinCard :data="item" @view="onViewDetail" />
          </div>
        </LibVirtualList>
      </transition>

      <KEmpty v-if="show_list.length === 0" tip="你还没有拥有皮肤" />
    </div>

    <!--右侧职业分类侧边栏-->
    <FilterSidebar type="skin" @change="onSidebarChange" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
