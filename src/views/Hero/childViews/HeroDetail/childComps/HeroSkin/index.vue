<script setup lang="ts">
import { reactive, ref } from "vue";

import HeroBgImg from "./childComps/HeroBgImg/index.vue"; //背景图
import HeroVoice from "./childComps/HeroVoice/index.vue"; //皮肤语音
import HeroSkinName from "./childComps/HeroSkinName/index.vue"; //皮肤名
import HeroSkinType from "./childComps/HeroSkinType/index.vue"; //皮肤类型图
import HeroSkinPrice from "./childComps/HeroSkinPrice/index.vue"; //皮肤价格
import HeroSkinHeadImg from "./childComps/HeroSkinHeadImg/index.vue"; //切换皮肤工具

import { getAssignSkinType } from "@/api/main/games/skin";
import { heroDefault } from "@/default";
import { $deepCopy } from "@/utils";
import heroDetailStore from "@/store/heroDetail";

const hero_data = ref<Hero.Data>($deepCopy(heroDefault)); //英雄数据
const $heroDetailStore = heroDetailStore();

hero_data.value = $heroDetailStore.hero_info;

const active_skin_name = ref(""); //皮肤名
const active_skin_type = ref(""); //皮肤类型
const skin_price = ref<string | number>(""); //价格
const skin_bg_toggle = ref(true); //皮肤背景切换
const skin_name_toggle = ref(true); //皮肤名切换
const skin_type_toggle = ref(true); //皮肤类型切换
const skin_price_toggle = ref(false); //皮肤价格切换
const skin_bg = reactive<string[]>([]); //背景图

/* 切换皮肤海报 */
const EmitTogglePoster = ([i, index]: number[]) => {
  const skins = hero_data.value.skins;
  skin_bg[i] = (skins && skins[index].poster) || ""; //设置背景图
  skin_bg_toggle.value = !skin_bg_toggle.value; //用于皮肤背景的切换动画

  //设置皮肤名，皮肤名需要有切换时的打字机效果
  active_skin_name.value = (skins && skins[index].name) || "";
  skin_name_toggle.value = !skin_name_toggle.value;

  //隐藏价格
  skin_price_toggle.value = false;

  //延迟设置
  setTimeout(async () => {
    const skins = hero_data.value.skins;
    const skin_type = (skins && skins[index].type) || "";

    // 0 为伴生
    if (skin_type !== 0) {
      active_skin_type.value = (await getAssignSkinType(skin_type as number)).link;
    } else {
      active_skin_type.value = ""; //伴生皮肤没有标志
    }

    skin_type_toggle.value = !skin_type_toggle.value; //使切换标志时有淡入淡出效果
    $heroDetailStore.skinToggle(hero_data.value.name, active_skin_name.value); //切换皮肤

    // 延迟显示价格
    setTimeout(() => {
      skin_price.value = (skins && skins[index].price) || "";
      skin_price_toggle.value = true;
    }, 100);
  }, 250);
};
</script>

<template>
  <div class="hero-skin">
    <div class="box">
      <div class="left">
        <!-- 皮肤类型 -->
        <HeroSkinType :skin-type-img="active_skin_type" :toggle="skin_type_toggle" />

        <!-- 皮肤语音 -->
        <HeroVoice />
      </div>

      <div class="right">
        <!-- 皮肤价格 -->
        <HeroSkinPrice :toggle="skin_price_toggle" :price="skin_price" />

        <!-- 中心皮肤切换 -->
        <HeroSkinHeadImg
          v-if="hero_data.skins!.length"
          :skins="hero_data.skins"
          @bg-imgs="EmitTogglePoster"
        />
      </div>

      <!-- 皮肤名 -->
      <HeroSkinName
        v-if="active_skin_name"
        :toggle="skin_name_toggle"
        :name="active_skin_name + '-' + hero_data.name"
      />
    </div>

    <!-- 背景图 -->
    <HeroBgImg :bg-img="skin_bg" :toggle="skin_bg_toggle" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
