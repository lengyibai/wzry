<script setup lang="ts">
import { onActivated, ref } from "vue";

import PropCard from "./components/PropCard/index.vue";

import { LibGrid } from "@/components/common";
import { _promiseTimeout } from "@/utils/tool";
import { GAME_PROP } from "@/config";
import { useChangeListLineNum, usePlayAudio } from "@/hooks";

defineOptions({
  name: "PropShop",
});

const { playAudio } = usePlayAudio();
const { line_num } = useChangeListLineNum(6, [
  [2400, 5],
  [1400, 4],
  [1100, 3],
  [680, 2],
  [400, 1],
]);

const propListRef = ref<InstanceType<typeof LibGrid>>();

/** 显示列表 */
const show_prop_list = ref(false);

onActivated(() => {
  playAudio("o3l2");
});

onActivated(async () => {
  //显示英雄列表
  await _promiseTimeout(250);
  show_prop_list.value = true;
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
          :count="line_num"
          :load-more="false"
        >
          <transition-group name="prop-card" appear>
            <div
              v-for="(item, index) in GAME_PROP.PRICE"
              :key="index"
              class="prop-card"
              :style="{
                'transition-delay': (index % (line_num * 2)) * 0.1 + 's',
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
