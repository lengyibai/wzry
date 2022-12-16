<template>
  <ManageMask
    class="content"
    :show="show"
    :styles="{
      flexDirection: 'column',
      alignItems: 'center',
    }"
  >
    <!-- 英雄名、代号、身高 -->
    <div class="flex-box">
      <FormInput label="id" required number v-model="form_data!.id" labelWidth="0px" />
      <FormInput label="英雄名" required v-model="form_data!.name" />
      <FormInput label="代号" required v-model="form_data!.mark" />
      <FormInput label="身高" v-model="form_data!.height" />
      <FormInput label="身份" placeholder="多个身份/分隔" v-model="form_data!.identity" />
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
        <SelectImg v-model="form_data!.headImg" title="头像" />
        <SelectImg v-model="form_data!.cover" type="height" title="封面" />
        <SelectImg v-model="form_data!.poster" type="width" title="海报" />
      </FormLabel>
    </div>

    <ReleaseConfirm
      v-model:showConfirmclose="show_ConfirmClose"
      v-model:status="status"
      size="50px"
      :finish="finish"
      @commit="EmitCommit"
      @confirm="EmitConfirmSave"
      @cancel="EmitConfirmRemove"
      @close="EmitCancelRelease"
    />
  </ManageMask>
</template>
<script setup lang="ts">
import { provide, reactive } from "vue";
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

const { attr, info } = staticData();

const { status, show, show_ConfirmClose, form_data, finish, EmitConfirmSave, EmitConfirmRemove, EmitCancelRelease } =
  viewHide<typeof heroDefault>(emit, "add_hero");

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

/* 发布 */
const EmitCommit = async () => {
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
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
