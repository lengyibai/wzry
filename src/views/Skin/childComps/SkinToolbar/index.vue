<script setup lang="ts">
import { ref } from "vue";
import SkinStore from "@/store/skin";

const $SkinStore = SkinStore();

const select_list = [
  { label: "默认排序", value: 0 },
  { label: "价格由低到高", value: 1 },
  { label: "价格由高到低", value: 2 },
];

const gender = ref(0); //性别排序
const search_value = ref(""); //搜索值

/* 选择后触发 */
const EmitSelectFilter = (v: number) => {
  $SkinStore.sortPrice(v);
};

/* 设置性别 */
const handerSetGender = (type: number) => {
  gender.value = type;
  $SkinStore.sortGender(type);
};

/** @description: 搜索皮肤 */
const handSearch = () => {
  $SkinStore.searchSkin(search_value.value);
};
</script>

<template>
  <div class="skin-toolbar">
    <!-- 筛选按钮 -->
    <FilterTool :data="select_list" @select="EmitSelectFilter" />

    <!-- 只看性别 -->
    <div class="gender">
      <span>只看：</span>
      <i
        class="iconfont wzry-nan cursor-pointer"
        :class="{ 'nan-active': gender === 1 }"
        @click="handerSetGender(1)"
        title="男"
      ></i>
      <i
        class="iconfont wzry-nv cursor-pointer"
        :class="{ 'nv-active': gender === 2 }"
        @click="handerSetGender(2)"
        title="女"
      ></i>
      <i
        class="iconfont wzry-xingbie cursor-pointer"
        :class="{ 'all-active': gender === 0 }"
        @click="handerSetGender(0)"
        title="全部"
      ></i>
    </div>

    <!-- 搜索 -->
    <input
      class="search"
      placeholder="皮肤/英雄名"
      type="text"
      @input="handSearch"
      v-model="search_value"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
