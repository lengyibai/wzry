<script setup lang="ts">
import { ref } from "vue";
import { getCampType } from "@/api/main/games/hero";
import heroStore from "@/store/hero";

const $heroStore = heroStore();

const gender = ref(0); //性别排序
const select_list = ref([{ label: "全部阵营", value: "全部阵营" }]);

// 获取阵营列表
getCampType().then((res) => {
  res.forEach((item) => {
    select_list.value.push({
      label: item.name,
      value: item.name,
    });
  });
});

/* 选择筛选 */
const EmitSelectFilter = (v: string) => {
  $heroStore.sortCamp(v);
};

/* 设置性别 */
const handerSetGender = (type: number) => {
  gender.value = type;
  $heroStore.sortGender(type);
};
</script>

<template>
  <div class="hero-toolbar">
    <!-- 筛选按钮 -->
    <FilterTool :data="select_list" @select="EmitSelectFilter" listHeight="500px" />

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
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
