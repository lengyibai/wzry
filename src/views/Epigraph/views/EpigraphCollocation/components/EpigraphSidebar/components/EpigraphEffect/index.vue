<script setup lang="ts">
import { ref } from "vue";
import _debounce from "lodash/debounce";

import EpigraphGain from "./components/EpigraphGain/index.vue";
import EpigraphInfo from "./components/EpigraphInfo/index.vue";
import type { CompKey } from "./interface";

import { EpigraphCollocationStore } from "@/store";
import { KButton, KSelect } from "@/components/business";
import { vMouseTip } from "@/directives";
import { $confirm, $message } from "@/utils";
import { MOUSE_TIP } from "@/config";

const comps = {
  GAIN: EpigraphGain,
  INFO: EpigraphInfo,
};

const index = ref(0);
const keys: Array<CompKey> = ["GAIN", "INFO"];
const comp_name = ref<CompKey>("GAIN");

const $epigraphCollocationStore = EpigraphCollocationStore();

/* 一键拆卸 */
const handleClear = () => {
  $confirm({
    text: "确定拆卸铭文吗？",
    confirm: $epigraphCollocationStore.clearColors,
  });
};

/* 铭文属性及铭文信息切换 */
const onSelect = (i: number) => {
  comp_name.value = keys[i];
};

/* 显示铭文套装 */
const handleSuit = () => {
  $epigraphCollocationStore.setSidebarStatus("SUIT");
};

/* 保存方案 */
const debounceSaveSuit = _debounce(
  () => {
    $epigraphCollocationStore.syncSuit();
    $message("已同步至方案列表，并自动保存到本地");
  },
  1000,
  { leading: true, trailing: false },
);
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
    <div class="effect-list">
      <component :is="comps[comp_name]"></component>
    </div>

    <div class="btn">
      <KButton v-mouse-tip class="k-button" @click="handleSuit">套装方案</KButton>
      <KButton
        v-mouse-tip="{
          text: MOUSE_TIP.zk84,
        }"
        type="warning"
        class="k-button"
        @click="debounceSaveSuit"
      >
        同步并保存
      </KButton>
      <KButton
        v-mouse-tip
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
