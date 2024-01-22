<script setup lang="ts">
import { ref, watch } from "vue";

import { vAnimateNumber, vBlurLoad } from "@/directives";
import { EpigraphCollocationStore } from "@/store";

interface Props {
  /** 铭文数据 */
  data: Game.Epigraph.Data;
  /** 铭文数量 */
  count: number;
}

const $props = defineProps<Props>();

const $epigraphCollocationStore = EpigraphCollocationStore();

const epigraphCardRef = ref<HTMLElement>();

/* 当前要填充槽位的铭文 */
const handleFill = (data: Game.Epigraph.Data) => {
  $epigraphCollocationStore.fillSlot(data);
};

/* 当选中的槽位有数据时，自动滚动到id相同的库存位置 */
watch(
  () => $epigraphCollocationStore.color_id_selected,
  (v) => {
    if (v === $props.data.id) {
      epigraphCardRef.value!.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },
);
</script>

<template>
  <div
    ref="epigraphCardRef"
    class="epigraph-card"
    :class="{
      active: $epigraphCollocationStore.color_id_selected === data.id,
      disabled: count === 0,
    }"
    @click="handleFill(data)"
  >
    <div class="left">
      <img v-blur-load="data.img" :src="data.imgBlur" alt="" />
      <div class="count">x{{ count }}</div>
    </div>
    <div class="right">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div v-for="(item, index) in data.effect" :key="index" class="type">
          <div class="label">{{ item.type }}</div>
          <div class="value">
            +<span
              v-animate-number="{
                num: item.num,
                decimalPlaces: 1,
              }"
              class="value"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
