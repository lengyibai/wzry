<script setup lang="ts">
import { ref, computed } from "vue";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";

interface Props {
  data: typeof heroDefault; //英雄数据
}
interface Emits {
  (e: "view"): void;
}

withDefaults(defineProps<Props>(), {
  data: () => heroDefault,
});

const emit = defineEmits<Emits>();

const $heroStore = heroStore();

const show = ref(false); //显示查看详情选项
const lineActive = ref(false); //悬浮文字底部线条

//用于身高和皮肤数量排序显示相应数字
const num_type = computed(() => {
  return $heroStore.misc_sort;
});
//是否显示右上角数字
const show_num = computed(() => ["身高", "皮肤数量"].includes(num_type.value));
const num = (data: Hero.Data) =>
  num_type.value === "身高"
    ? data.height + "cm"
    : num_type.value === "皮肤数量"
    ? data.skins!.length + "款"
    : "";

/* 查看详情 */
const handleViewClick = () => {
  emit("view");
};
</script>

<template>
  <div
    class="hero-card cursor-pointer"
    :class="{ hide: show }"
    v-maskGradient
    v-sweepLight
    @mousedown="show = true"
    @mouseleave="show = false"
  >
    <span class="id">No.{{ data.id }}</span>
    <span class="num" v-if="show_num">{{ num(data) }}</span>
    <transition name="fade">
      <div class="select-mask" v-if="show">
        <img :src="data.headImg" class="head" />
        <button
          class="view"
          @click="handleViewClick"
          @mouseenter="lineActive = true"
          @mouseleave="lineActive = false"
          v-textHoverColor
        >
          查看详情
        </button>
        <div
          class="line"
          :class="{ 'line-active': lineActive }"
          ref="line"
        ></div>
      </div>
    </transition>

    <img class="bg" :src="data.cover" />
    <div class="bottom">
      <div class="name">{{ data.name }}</div>
      <div class="mark">{{ data.mark }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
