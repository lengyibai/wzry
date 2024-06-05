<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMediaQuery } from "@vueuse/core";
import { computed } from "vue";

import PartCollect from "../../common/PartCollect/index.vue";

import { YibaoStore } from "@/store";
import { YIBAO_PART } from "@/config";
import { vMouseTip } from "@/directives";
import { usePlayAudio } from "@/hooks";

const $yibaoStore = YibaoStore();
const { part_type } = storeToRefs($yibaoStore);
const { setPartType } = $yibaoStore;

const { playAudio } = usePlayAudio();

const under_640 = useMediaQuery("(max-width: 640px)");

const rate = computed(() => {
  if (under_640.value) return 0.65;
  return 0.75;
});
</script>

<template>
  <div class="personalized-menu">
    <div
      v-for="(item, index) in YIBAO_PART.PART_KEY_LIST"
      :key="index"
      v-mouse-tip
      class="menu-item"
      @click="playAudio(), setPartType(item)"
    >
      <div
        class="part"
        :class="{
          active: part_type === item,
        }"
      >
        <PartCollect :rate="rate" :part-key="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
