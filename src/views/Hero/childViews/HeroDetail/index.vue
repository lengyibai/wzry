<template>
  <div class="HeroDetail">
    <LibMaskClose @close="hide" />
    <!--//%%%%%··········资料皮肤··········%%%%%//-->
    <HeroDetailParallaxBg :bg="hero_data.poster">
      <HeroMaterialSkins />
    </HeroDetailParallaxBg>

    <!--//%%%%%··········技能··········%%%%%//-->
    <HeroDetailParallaxBg :bg="hero_data.poster" v-if="hero_data.skills">
      <HeroSkill />
    </HeroDetailParallaxBg>

    <!--//%%%%%··········故事··········%%%%%//-->
    <HeroDetailParallaxBg :bg="hero_data.poster" v-if="hero_data.gameStory">
      <HeroStory />
    </HeroDetailParallaxBg>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import heroStore from '@/store/hero.js';
import HeroDetailParallaxBg from './childComps/HeroDetailParallaxBg/index.vue'; //滚动视差背景
import HeroMaterialSkins from './childComps/HeroMaterialSkins/index.vue'; //资料、皮肤页
import HeroSkill from './childComps/HeroSkill/index.vue'; //技能页
import HeroStory from './childComps/HeroStory/index.vue'; //历史页

const $heroStore = heroStore();

const hero_data = $heroStore.hero_info;

const show_info = ref(false);

/* 延迟显示卡片 */
setTimeout(() => {
  show_info.value = true;
}, 1000);

/* 隐藏自身 */
const $router = useRouter();
const emit = defineEmits(['update:modelValue']);
const hide = () => {
  emit('update:modelValue', false);
  $router.replace('/hero');
};
</script>
<style scoped lang="less">
/* 滚动条整体背景 */
*::-webkit-scrollbar {
  width: 1px;
  height: 1px;
  background: #999;
}

/* 滚动条里面可以拖动的那部分 */
*::-webkit-scrollbar-thumb {
  background: var(--white);
}

/* 滚动条里面可以拖动的那部分 */
*::-webkit-scrollbar-thumb:hover {
  background-color: var(--white);
}

/* 滚动条里面可以拖动的那部分 */
*::-webkit-scrollbar-thumb:active {
  background-color: var(--white);
}

.HeroDetail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  overflow: hidden auto;
  width: 100%;
  height: 100%;
  background-color: #000;

  scroll-snap-type: y mandatory;
  .basis {
    display: flex;
    overflow: hidden;
    justify-content: space-between;

    transform-style: preserve-3d;
    perspective: 2000px;
  }
}
/* 从左到右 */
.leftToRight-enter-from,
.leftToRight-leave-to {
  transform: translateX(-100%) !important;
}

.leftToRight-leave-active,
.leftToRight-enter-active {
  transition: all 0.5s;
}
</style>
