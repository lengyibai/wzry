<template>
  <div class="FormSelect" :class="{ disabled: disabled }">
    <!-- 左侧描述 -->
    <div class="label">
      <span><i class="star" v-if="required">*</i>{{ label }}：</span>
    </div>

    <div class="select" :style="{ width: autoSize ? '100%' : '250px' }">
      <!-- 选择器框 -->
      <div class="select-box" ref="selectBox">
        <input
          type="text"
          ref="input"
          @input="search"
          @focus="focus"
          @blur="blur"
          v-model="input_value"
          :placeholder="active_value || '搜索'"
        />

        <!-- 获取焦点拉长线条 -->
        <transition name="border">
          <div class="focus" v-show="is_unfold"></div>
        </transition>

        <!-- 输入不合法拉长线条 -->
        <transition name="border">
          <div class="border" v-show="no_legal"></div>
        </transition>

        <!-- 输入不合法提示 -->
        <transition name="tip">
          <div class="tip" v-if="no_legal" v-typewriter="'必选项'"></div>
        </transition>
        <img
          class="arrow"
          :class="{ rotate: is_unfold }"
          src="https://lengyibai.gitee.io/wzry-material/image/arrow.png"
          alt=""
        />
      </div>

      <!-- 展开列表 -->
      <div class="select-list" :class="{ unfold: !is_unfold }">
        <transition-group name="select-list">
          <button
            class="box"
            :class="{
              active: currentIndex === index || modelValue === item.name || modelValue === item.id,
            }"
            v-for="(item, index) in select_list"
            @mousedown="select(item.id, item.name)"
            @mouseenter="currentIndex = index"
            @mouseleave="currentIndex = null"
            :key="item.id"
          >
            <div class="item">{{ item.name }}</div>
          </button>
        </transition-group>
      </div>
    </div>
  </div>

  <!-- 选择的列表 -->
  <div class="selected-list" v-if="multi">
    <transition-group name="fade-a">
      <div class="selected" v-for="(item, index) in selected_list" :key="item">
        <span class="name">{{ item }}</span>
        <button class="del" @click="delsSelected(index)">×</button>
      </div>
    </transition-group>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { $search, $debounce } from "@/utils";

interface Props {
  id?: boolean; //传递id还是name
  data: any[]; //数据
  autoSize?: boolean; //自适应大小
  modelValue?: string | number | any[]; //选择的值
  disabled?: boolean; //是否禁用
  required?: boolean; //是否必填
  label?: string; //左侧文字
  value?: string | any[]; //输入框默认值
  multi?: boolean; //是否支持多选
}

const props = withDefaults(defineProps<Props>(), {
  id: false,
  data: () => [],
  autoSize: false,
  modelValue: "",
  disabled: false,
  required: false,
  label: "标题",
  value: "",
});

interface Emits {
  (e: "update:modelValue", v: string | number | any[]): void;
  (e: "change", v: string | number | any[]): void;
}
const emit = defineEmits<Emits>();

const input_value = ref<any>(""); //输入框的值
const active_value = ref<any>(""); //选中的值
const no_legal = ref(false); //是否合法
const is_unfold = ref(false); //是否展开
const currentIndex = ref<number | null>(null); //当前点击
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

/* 选择的数据 */
const select = (id: number, name: string) => {
  if (props.multi) {
    selected_list.value.push(name);
    selected_list.value = [...new Set(selected_list.value)];
    emit("update:modelValue", selected_list.value);

    emit("change", selected_list.value);

    setTimeout(() => {
      input_value.value = "请选择";
    });
  } else {
    emit("update:modelValue", props.id ? Number(id) : name);
    emit("change", props.id ? Number(id) : name);
    select_list.value = props.data;
    active_value.value = name;
    input_value.value = name;
  }
};

/* 删除选择的数据 */
const delsSelected = (index: number) => {
  selected_list.value.splice(index, 1);
  emit("update:modelValue", selected_list.value);
  emit("change", selected_list.value);
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
      active_value.value = v;
      input_value.value = v;
    }
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
