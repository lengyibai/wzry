<script setup lang="ts">
import { ref } from "vue";

import { useViewHide } from "@/views/System/hooks/useViewHide";
import { API_HERO_INFO, API_SKIN, API_SKIN_INFO } from "@/api";
import { $message, $loading } from "@/utils";
import {
  FormInput,
  FormLabel,
  FormSelect,
  ManageMask,
  ReleaseConfirm,
  SelectHero,
  SelectImg,
} from "@/components/business";

const $emit = defineEmits<{
  "update:modelValue": [v: boolean];
}>();

const { hero_id, show, finish, status, form_data, onConfirmSave, onConfirmRemove } = useViewHide<
  Hero.Skin[]
>($emit, "add_skin_list");

//判断是否存在缓存
form_data.value ??= [];

/** 英雄皮肤列表 */
let skins: Hero.Skin[] = [];

const scrollBoxRef = ref<InstanceType<typeof ManageMask>>();

/** 当前英雄的皮肤数量 */
const skin_num = ref(0);
/** 当前英雄的信息 */
let hero_info: Hero.Data;
/** 皮肤类型表 */
const skin_types = ref<Hero.SkinType[]>([]);
/** 根据悬浮的位置显示垃圾桶 */
const current_index = ref<number | null>(null);

/* 延迟显示 */
$loading.close();
setTimeout(async () => {
  skin_types.value = await API_SKIN.getSkinType();
  show.value = true;
}, 1000);

/* 选择英雄后触发 */
const onSelectHero = (id: number) => {
  API_SKIN_INFO.getHeroSkins(id).then((res) => {
    skin_num.value = res.length;
    skins = res;
  });

  API_HERO_INFO.getHeroDetail(id).then((res) => {
    hero_info = res;
  });
};

/* 如果本地存在英雄id，则自动选中 */
hero_id.value && onSelectHero(hero_id.value);

/* 增加一项 */
const handleAddOne = () => {
  if (hero_id.value) {
    form_data.value!.push({
      id: 0,
      hero: hero_info.id,
      num: 0,
      price: "",
      type: "",
      name: "",
      poster: "",
      cover: "",
      headImg: "",
      profession: hero_info.profession,
      heroName: hero_info.name,
      gender: hero_info.gender,
      category: "",
      posterBlur: "",
      posterBig: "",
    });

    //滚动到底部
    setTimeout(() => {
      if (!(scrollBoxRef.value && scrollBoxRef.value.el)) return;
      scrollBoxRef.value.el.scroll({
        top: scrollBoxRef.value.el.scrollHeight,
        behavior: "smooth",
      });
    });
  } else {
    $message("请选择英雄后新增", "error");
  }
};

/* 判断皮肤是否存在 */
const onExist = (v: number | string) => {
  const isExist = skins.some((item: Hero.Skin) => {
    return item.name === v;
  });
  isExist && $message("该皮肤已存在", "warning");
};

/* 删除一项 */
const handleDelOne = (i: number) => {
  form_data.value!.splice(i, 1);
  current_index.value = null;
};

/* 发布 */
const onCommit = async () => {};
</script>

<template>
  <ManageMask
    ref="scrollBoxRef"
    class="content"
    :show="show"
    :styles="{
      flexDirection: 'column',
    }"
  >
    <transition-group name="fade">
      <!--左上角新增-->
      <i key="LibSvg" class="add-one iconfont wzry-addcircle" @click="handleAddOne" />

      <!--指派英雄-->
      <SelectHero
        key="SelectHero"
        v-model="hero_id"
        class="select-hero"
        :disabled="!!form_data!.length"
        @update:model-value="onSelectHero"
      />

      <!-- 拥有皮肤数量 -->
      <span key="SkinNum" class="skin-num">拥有皮肤：{{ skin_num }}款</span>

      <!--皮肤盒子列表-->
      <div
        v-for="(item, index) in form_data"
        :key="index"
        class="skin"
        @mouseenter="current_index = index"
        @mouseleave="current_index = null"
      >
        <FormInput v-model="item.name" label="皮肤名" required @blur="onExist" />
        <FormInput v-model="item.price" label="价格" placeholder="请输入" />

        <!-- 皮肤类型 -->
        <FormSelect id v-model="item.type" label="皮肤类型" :data="skin_types" :value="item.type" />

        <!--··皮肤头像、海报··-->
        <FormLabel label-width="22.1875rem" label="头像&海报&小尺寸海报">
          <SelectImg v-model="item.headImg" title="头像" />
          <SelectImg v-model="item.poster" type="width" title="海报" />
          <SelectImg v-model="item.cover" type="width" title="小尺寸海报" />
        </FormLabel>

        <!--··右上角删除··-->
        <i class="del iconfont wzry-guanbi" @click="handleDelOne(index)" />
      </div>
    </transition-group>

    <!-- 发布相关 -->
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
