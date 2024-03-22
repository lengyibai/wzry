<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from "vue";

import { EpigraphCollocationStore } from "@/store";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";
import { _classNameInclude } from "@/utils/tool";

const $epigraphCollocationStore = EpigraphCollocationStore();

const { epigraph_colors, fill_color, fill_index, is_all_empty } =
  storeToRefs($epigraphCollocationStore);

const doms: Record<Game.Epigraph.Data["color"], HTMLElement[]> = {
  BLUE: [],
  GREEN: [],
  RED: [],
};

const epigraphSuitRef = ref<HTMLElement>();
const shineRoundRef = ref<HTMLElement>();
const blueRef = ref<HTMLElement[]>();
const greenRef = ref<HTMLElement[]>();
const redRef = ref<HTMLElement[]>();

/** 光圈位置 */
const shine_position = ref({
  left: 0,
  top: 0,
});

/** 鼠标悬浮在槽位上的文字 */
const mouse_tip = computed(() => {
  return (id?: number) => {
    if (!id) {
      return MOUSE_TIP.qu12;
    } else {
      if ($epigraphCollocationStore.color_id_selected === id) {
        return MOUSE_TIP.qr58;
      } else {
        return MOUSE_TIP.vz42;
      }
    }
  };
});

/* 选择铭文槽位 */
const handleSelect = (
  item: Game.Epigraph.Data | undefined,
  color: Remote.Epigraph.Color["value"],
  index: number,
) => {
  $epigraphCollocationStore.setFillEpigraph(item, color, index);
  shineRoundRef.value!.style.transform = "scale(2)";
  shineRoundRef.value!.style.opacity = "0.5";

  setTimeout(() => {
    shineRoundRef.value!.style.transform = `scale(1)`;
    shineRoundRef.value!.style.opacity = "1";
  }, 250);
};

/* 光圈适配 */
const shineRoundAdapter = () => {
  nextTick(() => {
    const v = fill_index.value;
    if (v === -1) {
      shineRoundRef.value!.style.opacity = "0";
      return;
    }

    const el = doms[fill_color.value!][v];
    const find = _classNameInclude(el, "epigraph")!;
    const width = epigraphSuitRef.value?.offsetWidth || 0;
    shineRoundRef.value!.style.opacity = "1";

    shine_position.value = {
      left: find.offsetLeft - width * 0.013,
      top: find.offsetTop - width * 0.014,
    };
  });
};

watch([fill_index, fill_color], shineRoundAdapter, {
  immediate: true,
});

onMounted(() => {
  doms["BLUE"] = blueRef.value!;
  doms["GREEN"] = greenRef.value!;
  doms["RED"] = redRef.value!;

  if (is_all_empty.value) {
    $epigraphCollocationStore.setFillEpigraph(undefined, "BLUE", 0);
  }
});

window.addEventListener("resize", shineRoundAdapter);

onBeforeUnmount(() => {
  window.removeEventListener("resize", shineRoundAdapter);
});
</script>

<template>
  <transition name="move" appear>
    <div ref="epigraphSuitRef" class="epigraph-suit">
      <div
        ref="shineRoundRef"
        class="shine-round"
        :style="{
          left: shine_position.left + 'px',
          top: shine_position.top + 'px',
        }"
      ></div>

      <!-- 蓝色 -->
      <div class="blue-epigraph">
        <div
          v-for="(item, index) in epigraph_colors.BLUE"
          :key="index"
          ref="blueRef"
          v-mouse-tip="{
            text: mouse_tip(item?.id),
          }"
          :class="[
            `epigraph-${index + 1}`,
            {
              active: fill_index === index && fill_color === 'BLUE',
            },
          ]"
          class="epigraph"
          @click="handleSelect(item, 'BLUE', index)"
        >
          <img :src="item?.img" alt="" />
        </div>
      </div>

      <!-- 绿色 -->
      <div class="green-epigraph">
        <div
          v-for="(item, index) in epigraph_colors.GREEN"
          :key="index"
          ref="greenRef"
          v-mouse-tip="{
            text: mouse_tip(item?.id),
          }"
          :class="[
            `epigraph-${index + 1}`,
            {
              active: fill_index === index && fill_color === 'GREEN',
            },
          ]"
          class="epigraph"
          @click="handleSelect(item, 'GREEN', index)"
        >
          <img :src="item?.img" alt="" />
        </div>
      </div>

      <!-- 红色 -->
      <div class="red-epigraph">
        <div
          v-for="(item, index) in epigraph_colors.RED"
          :key="index"
          ref="redRef"
          v-mouse-tip="{
            text: mouse_tip(item?.id),
          }"
          :class="[
            `epigraph-${index + 1}`,
            {
              active: fill_index === index && fill_color === 'RED',
            },
          ]"
          class="epigraph"
          @click="handleSelect(item, 'RED', index)"
        >
          <img :src="item?.img" alt="" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
