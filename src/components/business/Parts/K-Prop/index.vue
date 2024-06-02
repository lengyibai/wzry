<script setup lang="ts">
import { ref } from "vue";

import { GAME_PROP } from "@/config";
import { _getPropLink } from "@/utils/concise";
import { vMouseTip } from "@/directives";

interface Props {
  /** 道具键名 */
  propKey: Game.PropKey;
  /** 道具数量 */
  num: number | string;
}
defineProps<Props>();

const propRef = ref<HTMLElement>();

defineExpose({
  _el: propRef,
});
</script>

<template>
  <div
    ref="propRef"
    v-mouse-tip="{
      type: 'TIP',
      text: GAME_PROP.DESC[propKey],
    }"
    class="k-prop"
  >
    <div class="icon-box">
      <img :src="_getPropLink(GAME_PROP.ICON[propKey])" alt="" class="icon" />
      <div class="num" :data-text="num">{{ num }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
