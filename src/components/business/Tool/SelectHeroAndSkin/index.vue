<script setup lang="ts">
import { ref } from "vue";
import _cloneDeep from "lodash/cloneDeep";
import { watch } from "vue";

import { KInput } from "../..";

import { LOCAL_HERO } from "@/api";
import { $tool } from "@/utils";
import { AudioStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

interface Props {
  /** 禁用 */
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
});

const $emit = defineEmits<{
  change: [v: string];
}>();

/** 输入的值 */
const modelValue = defineModel<string>({ required: true });

const $audioStore = AudioStore();

/** 英雄名和皮肤列表(搜索预选) */
let search_preselection: Global.General[] = [];

/** 输入框的值 */
const input_value = ref("");
/** 显示下拉列表 */
const is_unfold = ref(false);
/** 下拉列表 */
const select_list = ref<Global.General[]>([]);

/* 获取英雄名、皮肤名列表 */
const hero_name_list = LOCAL_HERO.getHeroNameList().map((item) => item.value);
const skin_name_list = LOCAL_HERO.getSkinNameList().map((item) => item.value);
search_preselection = $tool.shuffleArray(
  [...new Set([...hero_name_list, ...skin_name_list])].map((item) => {
    return {
      label: item,
      value: item,
    };
  }),
);
search_preselection.unshift({
  label: "全部",
  value: "全部",
});
select_list.value = search_preselection;

/* 获取焦点 */
const onFocus = () => {
  is_unfold.value = true;
  select_list.value = search_preselection;
  modelValue.value && (input_value.value = "");
};

/* 失去焦点 */
const onBlur = () => {
  is_unfold.value = false;

  //如果失去焦点但输入框的值与之前选中的值不一致，则还原之前
  if (modelValue.value && input_value.value !== modelValue.value) {
    input_value.value = modelValue.value;
  }
};

/* 实时搜索 */
const onInput = () => {
  select_list.value = $tool.search(_cloneDeep(search_preselection), input_value.value, "value");
};

/* 选择数据 */
const handleSelect = async (v: string) => {
  if (v === "全部") {
    modelValue.value = "";
    input_value.value = "";
    $emit("change", "");
  } else {
    modelValue.value = v;
    input_value.value = v;
    $emit("change", v);
  }
  $audioStore.play();
};

watch(modelValue, () => {
  input_value.value = modelValue.value;
});
</script>

<template>
  <div class="select-hero-and-skin">
    <!-- 选择器框 -->
    <div
      ref="selectBox"
      v-mouse-tip="{
        text: MOUSE_TIP.kb43,
        type: 'INPUT',
      }"
      class="select-box"
    >
      <KInput
        v-model="input_value"
        class="k-input"
        :placeholder="modelValue || '皮肤/英雄'"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div class="arrow" :class="{ rotate: is_unfold }"></div>
    </div>

    <!-- 展开列表 -->
    <div class="select-list" :class="{ retract: !is_unfold }">
      <div
        v-for="item in select_list"
        :key="item.label"
        class="box"
        @click="handleSelect(item.value)"
      >
        <div class="item">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
