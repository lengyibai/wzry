<script setup lang="ts">
import { storeToRefs } from "pinia";

import KLongNum from "../K-LongNum/index.vue";

import { GAME_PROP } from "@/config";
import { KnapsackStore } from "@/store";
import { _getPropLink } from "@/utils/concise";
import { vMouseTip } from "@/directives";

interface Props {
  /** 道具键名 */
  propKey: Game.PropKey;
  /** 图标宽度 */
  width?: string;
  /** 图标高度 */
  height?: string;
  /** 字体大小 */
  fontSize?: string;
  /** 间距 */
  gap?: string;
  /** 左边距 */
  marginLeft?: string;
  /** 右边距 */
  marginRight?: string;
  /** 字体阴影 */
  textShadow?: string;
  /** 是否需要光效 */
  shine?: boolean;
}
withDefaults(defineProps<Props>(), {
  width: "initial",
  height: "initial",
  fontSize: "1.75rem",
  gap: "0.5rem",
  marginRight: "0",
  textShadow: "var(--t-shadow-e)",
  shine: false,
});

const $knapsackStore = KnapsackStore();
const { articles } = storeToRefs($knapsackStore);
</script>

<template>
  <div
    v-mouse-tip="{
      type: 'TIP',
      text: GAME_PROP.DESC[propKey],
    }"
    :style="{
      marginLeft,
      marginRight,
    }"
    class="k-prop-num"
  >
    <img
      class="icon"
      :style="{
        width,
        height,
        marginRight: gap,
      }"
      :class="{ shine }"
      :src="_getPropLink(GAME_PROP.ICON[propKey])"
      alt=""
    />
    <KLongNum :font-size="fontSize" :text-shadow="textShadow" :value="articles[propKey]" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
