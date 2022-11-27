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

        <!-- 特长 -->
        <FormSelect
          :data="type_list.specialtyType"
          v-model="specialty_type"
          :value="specialty_type"
          label="特长"
          @change="selectSpecialtyType"
        />
        <div class="type-list">
          <transition-group name="delspecialty-type">
            <div class="specialty-type" v-for="(item, index) in form_data!.specialty" :key="item">
              <span class="name">{{ item }}</span>
              <span class="del cursor-pointer" @click="delspecialtyType(index)">×</span>
            </div>
          </transition-group>
        </div>

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

        <!-- 设置封面 -->
        <!-- <AddHeroCover /> -->

        <!-- 设置头像&海报 -->
        <div class="flex-box">
          <FormImg
            labelWidth="240px"
            label="皮肤头像&海报"
            :getLink="getLink"
            :imgs="[form_data!.headImg, form_data!.poster]"
            :keys="['headImg', 'poster']"
            :values="{ headImg: '头像', poster: '海报' }"
          />
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
  addHero,
  addHeroList,
  getCampType,
  getEnergyType,
  getLocationType,
  getPeriodType,
  getProfessionType,
  getSpecialtyType,
} from "@/api/main/game/index";
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
  energyType: [],
  locationType: [],
  periodType: [],
  professionType: [],
  specialtyType: [],
});

setTimeout(async () => {
  $switchStore.$loading.show("正在加载阵营类型表2/7");
  type_list.campType = (await getCampType()).data;
  $switchStore.$loading.show("正在加载能量类型表3/7");
  type_list.energyType = (await getEnergyType()).data;
  $switchStore.$loading.show("正在加载定位类型表4/7");
  type_list.locationType = (await getLocationType()).data;
  $switchStore.$loading.show("正在加载时期类型表5/7");
  type_list.periodType = (await getPeriodType()).data;
  $switchStore.$loading.show("正在加载职业类型表6/7");
  type_list.professionType = (await getProfessionType()).data;
  $switchStore.$loading.show("正在加载特长类型表7/7");
  type_list.specialtyType = (await getSpecialtyType()).data;
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 选择特长后触发 */
const specialty_type = ref("");
const selectSpecialtyType: (v: string | number) => void = (v) => {
  setTimeout(() => {
    form_data.value!.specialty.push(v as string);
    form_data.value!.specialty = [...new Set(form_data.value!.specialty)];
    specialty_type.value = "请选择";
  });
};

/* 删除特长 */
const delspecialtyType = (index: number) => {
  form_data.value!.specialty.splice(index, 1);
};

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

/* 设置属性值 */
const setValue = (k: string, v: Hero.Offset) => {
  form_data.value![k] = v;
};

/* 发布 */
const commit = async () => {
  const { id, mark, name, cover, headImg, poster } = form_data.value!;
  if (id && mark && name && cover && headImg && poster) {
    await addHero(form_data.value);
    await addHeroList({ id: form_data.value!.id, name: form_data.value!.name });
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
provide("set_value", setValue);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
