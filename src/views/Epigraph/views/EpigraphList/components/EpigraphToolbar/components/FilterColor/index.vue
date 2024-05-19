<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { vMouseTip } from "@/directives";
import { MOUSE_TIP } from "@/config";

const $emit = defineEmits<{
  change: [v?: Game.Epigraph.Data["color"]];
}>();

const $audioStore = AudioStore();

const colors: Game.Epigraph.Data["color"][] = ["BLUE", "GREEN", "RED"];

const gender = ref<Game.Epigraph.Data["color"]>();

/** @description 选择触发
 * @param v 颜色
 */
const handleSetGender = (v?: Game.Epigraph.Data["color"]) => {
  gender.value = v;
  $emit("change", v);
  $audioStore.play();
};
</script>

<template>
  <!-- 只看性别 -->
  <div class="filter-gender">
    <span class="label">只看：</span>
    <div
      v-for="(item, index) in colors"
      :key="index"
      v-mouse-tip="{
        text: MOUSE_TIP.ns41,
      }"
      class="box"
      :class="[
        item.toLocaleLowerCase(),
        {
          active: gender === item,
        },
      ]"
      @click="handleSetGender(item)"
    ></div>
    <div
      v-mouse-tip="{
        text: MOUSE_TIP.xv00,
      }"
      class="box all"
      :class="{
        active: gender === undefined,
      }"
      @click="handleSetGender()"
    ></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
