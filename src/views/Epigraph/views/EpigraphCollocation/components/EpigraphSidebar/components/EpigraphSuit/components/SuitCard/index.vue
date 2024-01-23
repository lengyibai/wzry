<script setup lang="ts">
import { computed } from "vue";

import { KButton } from "@/components/business";
import type { EpigraphCollocationStoreType } from "@/store/interface";
import { $confirm, $input } from "@/utils";
import { EpigraphCollocationStore } from "@/store";
import { useResponsive } from "@/hooks";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

interface Props {
  /** 套装信息 */
  data: EpigraphCollocationStoreType.Suit;
}

const $props = defineProps<Props>();

const $epigraphCollocationStore = EpigraphCollocationStore();

const { under_1200 } = useResponsive();

/** 套装铭文列表 */
const epigraph_list = computed(() => {
  const epigraph_colors_flat = Object.values($props.data.colors).flat(1);

  const epigraph_info: EpigraphCollocationStoreType.Info = {};
  epigraph_colors_flat.forEach((item) => {
    if (item) {
      if (epigraph_info[item.id]) {
        epigraph_info[item.id].count += 1;
      } else {
        epigraph_info[item.id] = {
          epigraph: item,
          count: 1,
        };
      }
    }
  });

  return Object.values(epigraph_info);
});

/* 使用方案 */
const handleUse = (id: string) => {
  $epigraphCollocationStore.useSuit(id);
};

/* 改名 */
const handleRename = (id: string) => {
  $input({
    value: $props.data.label,
    title: "更改方案名称",
    placeholder: "请输入新的方案名称",
    confirm(v) {
      $epigraphCollocationStore.renameSuit(id, v);
    },
  });
};

/* 删除方案 */
const handleDelete = (id: string, name: string) => {
  $confirm({
    text: `确定删除[${name}]这个方案吗？`,
    confirm() {
      $epigraphCollocationStore.deleteSuit(id);
    },
  });
};
</script>

<template>
  <div
    class="suit-card"
    :class="{
      active: $epigraphCollocationStore.current_suit?.id === data.id,
    }"
    @click="handleUse(data.id)"
  >
    <div class="name">{{ data.label }}</div>

    <div class="epigraph-list">
      <div v-for="(item, index) in epigraph_list" :key="index" class="epigraph">
        <img :src="item?.epigraph?.img" alt="" class="icon" />
        <div class="epigraph-name">{{ item?.epigraph?.name }}x{{ item?.count }}</div>
      </div>
    </div>

    <div class="tool">
      <template v-if="under_1200">
        <i
          v-mouse-tip="{
            text: MOUSE_TIP.wi76,
          }"
          class="iconfont wzry-rename"
          @click.stop="handleRename(data.id)"
        />
        <i
          v-mouse-tip="{
            text: MOUSE_TIP.ak96,
          }"
          class="iconfont wzry-delbig"
          @click.stop="handleDelete(data.id, data.label)"
        />
      </template>
      <template v-else>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.wi76,
          }"
          class="k-button"
          type="info"
          @click.stop="handleRename(data.id)"
        >
          改名
        </KButton>
        <KButton
          v-mouse-tip="{
            text: MOUSE_TIP.ak96,
          }"
          class="k-button"
          type="error"
          @click.stop="handleDelete(data.id, data.label)"
        >
          删除
        </KButton>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
