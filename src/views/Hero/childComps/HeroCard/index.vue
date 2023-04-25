<script setup lang="ts">
import { ref, computed } from "vue";

import { Store } from "@/config";

interface Props {
  data: Hero.Data; //英雄数据
}
defineProps<Props>();

interface Emits {
  (e: "view"): void;
}
const emit = defineEmits<Emits>();

const $heroStore = Store.hero();

const show = ref(false); //显示查看详情选项
const finish = ref(false); //头像是否加载完成

//用于身高和皮肤数量排序显示相应数字
const num_type = computed(() => $heroStore.misc_sort);

//显示右上角数字
const show_num = computed(() => ["身高", "皮肤数量", "关系数量"].includes(num_type.value));
const num = (data: Hero.Data) =>
  num_type.value === "身高"
    ? data.height + "cm"
    : num_type.value === "皮肤数量"
    ? (data.skins?.length || 0) + "款"
    : num_type.value === "关系数量"
    ? (data.relationships?.length || 0) + "位"
    : "";

/* 查看详情 */
const handleViewClick = () => {
  emit("view");
};
</script>

<template>
  <div
    v-maskGradient
    v-sweepLight
    class="hero-card cursor-pointer"
    :class="{ hide: show }"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <!-- 编号 -->
    <span class="id">No.{{ data.id }}</span>

    <!-- 身高、皮肤数量/ -->
    <span v-if="show_num" class="num">{{ num(data) }}</span>

    <!-- 悬浮蒙版 -->
    <transition name="fade">
      <div v-if="show" class="select-mask">
        <img
          :src="finish ? data.headImg : 'https://lengyibai.gitee.io/wzry-material/image/unknown.png'"
          class="head"
          @click="handleViewClick"
          @load="finish = true"
          @dragstart.prevent
        />
        <button v-textHoverColor class="view" @click="handleViewClick">点击此处</button>
      </div>
    </transition>

    <!-- 背景图 -->
    <img class="bg" :src="data.cover" @dragstart.prevent />

    <!-- 底部名字、代号 -->
    <div class="bottom">
      <div class="name" v-html="data.name"></div>
      <div class="mark">{{ data.mark }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
