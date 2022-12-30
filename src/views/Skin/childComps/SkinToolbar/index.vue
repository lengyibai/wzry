<script setup lang="ts">
import { ref } from "vue";
import SkinStore from "@/store/skin";

const $SkinStore = SkinStore();

const sort_text = ref("默认排序"); //价格排序
const gender = ref(0); //性别排序
const is_unfold = ref(false);
const currentIndex = ref(0);
const select_list = ref([
  { label: "默认排序", value: 0 },
  { label: "价格由低到高", value: 1 },
  { label: "价格由高到低", value: 2 },
]);

/* 显示列表 */
const handleShowList = () => {
  is_unfold.value = !is_unfold.value;
};

/* 选择后触发 */
const handleSelect = (v: { label: string; value: number }) => {
  $SkinStore.sortPrice(v.value);
  sort_text.value = v.label;
};

/* 设置性别 */
const handerSetGender = (type: number) => {
  gender.value = type;
  $SkinStore.sortGender(type);
};
</script>

<template>
  <div class="skin-toolbar">
    <!-- 按钮 -->
    <div class="select-filter" @click="handleShowList">
      <div class="title">{{ sort_text }}</div>
      <img src="https://lengyibai.gitee.io/wzry-material/image/arrow.png" alt="arrow" class="arrow" />
      <!-- 展开列表 -->
      <div class="select-list" :class="{ unfold: !is_unfold }">
        <transition-group name="select-list">
          <button
            class="box"
            :class="{
              active: currentIndex === index || sort_text === item.label,
            }"
            v-for="(item, index) in select_list"
            @mousedown="handleSelect(item)"
            @mouseenter="currentIndex = index"
            @mouseleave="currentIndex = -1"
            :key="item.label"
          >
            <div class="item">{{ item.label }}</div>
          </button>
        </transition-group>
      </div>
    </div>

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
