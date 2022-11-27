<template>
  <div class="equip-detail" :style="{ opacity: show ? 1 : 0 }">
    <div class="name">{{ equip.name }}</div>
    <div class="info">
      <div class="effect" :class="abbreviations[item.name]" v-for="(item, index) in equip.effect" :key="index">
        +{{ item.num }} {{ item.name }}
      </div>
    </div>
    <div class="details" v-if="equip?.name">
      <div class="motivation" v-for="(item, index) in equip.motivation" :key="index">
        <div class="title">{{ item.type }}-{{ item.name }}</div>
        <div class="desc" v-html="item.desc"></div>
        <div class="time lq" v-if="item.time">{{ item.time }}秒</div>
      </div>
    </div>
    <div class="note" v-if="equip.note" v-html="equip.note"></div>
  </div>
</template>
<script setup lang="ts">
import { equipDefault } from "@/defaultValue/defaults";

interface Props {
  equip: typeof equipDefault;
  show: boolean;
}

withDefaults(defineProps<Props>(), {
  equip: () => equipDefault,
  show: false,
});

const abbreviations: Record<string, string> = {
  最大生命: "zdsm",
  每5秒回血: "hx",
  移速: "ys",
  攻击速度: "gjsd",
  冷却缩减: "lqsj",
  物理吸血: "wlxx",
  物理攻击: "wlgj",
  暴击率: "bjl",
  物理防御: "wlfy",
  法术吸血: "fsxx",
  最大法力: "zdfl",
  每5秒回蓝: "hl",
  法术防御: "fsfy",
  法术攻击: "fsgj",
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
