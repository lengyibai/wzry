<script setup lang="ts">
import { computed } from "vue";
import { useMediaQuery } from "@vueuse/core";

import { KButton } from "@/components/business";
import type { EpigraphCollocationStoreType } from "@/store/interface";
import { EpigraphCollocationStore } from "@/store";
import { vMouseTip } from "@/directives";
import { $confirmText, MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { $input, $message, $confirm } from "@/utils/busTransfer";

interface Props {
  /** 套装信息 */
  data: Game.Epigraph.Suit;
}

const $props = defineProps<Props>();

const $epigraphCollocationStore = EpigraphCollocationStore();

const under_1200 = useMediaQuery("(max-width: 1200px)");

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

/** @description 使用方案
 * @param id 铭文方案id
 */
const handleUse = (id: string) => {
  $epigraphCollocationStore.useSuit(id);
};

/** @description 改名
 * @param id 铭文方案id
 */
const handleRename = (id: string) => {
  $input({
    value: $props.data.label,
    title: "修改方案名称",
    placeholder: "请输入新的方案名称",
    confirm(v, close) {
      $epigraphCollocationStore.renameSuit(id, v);
      $message(MESSAGE_TIP.kc58);
      close();
    },
  });
};

/** @description 删除方案
 * @param id 铭文方案id
 * @param name 方案名称
 */
const handleDelete = (id: string, name: string) => {
  $confirm({
    text: $confirmText("va64", { name }),
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
