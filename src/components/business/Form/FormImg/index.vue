<template>
  <div class="head-poster" :class="{ center: center }">
    <div class="label" :style="{ width: labelWidth }">
      <span class="text-gradient-one"><i class="star">*</i>{{ label }}： </span>
    </div>

    <!-- 方图 -->
    <SelectImg :src="imgs[0]" @select="setKeyValues" :keyword="keys[0]" />

    <!-- 宽图 -->
    <SelectImg
      class="wide"
      v-if="imgs.length > 1"
      :src="imgs[1]"
      type="width"
      @select="setKeyValues"
      :keyword="keys[1]"
    />

    <!--添加图片链接弹窗组件-->
    <AddLink
      v-model="show_AddLink"
      :keyword="AddLink_key"
      :title="AddLink_title"
      :placeholder="AddLink_placeholder"
      @get-link="getLink"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

interface Props {
  label: string; //标题文字
  labelWidth?: string; //标题宽度
  center?: boolean; //是否居中
  keys?: string[]; //图片键名
  values?: {
    [propName: string]: any; //图片键值
  };
  imgs?: string[]; //展示的图片
  getLink: (link: string, key: string) => void; //获取图片链接
}

const props = withDefaults(defineProps<Props>(), {
  label: "标题",
  labelWidth: "150px",
  center: false,
  keys: () => [],
  values: () => {
    return {};
  },
  imgs: () => [],
  getLink: () => {},
});

const AddLink_key = ref(""); //当前谁在使用弹窗(字段名)
const AddLink_placeholder = ref(""); //弹窗输入框描述
const AddLink_title = ref(""); //弹窗左上角标题
const show_AddLink = ref(false); //是否显示弹窗

/* 设置头像及名字 */
const setKeyValues = (key: string) => {
  show_AddLink.value = true;
  AddLink_title.value = `设置${props.values[key]}`;
  AddLink_placeholder.value = `请输入${props.values[key]}`;
  AddLink_key.value = key;
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
