<template>
  <div class="hero-material-skins" ref="HeroMaterialSkins">
    <div class="box">
      <!-- 左侧详情 -->
      <HeroMaterialBasicInfo v-if="show_info" />

      <!-- 右边侧详情 -->
      <HeroMaterialAttribute v-if="show_info" />

      <!-- 皮肤类型 -->
      <HerSkinType :skinTypeImg="active_skin_type" :toggle="skin_type_toggle" />

      <!-- 英雄语音 -->
      <HeroVoice :voices="hero_data.voices" v-if="show_info && hero_data.voices?.length" />

      <!-- 中心皮肤切换 -->
      <HeroSkinHeadImg :skins="hero_data.skins" @bg-imgs="bgImgs" v-if="hero_data.skins.length" />

      <!-- 皮肤名 -->
      <HeroSkinName :toggle="skin_name_toggle" :name="active_skin_name" />
    </div>

    <!-- 背景图 -->
    <HeroBgImg :bgImg="bg_imgs" :toggle="toggle" />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";
import heroAttrStore from "@/store/heroAttr";
import HeroBgImg from "./childComps/HeroBgImg/index.vue"; //背景图
import HeroVoice from "./childComps/HeroVoice/index.vue"; //英雄语音
import HerSkinType from "./childComps/HerSkinType/index.vue"; //皮肤类型图
import HeroSkinName from "./childComps/HeroSkinName/index.vue"; //皮肤名
import HeroSkinHeadImg from "./childComps/HeroSkinHeadImg/index.vue"; //切换皮肤工具
import HeroMaterialAttribute from "./childComps/HeroMaterialAttribute/index.vue"; //右侧属性详情
import HeroMaterialBasicInfo from "./childComps/HeroMaterialBasicInfo/index.vue"; //左侧资料详情

const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据

const $heroStore = heroStore();
const $heroAttrStore = heroAttrStore();
hero_data.value = $heroStore.hero_info;

const active_skin_name = ref(""); //皮肤名
const active_skin_type = ref(""); //皮肤类型
const show_info = ref(false); //用于延迟显示卡片
const toggle = ref(true); //用于切换背景
const skin_name_toggle = ref(true); //皮肤切换
const skin_type_toggle = ref(true); //皮肤类型切换
const bg_imgs: string[] = reactive([]); //背景图

/* 延迟显示卡片 */
setTimeout(() => {
  show_info.value = true;
}, 1000);

/* 判断是否存在缓存 */
if ($heroAttrStore.skinType.length === 0) {
  $heroAttrStore.getSkinType();
}

/* 通过切换背景图组件传过来的索引设置背景 */
const bgImgs = ([i, index]: number[]) => {
  bg_imgs[i] = hero_data.value.skins![index].img; //设置背景图
  toggle.value = !toggle.value; //用于皮肤背景的切换动画

  /* 设置皮肤名，皮肤名需要有切换时的打字机效果 */
  active_skin_name.value = hero_data.value.skins![index].name;
  skin_name_toggle.value = !skin_name_toggle.value;

  /* 切换时延迟设置顶部皮肤类型标志 */
  setTimeout(async () => {
    const skin_type = hero_data.value.skins![index].type;
    // 0 为伴生
    if (skin_type !== "0") {
      active_skin_type.value = $heroAttrStore.getAssignType(skin_type).link;
    } else {
      active_skin_type.value = ""; //伴生皮肤没有标志
    }
    skin_type_toggle.value = !skin_type_toggle.value; //使切换标志时有淡入淡出效果
  }, 250);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
