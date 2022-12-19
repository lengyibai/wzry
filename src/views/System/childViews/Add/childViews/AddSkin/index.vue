<template>
  <ManageMask
    class="content"
    ref="scrollBox"
    :show="show"
    :styles="{
      flexDirection: 'column',
    }"
  >
    <transition-group name="fade">
      <!--左上角新增-->
      <i class="add-one iconfont wzry-addcircle cursor-pointer" @click="addOne" key="LibSvg" />

      <!--指派英雄-->
      <SelectHero class="select-hero" v-model="hero_id" key="SelectHero" />

      <!--皮肤盒子列表-->
      <div
        class="skin"
        @mouseenter="currentIndex = index"
        @mouseleave="currentIndex = null"
        v-for="(item, index) in form_data"
        :key="item.id"
      >
        <!--··皮肤名··-->
        <FormInput label="皮肤编号" required v-model="item.num" placeholder="第几款皮肤" number />
        <FormInput label="皮肤名" required v-model="item.name" />
        <FormInput label="价格" v-model="item.price" placeholder="请输入" number />

        <!--··皮肤头像、海报··-->
        <FormLabel labelWidth="290px" label="头像&封面&海报">
          <SelectImg v-model="item.headImg" title="头像" />
          <SelectImg v-model="item.poster" type="width" title="海报" />
        </FormLabel>

        <!--··右上角删除··-->
        <transition name="fade">
          <i class="del iconfont wzry-guanbi" @click="delOne(index)" />
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
<script setup lang="ts">
import { ref } from "vue";
import { getSkinType } from "@/api/main/games/skin";
import viewHide from "../../../../hooks/useViewHide";
import switchStore from "@/store/globalSwitch";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $switchStore = switchStore();
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

/* 判断是否存在缓存 */
form_data.value ??= [];

const skin_types = ref<Hero.SkinType[]>([]); //皮肤类型表
const currentIndex = ref<number | null>(null); //根据悬浮的位置显示垃圾桶

/* 增加一项 */
const scrollBox = ref();

const addOne = () => {
  form_data.value!.push({
    id: Date.now(),
    num: 0,
    hero: hero_id.value as number,
    name: "",
    poster: "",
    headImg: "",
    type: 0,
    price: 0,
  });
  // 滚动到底部
  setTimeout(() => {
    scrollBox.value.el.scroll({
      top: scrollBox.value.el.scrollHeight,
      behavior: "smooth",
    });
  });
};

/* 删除一项 */
const delOne = (i: number) => {
  form_data.value!.splice(i, 1);
  currentIndex.value = null;
};

/* 发布 */
const EmitCommit = async () => {
  const flag = form_data.value!.every((item) => {
    return item.hero !== 0;
  });

  if (flag) {
    for (let i = 0; i < form_data.value!.length; i++) {
      const item = form_data.value![i];
      // await addSkin(item);
      finish.value = true;
      setTimeout(() => {
        close();
        $switchStore.$tip("发布成功", "info");
      }, 500);
    }
  } else {
    $switchStore.$tip("请完整填写", "error");
    status.value = 0;
  }
};

/* 延迟显示 */
setTimeout(async () => {
  $switchStore.$loading.show("正在加载皮肤类型表");
  skin_types.value = await getSkinType();
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
