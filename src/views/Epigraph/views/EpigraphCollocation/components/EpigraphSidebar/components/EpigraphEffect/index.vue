<script setup lang="ts">
import { ref } from "vue";

import EpigraphGain from "./components/EpigraphGain/index.vue";
import EpigraphInfo from "./components/EpigraphInfo/index.vue";
import type { CompKey } from "./interface";

import { EpigraphCollocationStore } from "@/store";
import { KButton, KSelect } from "@/components/business";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { MOUSE_TIP } from "@/config";

const comps = {
  GAIN: EpigraphGain,
  INFO: EpigraphInfo,
};

const index = ref(0);
const keys: Array<CompKey> = ["GAIN", "INFO"];
const comp_name = ref<CompKey>("GAIN");

const $epigraphCollocationStore = EpigraphCollocationStore();

/** @description 铭文属性及铭文信息切换
 * @param i 铭文展示组件索引
 */
const onSelect = (i: number) => {
  comp_name.value = keys[i];
};

/** @description 显示铭文套装 */
const handleSuit = () => {
  $epigraphCollocationStore.setSidebarStatus("SUIT");
};
</script>

<template>
  <div class="epigraph-effect">
    <div class="title">
      <span class="label">{{ $epigraphCollocationStore.current_suit?.label }}</span>
      <KSelect
        v-model="index"
        v-mouse-tip="{
          text: MOUSE_TIP.mc72,
        }"
        width="7rem"
        :option="['属性', '数量']"
        @update:model-value="onSelect"
      />
    </div>
    <div v-scroll-virtualization class="effect-list">
      <component :is="comps[comp_name]"></component>
    </div>

    <div class="btn">
      <KButton v-mouse-tip class="k-button" @click="handleSuit">套装方案</KButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
