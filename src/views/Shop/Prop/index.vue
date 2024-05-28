<script setup lang="ts">
import { onActivated, ref, onDeactivated } from "vue";

import PropCard from "./components/PropCard/index.vue";

import { LibGrid } from "@/components/common";
import { _debounce, _promiseTimeout } from "@/utils/tool";
import { GAME_PROP } from "@/config";
import { usePlayAudio } from "@/hooks";

defineOptions({
  name: "PropShop",
});

const { playAudio } = usePlayAudio();

//实时修改一行个数
const interval_count = [
  [2400, 5],
  [1400, 4],
  [1100, 3],
  [680, 2],
  [400, 1],
];

const propListRef = ref<InstanceType<typeof LibGrid>>();

/** 一行显示的数目 */
const count = ref(0);
/** 显示列表 */
const show_prop_list = ref(false);

/** @description 实时修改一行个数 */
const debounceChangeCount = _debounce(() => {
  const v = document.documentElement.clientWidth;

  if (v >= 2400) {
    count.value = 6;
  }
  for (const [a, b] of interval_count) {
    if (v < a) {
      count.value = b;
    }
  }
}, 100);

onActivated(() => {
  playAudio("o3l2");
});

onActivated(async () => {
  debounceChangeCount();
  window.addEventListener("resize", debounceChangeCount);

  //显示英雄列表
  await _promiseTimeout(250);
  show_prop_list.value = true;
});

onDeactivated(() => {
  window.removeEventListener("resize", debounceChangeCount);
});
</script>

<template>
  <div class="prop">
    <div class="prop-main">
      <transition name="card-list">
        <LibGrid
          v-if="show_prop_list"
          ref="propListRef"
          gap="1rem"
          :count="count"
          :load-more="false"
        >
          <transition-group name="prop-card" appear>
            <div
              v-for="(item, index) in GAME_PROP.PRICE"
              :key="index"
              class="prop-card"
              :style="{
                'transition-delay': (index % (count * 2)) * 0.1 + 's',
              }"
            >
              <PropCard :data="item" />
            </div>
          </transition-group>
        </LibGrid>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
