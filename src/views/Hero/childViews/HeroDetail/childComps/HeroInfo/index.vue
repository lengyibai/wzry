<template>
  <div class="hero-material-skins" ref="HeroMaterialSkins">
    <!-- 英雄标题 -->
    <div class="title">
      <div class="title-name">{{ hero_data.name || "未知" }}</div>
      <div class="title-mark">
        <img class="left" src="https://lengyibai.gitee.io/wzry-material/image/mark.png" alt="" />
        <span class="text">{{ hero_data.mark || "未知" }}</span>
        <img class="right" src="https://lengyibai.gitee.io/wzry-material/image/mark.png" alt="" />
      </div>
    </div>

    <!-- 主体 -->
    <div class="content">
      <!-- 左侧 -->
      <div class="content-left scroll-white" @mousewheel.stop>
        <!-- 基础信息表 -->
        <div class="basic-info">
          <div class="list">
            <span class="info" ref="info" v-for="(item, index) in hero_info" :key="index">
              <i class="iconfont" :class="'wzry-' + item[1]"></i>
              <span class="label">{{ item[2] }}：</span>
              <span class="name">{{ item[0] || "未知" }}</span>
            </span>
          </div>

          <!-- 关系 -->
          <transition name="fade">
            <div class="relationship" v-if="into">
              <div class="relation" v-for="(item, index) in hero_data.relationship" :key="index">
                <span class="name">{{ item.relation }}：</span>
                <img :src="item.hero.headImg" alt="" />
              </div>
            </div>
          </transition>
        </div>

        <!-- 属性 -->
        <transition name="fade">
          <div class="hero-attribute" v-if="into">
            <HeroAttribute style="--i: 0" class="attribute" attr="survival" :length="hero_data.survival" />
            <HeroAttribute style="--i: 1" class="attribute" attr="attack" :length="hero_data.attack" />
            <HeroAttribute style="--i: 2" class="attribute" attr="effect" :length="hero_data.effect" />
            <HeroAttribute style="--i: 3" class="attribute" attr="difficulty" :length="hero_data.difficulty" />
          </div>
        </transition>
      </div>

      <!-- 英雄语音 -->
      <HeroVoice :voices="hero_data.voices" v-if="into && hero_data.voices?.length" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { $deepCopy } from "@/utils";
import { heroDefault } from "@/defaultValue/defaults";
import heroStore from "@/store/hero";
import HeroAttribute from "./childComps/HeroAttribute/index.vue";
import HeroVoice from "./childComps/HeroVoice/index.vue"; //英雄语音

const info = ref();
const into = ref(false); //控制页面元素显示
const $heroStore = heroStore();
const hero_data = ref<typeof heroDefault>($deepCopy(heroDefault)); //英雄数据
hero_data.value = $heroStore.hero_info;

const hero_info: string[][] = [
  [hero_data.value.profession.join("/"), "profession", "职业"],
  [hero_data.value.location, "location", "定位"],
  [hero_data.value.specialty.join("/"), "specialty", "特长"],
  [hero_data.value.period, "period", "时期"],
  [hero_data.value.camp, "camp", "阵营"],
  [hero_data.value.height, "height", "身高"],
  [hero_data.value.identity.join("/"), "identity", "身份"],
];

onMounted(() => {
  /* 设置按顺序出场的动画 */

  setTimeout(() => {
    into.value = true;
    info.value.forEach((item: HTMLElement, index: number) => {
      item.style.transitionDelay = `${index / 10}s`;
      setTimeout(() => {
        item.style.transform = "translateX(0)";
        item.style.opacity = "1";
      });
    });
  }, 1000);
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
