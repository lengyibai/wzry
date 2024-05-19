<script setup lang="ts">
import { ref, watch } from "vue";

import { vBlurLoad } from "@/directives";
import { EpigraphCollocationStore } from "@/store";
import { vWaveDiffuse } from "@/directives";

interface Props {
  /** 铭文数据 */
  data: Game.Epigraph.Data;
  /** 铭文数量 */
  count: number;
}

const $props = defineProps<Props>();

const $epigraphCollocationStore = EpigraphCollocationStore();

const epigraphCardRef = ref<HTMLElement>();

//当选中的槽位有数据时，自动滚动到id相同的库存位置
watch(
  () => $epigraphCollocationStore.color_id_selected,
  (v) => {
    if (v === $props.data.id) {
      epigraphCardRef.value!.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },
);

/** @description 当前要填充槽位的铭文
 * @param data 点击的铭文信息
 */
const handleFill = (data: Game.Epigraph.Data) => {
  $epigraphCollocationStore.fillSlot(data);
};
</script>

<template>
  <div
    ref="epigraphCardRef"
    v-wave-diffuse
    class="epigraph-card"
    :class="{
      active: $epigraphCollocationStore.color_id_selected === data.id,
      disabled: count === 0,
    }"
    @click="handleFill(data)"
  >
    <div class="left">
      <img
        v-blur-load="{
          img: data.img,
        }"
        :src="data.imgBlur"
        alt=""
      />
      <div class="count">x{{ count }}</div>
    </div>
    <div class="right">
      <div class="name">5级铭文:{{ data.name }}</div>
      <div class="attr">
        <div v-for="(item, index) in data.effect" :key="index" class="type">
          <div class="label">{{ item.type }}</div>
          <div class="value">
            +<span class="value">{{ item.num }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
