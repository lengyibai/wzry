<template>
  <div class="head-poster">
    <span class="text-gradient-one"><i class="star">*</i>{{ label }}：</span>

    <!-- 方图 -->
    <SelectImg :src="imgs[0]" @select="setKeyValues" :keyword="keys[0]" />

    <!-- 宽图 -->
    <SelectImg class="wide" v-if="show" :src="imgs[1]" type="width" @select="setKeyValues" :keyword="keys[1]" />

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
<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '标题',
  },
  keys: {
    type: Array,
    default() {
      return [];
    },
  },
  values: {
    type: Object,
    default() {
      return {};
    },
  },
  imgs: {
    type: Array,
    default() {
      return [];
    },
  },
  setKeyValues: {
    type: Function,
    default() {},
  },
  getLink: {
    type: Function,
    default() {},
  },
});

const AddLink_key = ref(''); //当前谁在使用弹窗(字段名)
const AddLink_placeholder = ref(''); //弹窗输入框描述
const AddLink_title = ref(''); //弹窗左上角标题
const show = ref(false); //是否显示第二个选择图片
const show_AddLink = ref(false); //是否显示弹窗
show.value = props.imgs.length > 1;

/* 设置头像及名字 */
const setKeyValues = (key) => {
  show_AddLink.value = true;
  AddLink_title.value = `设置${props.values[key]}`;
  AddLink_placeholder.value = `请输入${props.values[key]}`;
  AddLink_key.value = key;
};
</script>
<style scoped lang="less">
.head-poster {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
  span {
    position: relative;
    font-size: 30px;
    .star {
      position: absolute;
      color: var(--theme-color-seven);
      left: 0;
      font-size: 20px;
      transform: translateX(-150%);
    }
  }
  .wide{
    margin-left: 25px;
  }
}
</style>
