<script setup lang="ts">
import { ref, watch } from "vue";
import _debounce from "lodash/debounce";
import _cloneDeep from "lodash/cloneDeep";

import { AudioStore } from "@/store";
import { $concise, $tool } from "@/utils";

interface Props {
  /** 左侧文字 */
  label: string;
  /** 数据 */
  data: General[];
  /** 传递id还是name */
  id?: boolean;
  /** 自适应大小 */
  autoSize?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 选择的值 */
  modelValue?: string | number | unknown[];
  /** 多选 */
  multi?: boolean;
  /** 必填 */
  required?: boolean;
  /** 输入框默认值 */
  value?: string | number | General[] | string[];
}

const $props = withDefaults(defineProps<Props>(), {
  data: () => [],
  modelValue: "",
  value: "",
});
const $emit = defineEmits<{
  "update:modelValue": [v: string | number | unknown[]];
}>();

const $audioStore = AudioStore();

const { getImgLink } = $concise;

/** 输入框的值 */
const input_value = ref("");
/** 选中的值 */
const active_value = ref("");
/** 展开 */
const is_unfold = ref(false);
/** 当前点击 */
const current_index = ref<number | null>(null);
/** 下拉列表 */
const select_list = ref<General[]>([]);
/** 选择的列表 */
const selected_list = ref<General[] | string[] | number[]>([]);

/* 实时搜索 */
const handleSearch = _debounce(() => {
  select_list.value = $tool.search(_cloneDeep($props.data), input_value.value, [
    "name",
  ]);
}, 250);

/* 获取焦点 */
const handleFocus = () => {
  is_unfold.value = true;
  input_value.value = "";
};

/* 失去焦点 */
const handleBlur = () => {
  is_unfold.value = false;
  select_list.value = $props.data;

  //如果失去焦点但输入框的值与之前选中的值不一致，则还原之前
  if (input_value.value !== active_value.value) {
    input_value.value = active_value.value;
  }
};

/* 悬浮触发 */
const handleEnterItem = (v: number) => {
  current_index.value = v;
};

/* 选择的数据 */
const handleSelect = (id: number, name: string) => {
  //是否为多选
  if ($props.multi) {
    (selected_list.value as string[]).push(name);
    selected_list.value = [...new Set(selected_list.value as string[])];
    $emit("update:modelValue", selected_list.value);
    input_value.value = "请选择";
  } else {
    //是否要求传递id
    $emit("update:modelValue", $props.id ? Number(id) : name);
    select_list.value = $props.data;
    active_value.value = name;
    input_value.value = name;
  }

  $audioStore.play();
};

/* 删除选择的数据 */
const handleDel = (index: number) => {
  selected_list.value.splice(index, 1);
  $emit("update:modelValue", selected_list.value);
};

/* 在created会赋空值，只能通过侦听器 */
watch(
  () => $props.data,
  (v) => (select_list.value = v),
  { immediate: true },
);

/* 设置默认填充 */
watch(
  () => $props.value,
  (v) => {
    //如果为多选则不做处理
    if ($props.multi && typeof v !== "string" && typeof v !== "number") {
      selected_list.value = v;
    } else if (typeof v !== "object") {
      if (v) {
        //如果为数字id类型，则查找数据赋name
        if (typeof v === "number") {
          input_value.value =
            $props.data.find((item) => item.id === v)?.name || "";
        } else {
          input_value.value = v;
        }
      }
    }
  },
  { immediate: true },
);

/* 实时监听输入框 */
watch(
  () => input_value.value,
  (v) => {
    //如果为多选则不做处理
    if (!$props.multi) {
      if (v) active_value.value = v;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="form-select" :class="{ disabled: disabled }">
    <FormLabel :label="label" :required="required">
      <div class="select" :style="{ width: autoSize ? '100%' : '15.625rem' }">
        <!-- 选择器框 -->
        <div ref="selectBox" class="select-box">
          <K-input
            v-model="input_value"
            :required:="required"
            :placeholder="active_value || '搜索'"
            line
            width="15.625rem"
            color="var(--theme-font-color-four)"
            @input="handleSearch"
            @focus="handleFocus"
            @blur="handleBlur"
          />
          <img
            class="arrow"
            :class="{ rotate: is_unfold }"
            :src="getImgLink('arrow')"
            alt=""
          />
        </div>

        <!-- 展开列表 -->
        <div class="select-list" :class="{ unfold: !is_unfold }">
          <transition-group name="select-list">
            <button
              v-for="(item, index) in select_list"
              :key="item.id"
              class="box"
              :class="{
                active:
                  current_index === index ||
                  modelValue === item.name ||
                  modelValue === item.id,
              }"
              @mousedown="handleSelect(item.id, item.name)"
              @mouseenter="handleEnterItem(index)"
              @mouseleave="current_index = null"
            >
              <div class="item">{{ item.name }}</div>
            </button>
          </transition-group>
        </div>
      </div>
    </FormLabel>
  </div>

  <!-- 选择的列表 -->
  <div v-if="multi" class="selected-list">
    <transition-group name="fade-a">
      <div v-for="(item, index) in selected_list" :key="index" class="selected">
        <span class="name">{{ item }}</span>
        <button class="del" @click="handleDel(index)">×</button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
