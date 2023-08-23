<script setup lang="ts">
import { reactive } from "vue";

import viewHide from "../../../../hooks/useViewHide";

import { heroDefault } from "@/default";
import { Store } from "@/store";
import { Util } from "@/utils";
import { API_HERO } from "@/api";
import { $loading, $message } from "@/config";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $heroStore = Store.hero();

const attr: Record<string, string> = {
  survival: "生存能力",
  attack: "攻击伤害",
  effect: "技能效果",
  difficulty: "上手难度",
};

const info: string[][] = [
  ["阵营", "campType", "camp"],
  ["定位", "locationType", "location"],
  ["时期", "periodType", "period"],
  ["种族", "raceType", "race"],
];

const { status, show, form_data, finish, onConfirmSave, onConfirmRemove } = viewHide<Hero.Data>(emit, "add_hero");

//类型列表
const type_list: Record<string, any[]> = reactive({
  campType: [],
  locationType: [],
  periodType: [],
  professionType: [],
  specialtyType: [],
  raceType: [],
});

//根据英雄总数设置id
API_HERO.getHeroBasic().then((res) => {
  form_data.value!.id = res.length + 1;
});

//判断是否存在缓存
form_data.value ??= Util.TOOL.deepCopy(heroDefault);

/* 发布 */
const onCommit = async () => {
  const { id, mark, name, cover, headImg, poster } = form_data.value as Hero.Data;

  if (id && mark && name && cover && headImg && poster) {
    await API_HERO.addHeroBasic({
      id,
      name,
    });
    await API_HERO.addHeroImg({
      id,
      name,
      headImg,
    });
    await API_HERO.addHeroData(form_data.value!);
    finish.value = true;
    setTimeout(() => {
      onConfirmRemove();
      $message("发布成功", "info");
      $heroStore.getHeroList();
    }, 500);
  } else {
    $message("请完整填写", "error");
    status.value = 0;
  }
};

/* 延迟显示 */
$loading.close();
setTimeout(async () => {
  type_list.campType = await API_HERO.getCampType();
  type_list.raceType = await API_HERO.getRaceType();
  type_list.locationType = await API_HERO.getLocationType();
  type_list.periodType = await API_HERO.getPeriodType();
  type_list.professionType = await API_HERO.getProfessionType();
  type_list.specialtyType = await API_HERO.getSpecialtyType();
  show.value = true;
}, 1000);
</script>

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
      <FormInput v-model="form_data!.name" label="英雄名" required />
      <FormInput v-model="form_data!.gender" label="性别" required placeholder="男/女" />
      <FormInput v-model="form_data!.mark" label="代号" required />
      <FormInput v-model="form_data!.height" label="身高" />
      <FormInput v-model="form_data!.identity" label="身份" placeholder="多个身份/分隔" />
    </div>

    <!-- 选择器相关 -->
    <div class="flex-box">
      <FormSelect
        v-for="(v, k) in info"
        :key="k"
        v-model="form_data![v[2]]"
        :label="v[0]"
        :data="type_list[v[1]]"
        :value="form_data![v[2]]"
      />
    </div>

    <!-- 职业 -->
    <FormSelect
      v-model="form_data!.profession"
      :data="type_list.professionType"
      :value="form_data!.profession"
      label="职业"
      multi
    />

    <!-- 特长 -->
    <FormSelect
      v-model="form_data!.specialty"
      :data="type_list.specialtyType"
      :value="form_data!.specialty"
      label="特长"
      multi
    />

    <!-- 属性相关 -->
    <div class="flex-box">
      <FormLabel v-for="(v, k) in attr" :key="k" :label="v" label-width="12.5rem">
        <K-Range v-model="form_data![k]" :text="form_data![k] + '%'" track-color="var(--theme-el-color-four)" />
      </FormLabel>
    </div>

    <!-- 设置头像&海报 -->
    <div class="flex-box">
      <FormLabel label-width="18.125rem" label="头像&封面&&海报">
        <SelectImg v-model="form_data!.headImg" title="头像" />
        <SelectImg v-model="form_data!.cover" type="height" title="封面" />
        <SelectImg v-model="form_data!.poster" type="width" title="海报" />
      </FormLabel>
    </div>

    <!-- 发布确认 -->
    <ReleaseConfirm
      v-model:status="status"
      :finish="finish"
      @commit="onCommit"
      @confirm="onConfirmSave"
      @cancel="onConfirmRemove"
    />
  </ManageMask>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
