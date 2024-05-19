<script setup lang="ts">
import { ref, computed } from "vue";

import { HeroStore, KnapsackStore } from "@/store";
import { vBlurLoad, vMaskGradient, vMouseTip, vSweepLight, vTextHoverColor } from "@/directives";
import { $mouseTipText, MOUSE_TIP } from "@/config";
import { useHaveHeroSkin } from "@/hooks";
import { KHeroExp } from "@/components/business";
import { _getMiscLink } from "@/utils/concise";

const $knapsackStore = KnapsackStore();

interface Props {
  /** 英雄数据 */
  data: Game.Hero.Data;
}

defineProps<Props>();

const $emit = defineEmits<{
  view: [hero_id: number];
}>();

const $heroStore = HeroStore();

/** 头像是否加载完成 */
const finish = ref(false);

/** 用于身高和皮肤数量排序显示相应数字 */
const num_type = computed(() => $heroStore.misc_sort);
/** 显示右上角数字 */
const show_num = computed(() => ["身高", "皮肤数量", "关系数量"].includes(num_type.value));

/** 单位格式化 */
const num = (data: Game.Hero.Data) => {
  const numType = num_type.value;

  const obj: Record<string, string> = {
    身高: data.height + "cm",
    皮肤数量: (data.skinCount || 0) + "款",
    关系数量: (data.relationCount || 0) + "位",
  };

  return obj[numType] || "";
};

/** @description 查看详情
 * @param hero_id 英雄id
 */
const handleViewClick = (hero_id: number) => {
  if (useHaveHeroSkin(hero_id)) {
    $emit("view", hero_id);
  }
};
</script>

<template>
  <div
    v-mask-gradient="{
      color: '#000',
    }"
    v-sweep-light="{
      enable: !!$knapsackStore.hero_list[data.id],
    }"
    v-mouse-tip="{
      disabled: !$knapsackStore.hero_list[data.id],
      text: $knapsackStore.hero_list[data.id]
        ? MOUSE_TIP.kr17
        : $mouseTipText('a20t', { v: '英雄' }),
    }"
    class="hero-card"
  >
    <!-- 编号 -->
    <span class="id">No.{{ data.id }}</span>

    <!-- 身高、皮肤数量/ -->
    <span v-if="show_num" class="num">{{ num(data) }}</span>

    <!-- 悬浮蒙版 -->
    <div class="select-mask">
      <img
        :src="finish ? data.avatar : _getMiscLink('unknown')"
        class="head"
        @click="handleViewClick(data.id)"
        @load="finish = true"
      />
      <button v-text-hover-color class="view" @click="handleViewClick(data.id)">点击此处</button>
    </div>

    <!-- 背景图 -->
    <div
      class="bg-box"
      :class="{
        have: $knapsackStore.hero_list[data.id],
      }"
    >
      <img
        v-blur-load="{
          img: data.cover,
        }"
        class="bg"
        :src="data.coverBlur"
      />
    </div>

    <!-- 底部名字、熟练度 -->
    <div class="bottom">
      <div class="name" v-html="data.name"></div>
      <KHeroExp class="hero-exp" :exp="$knapsackStore.hero_list[data.id]?.exp" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
