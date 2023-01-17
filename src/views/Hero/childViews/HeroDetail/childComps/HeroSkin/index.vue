<script setup lang="ts">
import { reactive, ref } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue";
import { getAssignSkinType } from "@/api/main/games/skin";
import heroDetailStore from "@/store/heroDetail";
import HeroBgImg from "./childComps/HeroBgImg/index.vue"; //背景图
import HeroVoice from "./childComps/HeroVoice/index.vue"; //皮肤语音
import HeroSkinName from "./childComps/HeroSkinName/index.vue"; //皮肤名
import HerSkinType from "./childComps/HerSkinType/index.vue"; //皮肤类型图
import HeroSkinPrice from "./childComps/HeroSkinPrice/index.vue"; //皮肤价格
import HeroSkinHeadImg from "./childComps/HeroSkinHeadImg/index.vue"; //切换皮肤工具

const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据
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

/* 切换皮肤触发 */
const bgImgs = ([i, index]: number[]) => {
  skin_bg[i] = hero_data.value.skins![index].poster; //设置背景图
  skin_bg_toggle.value = !skin_bg_toggle.value; //用于皮肤背景的切换动画

  //设置皮肤名，皮肤名需要有切换时的打字机效果
  active_skin_name.value = hero_data.value.skins![index].name;
  skin_name_toggle.value = !skin_name_toggle.value;

  //隐藏价格
  skin_price_toggle.value = false;

  //延迟设置
  setTimeout(async () => {
    const skin_type = hero_data.value.skins![index].type;
    // 0 为伴生
    if (skin_type !== 0) {
      active_skin_type.value = (
        await getAssignSkinType(skin_type as number)
      ).link;
    } else {
      active_skin_type.value = ""; //伴生皮肤没有标志
    }
    skin_type_toggle.value = !skin_type_toggle.value; //使切换标志时有淡入淡出效果
    $heroDetailStore.skinToggle(hero_data.value.name, active_skin_name.value);

    setTimeout(() => {
      skin_price.value = hero_data.value.skins![index].price;
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
        <HerSkinType
          :skin-type-img="active_skin_type"
          :toggle="skin_type_toggle"
        />

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
          @bg-imgs="bgImgs"
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
