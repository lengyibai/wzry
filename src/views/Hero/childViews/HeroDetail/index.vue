<script setup lang="ts">
import { watchEffect, nextTick, ref, computed } from "vue";
import { useRouter } from "vue-router";

import HeroScroll from "./childComps/HeroScroll/index.vue";
import HeroParallax from "./childComps/HeroParallax/index.vue";
import Heroprogress from "./childComps/Heroprogress/index.vue";
import HeroInfo from "./childComps/HeroInfo/index.vue";
import HeroSkin from "./childComps/HeroSkin/index.vue";
import HeroSkill from "./childComps/HeroSkill/index.vue";

import { heroDefault } from "@/default";
import { HeroDetailStore, HeroStore, AudioStore } from "@/store";
import { $tool } from "@/utils";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const $emit = defineEmits<Emits>();

const $router = useRouter();
const $heroDetail = HeroDetailStore();
const $heroStore = HeroStore();
const $audioStore = AudioStore();

/** 滚动索引 */
const scroll_index = ref(1);
/** 显示左上角关闭 */
const show_close = ref(false);
/** 显示滚动索引组件 */
const show_progress = ref(false);
/** 英雄关系切换时重新加载皮肤页 */
const hero_toggle = ref(true);
/** 英雄信息 */
const hero_data = ref<Hero.Data>($tool.deepCopy(heroDefault));

watchEffect(() => {
  hero_data.value = $heroDetail.hero_info;
  hero_toggle.value = false;
  nextTick(() => {
    hero_toggle.value = true;
    //切换皮肤
    $heroDetail.skinToggle(hero_data.value.name, "");
  });
});

//技能数量
const skill_num = computed(() => {
  return (hero_data.value.skills && hero_data.value.skills.length) || 0;
});

//皮肤数量
const skin_num = computed(() => {
  return (hero_data.value.skins && hero_data.value.skins.length) || 0;
});

/* 点击滚动索引 */
const onToggle = (index: number) => {
  scroll_index.value = index;
};

/* 滚动立即触发 */
const onScollStart = () => {
  $audioStore.play("n4r4");
};

/* 滚动结束触发 */
const onScrollEnd = (index: number) => {
  $heroDetail.setIndex(index);
};

/* 隐藏自身 */
const handleHide = () => {
  $router.replace("/hero");
  //置空语音（盾山没有语音，可以用于置空）
  $heroDetail.setSkinVoice("盾山");
  $audioStore.play("6xc6");

  //延迟0.1秒显示解决移动端动画掉帧
  setTimeout(() => {
    $emit("update:modelValue", false);
  }, 100);

  /* 如果英雄列表职业为空，1.5秒后获取英雄列表 */
  if (!$heroStore.profession) {
    setTimeout(() => {
      $heroStore.getHeroList();
      setTimeout(() => {
        $audioStore.play("4d8m");
      }, 250);
    }, 1500);
  }
};

//延迟显示滚动索引
setTimeout(() => {
  show_progress.value = true;
  show_close.value = true;
  hero_data.value.skins?.forEach((item) => {
    /** 海报预加载 */
    new Image().src = item.poster;
  });
}, 1500);

$audioStore.play("u4c5");
</script>

<template>
  <div class="hero-detail">
    <!-- 顶部关闭 -->
    <img
      class="close cursor-pointer"
      :class="{ 'close-show': show_close }"
      src="https://lengyibai.gitee.io/wzry-material/image/back.png"
      alt="返回"
      @dragstart.prevent
      @click="handleHide"
    />
    <HeroScroll v-model="scroll_index" @start="onScollStart" @end="onScrollEnd">
      <!--资料皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster">
        <HeroInfo />
      </HeroParallax>

      <!--技能-->
      <HeroParallax v-if="skill_num" class="scroll-item" :bg="hero_data.skins![skin_num - 1].poster">
        <HeroSkill v-if="hero_toggle" />
      </HeroParallax>

      <!--皮肤-->
      <HeroParallax v-if="skin_num" class="scroll-item" :bg="hero_data.poster">
        <HeroSkin v-if="hero_toggle" />
      </HeroParallax>
    </HeroScroll>

    <!-- 滚动进度 -->
    <transition name="progress">
      <Heroprogress v-show="show_progress" :index="scroll_index" @toggle="onToggle" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
