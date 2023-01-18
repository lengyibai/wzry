<template>
  <div class="FormSelect" :class="{ disabled: disabled }">
    <!-- 左侧描述 -->
    <div v-if="label" class="label">
      <span><i v-if="required" class="star">*</i>{{ label }}：</span>
    </div>

    <div class="select" :style="{ width: autoSize ? '100%' : '250px' }">
      <!-- 选择器框 -->
      <div ref="selectBox" class="select-box">
        <K-input
          v-model="input_value"
          :placeholder="active_value || '搜索'"
          line
          width="250px"
          color="var(--theme-color-five)"
          @input="search"
          @focus="focus"
          @blur="blur"
        />
        <img
          class="arrow"
          :class="{ rotate: is_unfold }"
          :src="IMGBED + '/image/arrow.png'"
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
            @mousedown="select(item.id, item.name)"
            @mouseenter="handleEnterItem(index)"
            @mouseleave="current_index = null"
          >
            <div class="item">{{ item.name }}</div>
          </button>
        </transition-group>
      </div>
    </div>
  </div>

  <!-- 选择的列表 -->
  <div v-if="multi" class="selected-list">
    <transition-group name="fade-a">
      <div v-for="(item, index) in selected_list" :key="item" class="selected">
        <span class="name">{{ item }}</span>
        <button class="del" @click="delsSelected(index)">×</button>
      </div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import switchStore from "@/store/switch";
import { $search, $debounce } from "@/utils";

interface Props {
  id?: boolean; //传递id还是name
  data: any[]; //数据
  autoSize?: boolean; //自适应大小
  modelValue?: string | number | any[]; //选择的值
  disabled?: boolean; //是否禁用
  required?: boolean; //是否必填
  label?: string; //左侧文字
  value?: string | number | any[]; //输入框默认值
  multi?: boolean; //是否支持多选
}
const props = withDefaults(defineProps<Props>(), {
  id: false,
  data: () => [],
  autoSize: false,
  modelValue: "",
  disabled: false,
  required: false,
  label: "",
  value: "",
});

interface Emits {
  (e: "update:modelValue", v: string | number | any[]): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const input_value = ref<any>(""); //输入框的值
const active_value = ref<any>(""); //选中的值
const no_legal = ref(false); //是否合法
const is_unfold = ref(false); //是否展开
const current_index = ref<number | null>(null); //当前点击
const select_list = ref<any[]>([]); //下拉列表
const selected_list = ref<any[]>([]); //选择的列表

/* 实时搜索 */
const search = () => {
  $debounce(() => {
    select_list.value = $search(props.data, input_value.value, ["name"]);
  }, 100);
};

/* 获取焦点 */
const focus = () => {
  is_unfold.value = true;
  input_value.value = "";
};

/* 失去焦点 */
const blur = () => {
  is_unfold.value = false;
  no_legal.value = props.required && active_value.value === "";
  select_list.value = props.data;
  // 如果失去焦点但输入框的值与之前选中的值不一致，则还原之前
  if (input_value.value !== active_value.value) {
    input_value.value = active_value.value;
  }
};

/* 悬浮触发 */
const handleEnterItem = (v: number) => {
  current_index.value = v;
  $switchStore.$clickAudio("n4r4");
};

/* 选择的数据 */
const select = (id: number, name: string) => {
  if (props.multi) {
    selected_list.value.push(name);
    selected_list.value = [...new Set(selected_list.value)];
    emit("update:modelValue", selected_list.value);

    setTimeout(() => {
      input_value.value = "请选择";
    });
  } else {
    emit("update:modelValue", props.id ? Number(id) : name);
    select_list.value = props.data;
    active_value.value = name;
    input_value.value = name;
  }
  $switchStore.$clickAudio();
};

/* 删除选择的数据 */
const delsSelected = (index: number) => {
  selected_list.value.splice(index, 1);
  emit("update:modelValue", selected_list.value);
};

/* 在created会赋空值，只能通过侦听器 */
watch(
  () => props.data,
  (v) => {
    select_list.value = v;
  },
  { immediate: true }
);

/* 设置默认填充 */
watch(
  () => props.value,
  (v) => {
    if (props.multi) {
      selected_list.value = v as any[];
    } else {
      if (v) {
        if (typeof v === "number") {
          input_value.value = props.data.find((item) => {
            return item.id === v;
          }).name;
        } else {
          input_value.value = v;
        }
      } else {
        input_value.value = v;
      }
    }
  },
  { immediate: true }
);
watch(
  () => input_value.value,
  (v) => {
    if (!props.multi) {
      if (v) {
        if (typeof v === "number") {
          input_value.value = props.data.find((item) => {
            return item.id === v;
          }).name;
        } else {
          input_value.value = v;
          active_value.value = v;
        }
      } else {
        input_value.value = v;
      }
    }
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
