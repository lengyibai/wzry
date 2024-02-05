<script setup lang="ts">
import { ref } from "vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { computed, nextTick } from "vue";
import _debounce from "lodash/debounce";

import EpigraphCard from "./components/EpigraphCard/index.vue";

import { EpigraphCollocationStore } from "@/store";
import { MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { $confirm, $message } from "@/utils";
import { KButton } from "@/components/business";

const $epigraphCollocationStore = EpigraphCollocationStore();

const { fill_color, is_all_empty } = storeToRefs($epigraphCollocationStore);

const epigraphListRef = ref<HTMLElement>();

/** 鼠标悬浮在库存铭文上的文字 */
const mouse_tip = computed(() => {
  const _id = $epigraphCollocationStore.color_id_selected;
  return (id: number) => {
    if (_id === 0) {
      return MOUSE_TIP.fe59;
    } else {
      return id === _id ? MOUSE_TIP.w0h6 : MOUSE_TIP.sb17;
    }
  };
});

/* 关闭库存 */
const handleClose = () => {
  $epigraphCollocationStore.closeInventory();
};

/* 一键拆卸 */
const handleClear = () => {
  $confirm({
    text: "确定拆卸铭文吗？",
    confirm: $epigraphCollocationStore.clearColors,
  });
};

/* 显示铭文套装 */
const handleSuit = () => {
  $epigraphCollocationStore.closeInventory();
  nextTick(() => {
    $epigraphCollocationStore.setSidebarStatus("SUIT");
  });
};

/* 保存方案 */
const debounceSaveSuit = _debounce(
  () => {
    $epigraphCollocationStore.syncSuit();
    $message(MESSAGE_TIP.l23d);
    handleSuit();
  },
  1000,
  { leading: true, trailing: false },
);

/* 切换颜色时回调顶部 */
watch(fill_color, () => {
  epigraphListRef.value!.scrollTop = 0;
});
</script>

<template>
  <div class="epigraph-inventory">
    <div class="inventory">
      <div class="title">
        <div class="label">铭文库存</div>
        <i
          v-if="!is_all_empty"
          v-mouse-tip="{
            text: MOUSE_TIP.ir00,
          }"
          class="iconfont wzry-close"
          @click="handleClose"
        />
      </div>
      <div ref="epigraphListRef" v-scroll-virtualization class="epigraph-list">
        <template v-for="(item, index) in $epigraphCollocationStore.current_inventory" :key="index">
          <EpigraphCard
            v-mouse-tip="{
              text: mouse_tip(item.epigraph.id),
            }"
            :data="item.epigraph"
            :count="item.count"
          />
        </template>
      </div>
    </div>

    <div class="btn">
      <KButton v-mouse-tip class="k-button" @click="handleSuit">套装方案</KButton>
      <KButton
        v-mouse-tip="{
          text: $epigraphCollocationStore.is_all_empty ? MOUSE_TIP.g5l7 : MOUSE_TIP.zk84,
          disabled: $epigraphCollocationStore.is_all_empty,
        }"
        type="warning"
        class="k-button"
        :disabled="$epigraphCollocationStore.is_all_empty"
        @click="debounceSaveSuit"
      >
        保存
      </KButton>
      <KButton
        v-mouse-tip="{
          text: $epigraphCollocationStore.is_all_empty ? MOUSE_TIP.g5l7 : '',
          disabled: $epigraphCollocationStore.is_all_empty,
        }"
        class="k-button"
        type="error"
        :disabled="$epigraphCollocationStore.is_all_empty"
        @click="handleClear"
      >
        一键拆卸
      </KButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
