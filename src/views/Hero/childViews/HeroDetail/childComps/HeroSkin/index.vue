<script setup lang="ts">
import { reactive, ref } from "vue";

import HeroBgImg from "./childComps/HeroBgImg/index.vue";
import HeroVoice from "./childComps/HeroVoice/index.vue";
import HeroSkinName from "./childComps/HeroSkinName/index.vue";
import HeroSkinType from "./childComps/HeroSkinType/index.vue";
import HeroSkinPrice from "./childComps/HeroSkinPrice/index.vue";
import HeroSkinHeadImg from "./childComps/HeroSkinHeadImg/index.vue";

import { heroDefault } from "@/default";
import { Util } from "@/utils";
import { API_SKIN } from "@/api";
import { HeroDetailStore } from "@/store";

const $heroDetail = HeroDetailStore();

/** 英雄数据 */
const hero_data = ref<Hero.Data>(Util.TOOL.deepCopy(heroDefault));

hero_data.value = $heroDetail.hero_info;

/** 皮肤名 */
const active_skin_name = ref("");
/** 皮肤类型 */
const active_skin_type = ref("");
/** 价格 */
const skin_price = ref<string | number>("");
/** 皮肤背景切换 */
const skin_bg_toggle = ref(true);
/** 皮肤名切换 */
const skin_name_toggle = ref(true);
/** 皮肤类型切换 */
const skin_type_toggle = ref(true);
/** 皮肤价格切换 */
const skin_price_toggle = ref(false);
/** 背景图 */
const skin_bg = reactive<string[]>([]);

/* 切换皮肤海报 */
const onTogglePoster = ([i, index]: number[]) => {
  const skins = hero_data.value.skins;
  /** 设置背景图 */
  skin_bg[i] = (skins && skins[index].poster) || "";
  /** 用于皮肤背景的切换动画 */
  skin_bg_toggle.value = !skin_bg_toggle.value;

  //设置皮肤名，皮肤名需要有切换时的打字机效果
  active_skin_name.value = (skins && skins[index].name) || "";
  skin_name_toggle.value = !skin_name_toggle.value;

  //隐藏价格
  skin_price_toggle.value = false;

  //延迟设置
  setTimeout(async () => {
    const skins = hero_data.value.skins;
    const skin_type = (skins && skins[index].type) || "";

    //0 为伴生
    if (skin_type !== 0) {
      active_skin_type.value = (await API_SKIN.getAssignSkinType(skin_type as number)).link;
    } else {
      //伴生皮肤没有标志
      active_skin_type.value = "";
    }

    //使切换标志时有淡入淡出效果
    skin_type_toggle.value = !skin_type_toggle.value;
    //切换皮肤
    $heroDetail.skinToggle(hero_data.value.name, active_skin_name.value);

    //延迟显示价格
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
      <!-- 顶部 -->
      <div class="top">
        <!-- 皮肤类型 -->
        <HeroSkinType :skin-type-img="active_skin_type" :toggle="skin_type_toggle" />

        <!-- 皮肤价格 -->
        <HeroSkinPrice :toggle="skin_price_toggle" :price="skin_price" />
      </div>

      <!-- 主体 -->
      <div class="main">
        <div class="main-left">
          <!-- 皮肤语音 -->
          <HeroVoice />
        </div>

        <div class="main-right">
          <!-- 中心皮肤切换 -->
          <HeroSkinHeadImg
            v-if="hero_data.skins!.length"
            class="hero-skin-head-img"
            :skins="hero_data.skins"
            @bg-imgs="onTogglePoster"
          />
        </div>
      </div>

      <!-- 底部 -->
      <div class="bottom">
        <!-- 皮肤名 -->
        <HeroSkinName
          v-if="active_skin_name"
          :toggle="skin_name_toggle"
          :name="active_skin_name + '-' + hero_data.name"
        />
      </div>
    </div>

    <!-- 背景图 -->
    <HeroBgImg :bg-img="skin_bg" :toggle="skin_bg_toggle" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
