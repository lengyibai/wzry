<script setup lang="ts">
import { onMounted, ref } from "vue";

import KInput from "../../Parts/K-Input/index.vue";

import { LOCAL_HERO } from "@/api";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { _cloneDeep, _search, _shuffleArray } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 禁用 */
  disabled?: boolean;
  /** 需要搜索的列表类型 */
  type?: "HERO" | "SKIN" | "ALL";
  /** 是否支持置空 */
  empty?: boolean;
  /** 输入框描述 */
  placeholder?: string;
  /** 黑色主题 */
  black?: boolean;
}

const $props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: "ALL",
  empty: true,
  placeholder: "皮肤/英雄",
});
const $emit = defineEmits<{
  change: [v: string];
}>();

/** 输入的值 */
const modelValue = defineModel<string>({ required: true });

const { playAudio } = usePlayAudio();

/** 英雄名和皮肤列表(搜索预选) */
let search_preselection: Global.General[] = [];

/** 显示下拉列表 */
const is_unfold = ref(false);
/** 下拉列表 */
const select_list = ref<Global.General[]>([]);

/** @description 获取焦点 */
const onFocus = () => {
  is_unfold.value = true;
  select_list.value = search_preselection;
  modelValue.value && onInput();
};

/** @description 失去焦点 */
const onBlur = () => {
  is_unfold.value = false;
};

/** @description 实时搜索 */
const onInput = () => {
  select_list.value = _search(_cloneDeep(search_preselection), modelValue.value, "value");
};

/** @description 选择数据
 * @param v 选中的数据
 */
const handleSelect = (v: string) => {
  if (v === "全部") {
    modelValue.value = "";
    $emit("change", "");
  } else {
    modelValue.value = v;
    $emit("change", v);
  }
  playAudio();
};

onMounted(async () => {
  /** @description 获取英雄名、皮肤名列表 */
  const hero_name_list = (await LOCAL_HERO.getHeroNameList()).map((item) => item.value);
  const skin_name_list = (await LOCAL_HERO.getSkinNameList()).map((item) => item.value);

  let data: string[] = [];
  if ($props.type === "ALL") {
    data = [...hero_name_list, ...skin_name_list];
  } else if ($props.type === "HERO") {
    data = hero_name_list;
  } else if ($props.type === "SKIN") {
    data = skin_name_list;
  }

  search_preselection = _shuffleArray(
    [...new Set(data)].map((item) => {
      return {
        label: item,
        value: item,
      };
    }),
  );

  if ($props.empty) {
    search_preselection.unshift({
      label: "全部",
      value: "全部",
    });
  }
  select_list.value = search_preselection;
});
</script>

<template>
  <div
    class="select-hero-and-skin"
    :class="{
      black,
    }"
  >
    <!-- 选择器框 -->
    <div
      ref="selectBox"
      v-mouse-tip="{
        text: disabled ? '' : MOUSE_TIP.kb43,
        type: 'INPUT',
        disabled,
      }"
      class="select-box"
    >
      <KInput
        v-model="modelValue"
        class="k-input"
        :placeholder="modelValue || placeholder"
        :required="false"
        :disabled="disabled"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div class="arrow" :class="{ rotate: is_unfold }"></div>
    </div>

    <!-- 展开列表 -->
    <div class="select-list" :class="{ retract: !is_unfold || disabled }">
      <div
        v-for="item in select_list"
        :key="item.label"
        v-mouse-tip
        class="box"
        @mousedown="handleSelect(item.value)"
      >
        <div class="item">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
