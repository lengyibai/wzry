<script setup lang="ts">
import { storeToRefs } from "pinia";

import PartCollect from "../../common/PartCollect/index.vue";

import { AudioStore, YibaoStore } from "@/store";
import { YIBAO_PART } from "@/config";
import { vMouseTip } from "@/directives";

const $yibaoStore = YibaoStore();
const $audioStore = AudioStore();

const { part_type } = storeToRefs($yibaoStore);
const { setPartType } = $yibaoStore;
const { play } = $audioStore;
</script>

<template>
  <div class="personalized-menu">
    <!-- 圆环 -->
    <div
      v-for="(item, index) in YIBAO_PART.PART_KEY_LIST"
      :key="index"
      v-mouse-tip
      class="menu-item"
      @click="play(), setPartType(item)"
    >
      <div
        class="part"
        :class="{
          active: part_type === item,
        }"
      >
        <PartCollect :rate="0.75" :part-key="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
