<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

import HeroParallax from "./childComps/HeroParallax/index.vue"; //滚动视差背景
import Heroprogress from "./childComps/Heroprogress/index.vue"; //滚动索引
import HeroInfo from "./childComps/HeroInfo/index.vue"; //资料
import HeroSkin from "./childComps/HeroSkin/index.vue"; //皮肤鉴赏
import HeroSkill from "./childComps/HeroSkill/index.vue"; //技能页

import heroDetailStore from "@/store/heroDetail";
import heroDetail from "@/store/heroDetail";
import heroStore from "@/store/hero";
import switchStore from "@/store/switch";
import { $isPhone } from "@/utils";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $router = useRouter();
const $heroDetail = heroDetail();
const $heroStore = heroStore();
const $heroDetailStore = heroDetailStore();
const $switchStore = switchStore();

const page_name = ["英雄资料", "皮肤鉴赏", "技能信息"]; //滚动索引标题

const scroll_index = ref(1); //滚动索引
const show_progress = ref(false); //显示滚动索引组件

const hero_data = $heroDetail.hero_info; //英雄信息

//技能数量
const skill_num = computed(() => {
  return (hero_data.skills && hero_data.skills.length) || 0;
});

//皮肤数量
const skin_num = computed(() => {
  return (hero_data.skins && hero_data.skins.length) || 0;
});

/* 点击滚动索引 */
const EmitToggle = (index: number) => {
  scroll_index.value = index;
};

/* 滚动立即触发 */
const EmitScollStart = () => {
  $switchStore.$clickAudio("n4r4");
};

/* 滚动结束触发 */
const EmitScrollEnd = (index: number) => {
  $heroDetailStore.setIndex(index);
};

/* 隐藏自身 */
const EmitHide = () => {
  $router.replace("/hero");
  $heroDetailStore.setSkinVoice("盾山"); //置空语音
  $switchStore.$clickAudio("6xc6");

  //延迟0.1秒显示解决移动端动画掉帧
  setTimeout(() => {
    emit("update:modelValue", false);
  }, 100);

  /* 如果英雄列表职业为空，1.5秒后获取英雄列表 */
  if ($heroStore.profession === "") {
    setTimeout(() => {
      $heroStore.getHeroList();
      setTimeout(() => {
        $switchStore.$clickAudio("4d8m");
      }, 250);
    }, 1500);
  }
};

onMounted(() => {
  //延迟显示滚动索引
  setTimeout(() => {
    show_progress.value = true;
    hero_data.skins?.forEach((item) => {
      new Image().src = item.poster; //海报预加载
    });

    $isPhone
      ? $switchStore.$tip({
          text: "1zs6",
          align: "left-top",
          btnFn: () => {
            $switchStore.$tip({
              text: "58mz",
            });
          },
        })
      : $switchStore.$tip({
          text: "0vk2",
          align: "left-top",
          btnFn: () => {
            $switchStore.$tip({
              text: "05su",
            });
          },
        });
  }, 1500);

  $switchStore.$clickAudio("u4c5");
});
</script>

<template>
  <div class="hero-detail">
    <!-- 顶部关闭 -->
    <LibMaskClose @close="EmitHide" />
    <LibFullScroll v-model="scroll_index" @start="EmitScollStart" @end="EmitScrollEnd">
      <!--资料皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster">
        <HeroInfo />
      </HeroParallax>

      <!--皮肤-->
      <HeroParallax v-if="skin_num" class="scroll-item" :bg="hero_data.poster">
        <HeroSkin />
      </HeroParallax>

      <!--技能-->
      <HeroParallax
        v-if="skill_num"
        class="scroll-item"
        :bg="hero_data.skins![skin_num - 1].poster"
      >
        <HeroSkill />
      </HeroParallax>
    </LibFullScroll>

    <!-- 滚动进度 -->
    <transition name="progress">
      <Heroprogress
        v-show="show_progress"
        :index="scroll_index"
        :page-name="page_name"
        @toggle="EmitToggle"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
