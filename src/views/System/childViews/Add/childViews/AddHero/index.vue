<template>
  <div class="hero view-add">
    <transition name="fade">
      <div class="content" v-if="show">
        <!-- 英雄名、代号、身高 -->
        <div class="flex-box">
          <FormInput label="id" required number v-model="form_data!.id" />
          <FormInput label="英雄名" required v-model="form_data!.name" />
          <FormInput label="代号" required v-model="form_data!.mark" />
          <FormInput label="身高" v-model="form_data!.height" />
          <FormInput label="身份" v-model="form_data!.identity" />
        </div>

        <!-- 选择器相关 -->
        <div class="flex-box">
          <FormSelect
            v-for="(v, k) in info"
            :key="k"
            :label="v[0]"
            :data="type_list[v[1]]"
            v-model="form_data![v[2]]"
            :value="form_data![v[2]]"
          />
        </div>

        <!-- 职业 -->
        <FormSelect
          :data="type_list.professionType"
          v-model="form_data!.profession"
          :value="form_data!.profession"
          label="职业"
          multi
        />

        <!-- 特长 -->
        <FormSelect
          :data="type_list.specialtyType"
          v-model="form_data!.specialty"
          :value="form_data!.specialty"
          label="特长"
          multi
        />

        <!-- 属性相关 -->
        <div class="flex-box">
          <FormRange
            :label="v"
            labelWidth="200px"
            :text="form_data![k] + '%'"
            v-model="form_data![k]"
            v-for="(v, k) in attr"
            :key="k"
          />
        </div>

        <!-- 设置头像&海报 -->
        <div class="flex-box">
          <FormLabel labelWidth="290px" label="头像&封面&&海报">
            <SelectImg :src="form_data!.headImg" @select="setKey('headImg')" keyword="头像" />
            <SelectImg class="wide" :src="form_data!.cover" type="height" @select="setKey('cover')" keyword="封面" />
            <SelectImg class="wide" :src="form_data!.poster" type="width" @select="setKey('poster')" keyword="海报" />
          </FormLabel>
        </div>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="lib-commit-btn" size="50px" @commit="commit" :finish="finish" v-model="status" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="cancel" title="取消" />

    <!-- 添加图片链接弹窗组件 -->
    <AddLink
      v-model="show_AddLink"
      :title="AddLink_title"
      :placeholder="AddLink_placeholder"
      @get-link="getLink"
      :keyword="AddLink_key"
    />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup lang="ts">
import { provide, reactive, ref } from "vue";
import {
  // addHero,
  // addHeroList,
  getCampType,
  getLocationType,
  getPeriodType,
  getProfessionType,
  getSpecialtyType,
} from "@/api/main/games/hero";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import viewHide from "../../../../hooks/useViewHide";
import staticData from "./hooks";
import switchStore from "@/store/globalSwitch";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const { show, finish, status, form_data, show_ConfirmClose, cancel, close } = viewHide<typeof heroDefault>(
  emit,
  "add_hero"
);
const { AddLink_set_desc, attr, info } = staticData();

/* 弹窗相关 */
const show_AddLink = ref(false); //显示添加链接弹窗
const AddLink_key = ref(""); //当前谁在使用弹窗(字段名)
const AddLink_title = ref(""); //弹窗左上角标题
const AddLink_placeholder = ref(""); //弹窗输入框描述

/* 判断是否存在缓存 */
form_data.value ??= $deepCopy(heroDefault);

/* 类型列表 */
const type_list: Record<string, any[]> = reactive({
  campType: [],
  locationType: [],
  periodType: [],
  professionType: [],
  specialtyType: [],
});

setTimeout(async () => {
  $switchStore.$loading.show("正在加载阵营类型表2/7");
  type_list.campType = await getCampType();
  $switchStore.$loading.show("正在加载定位类型表4/7");
  type_list.locationType = await getLocationType();
  $switchStore.$loading.show("正在加载时期类型表5/7");
  type_list.periodType = await getPeriodType();
  $switchStore.$loading.show("正在加载职业类型表6/7");
  type_list.professionType = await getProfessionType();
  $switchStore.$loading.show("正在加载特长类型表7/7");
  type_list.specialtyType = await getSpecialtyType();
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 获取链接 */
const getLink = (link: string, key: string) => {
  form_data.value![key] = link;
};

/* 设置头像及名字 */
const setKey = (key: string) => {
  show_AddLink.value = true;
  AddLink_title.value = `设置${AddLink_set_desc[key]}`;
  AddLink_placeholder.value = `请输入${AddLink_set_desc[key]}`;
  AddLink_key.value = key;
};

/* 发布 */
const commit = async () => {
  const { id, mark, name, cover, headImg, poster } = form_data.value!;
  if (id && mark && name && cover && headImg && poster) {
    // await addHero(form_data.value);
    // await addHeroList({ id: form_data.value!.id, name: form_data.value!.name });
    finish.value = true;
    setTimeout(() => {
      close();
      $switchStore.$tip("发布成功", "info");
    }, 500);
  } else {
    $switchStore.$tip("请完整填写", "error");
    status.value = 0;
  }
};

provide("hero_data", form_data.value);
provide("set_key", setKey);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
