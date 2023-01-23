<script setup lang="ts">
import { ref } from "vue";

import viewHide from "../../../../hooks/useViewHide";

import { getSkinType, getHeroSkin, addSkin } from "@/api/main/games/skin";
import { getHeroDetail } from "@/api/main/games/hero";
import switchStore from "@/store/switch";
import skinStore from "@/store/skin";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();
const $skinStore = skinStore();

const {
  hero_id,
  show,
  finish,
  status,
  form_data,
  show_ConfirmClose,
  EmitConfirmSave,
  EmitConfirmRemove,
  EmitCancelRelease,
} = viewHide<Hero.Skin[]>(emit, "add_skin_list");

//判断是否存在缓存
form_data.value ??= [];

let skins: Hero.Skin[] = []; //英雄皮肤列表

const scrollBox = ref();

let skin_num = ref(0); //当前英雄的皮肤数量
let hero_info: Hero.Data; //当前英雄的信息
const skin_types = ref<Hero.SkinType[]>([]); //皮肤类型表
const current_index = ref<number | null>(null); //根据悬浮的位置显示垃圾桶

/* 选择英雄后触发 */
const EmitSelectHero = (id: number) => {
  getHeroSkin(id).then((res) => {
    skin_num.value = res.length;
    skins = res;
  });

  getHeroDetail(id).then((res) => {
    hero_info = res;
  });
};

// 如果本地存在英雄id，则自动选中
hero_id.value && EmitSelectHero(hero_id.value);

/* 增加一项 */
const handleAddOne = () => {
  if (hero_id.value) {
    form_data.value!.push({
      id: 0,
      hero: hero_info.id, //所属英雄id
      num: 0,
      price: 0, //价格
      type: "", //类型
      name: "", //名称
      poster: "", //海报
      cover: "", //封面
      headImg: "", //头像
      profession: hero_info.profession, //职业
      heroName: hero_info.name, //英雄名称
      gender: hero_info.gender, //英雄名称
    });
    // 滚动到底部
    setTimeout(() => {
      scrollBox.value.el.scroll({
        top: scrollBox.value.el.scrollHeight,
        behavior: "smooth",
      });
    });
  } else {
    $switchStore.$msg("请选择英雄后新增", "error");
  }
};

/* 判断皮肤是否存在 */
const EmitExist = (v: number | string) => {
  let isExist = skins.some((item: Hero.Skin) => {
    return item.name === v;
  });
  isExist && $switchStore.$msg("该皮肤已存在", "warning");
};

/* 删除一项 */
const handleDelOne = (i: number) => {
  form_data.value!.splice(i, 1);
  current_index.value = null;
};

/* 发布 */
const EmitCommit = async () => {
  // 设置皮肤id
  form_data.value!.forEach((item, index) => {
    item.id = Number(`${hero_info.id}${skin_num.value + index + 1}`);
    item.num = skin_num.value + 1;
  });

  if (form_data.value!.every((item) => item.hero !== 0)) {
    for (let i = 0; i < form_data.value!.length; i++) {
      const item = form_data.value![i];
      await addSkin(item);
      finish.value = true;

      setTimeout(() => {
        EmitConfirmRemove();
        $switchStore.$msg("发布成功", "info");
        $skinStore.getSkin();
      }, 500);
    }
  } else {
    $switchStore.$msg("请完整填写", "error");
    status.value = 0;
  }
};

/* 延迟显示 */
$switchStore.$loading.close();
setTimeout(async () => {
  skin_types.value = await getSkinType();
  show.value = true;
}, 1000);
</script>

<template>
  <ManageMask
    ref="scrollBox"
    class="content"
    :show="show"
    :styles="{
      flexDirection: 'column',
    }"
  >
    <transition-group name="fade">
      <!--左上角新增-->
      <i
        key="LibSvg"
        class="add-one iconfont wzry-addcircle cursor-pointer"
        @click="handleAddOne"
      />

      <!--指派英雄-->
      <SelectHero
        key="SelectHero"
        v-model="hero_id"
        class="select-hero"
        :disabled="!!form_data!.length"
        @update:model-value="EmitSelectHero"
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
        <FormInput
          v-model="item.name"
          label="皮肤名"
          required
          @blur="EmitExist"
        />
        <FormInput v-model="item.price" label="价格" placeholder="请输入" />

        <!-- 皮肤类型 -->
        <FormSelect
          id
          v-model="item.type"
          label="皮肤类型"
          :data="skin_types"
          :value="item.type"
        />

        <!--··皮肤头像、海报··-->
        <FormLabel label-width="355px" label="头像&海报&小尺寸海报">
          <SelectImg v-model="item.headImg" title="头像" />
          <SelectImg v-model="item.poster" type="width" title="海报" />
          <SelectImg v-model="item.cover" type="width" title="小尺寸海报" />
        </FormLabel>

        <!--··右上角删除··-->
        <transition name="fade">
          <i class="del iconfont wzry-guanbi" @click="handleDelOne(index)" />
        </transition>
      </div>
    </transition-group>

    <!-- 发布相关 -->
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

<style scoped lang="less">
@import url("./index.less");
</style>
