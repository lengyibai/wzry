<template>
  <div class="head-poster">
    <span class="text-gradient-one"><i class="star">*</i>{{ label }}：</span>

    <!--//%%%······海报头像······%%%//-->
    <SelectImg :src="imgs[0]" @select="setKeyValues" :keyword="keys[0]" />

    <!--//%%%······海报······%%%//-->
    <SelectImg v-if="show" :src="imgs[1]" type="width" @select="setKeyValues" :keyword="keys[1]" />

    <!--//%%%%%··········添加图片链接弹窗组件··········%%%%%//-->
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
    default: '啊啊啊啊',
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

const show = ref(false); //是否显示第二个选择图片
const AddLink_title = ref(''); //弹窗左上角标题
const show_AddLink = ref(false);
const AddLink_placeholder = ref('');
const AddLink_key = ref(''); //当前谁在使用弹窗(字段名)
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
  justify-content: space-evenly;
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
}
</style>
