<template>
  <div class="Del flex" :style="box">
    <transition-group name="Del" appear>
      <K-ManageCard @click="open(k)" v-for="(v, k) in list" :title="v" :key="k" type="delete" />
    </transition-group>

    <!--发布列表-->
    <transition name="clip" v-for="(v, k) in options" :key="k">
      <component v-if="v.show" v-model="v.show" :is="components[v.i]" />
    </transition>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import DelHero from './childViews/DelHero/index.vue'; //英雄
import DelSkin from './childViews/DelSkin/index.vue'; //皮肤
import DelSkill from './childViews/DelSkill/index.vue'; //技能
import DelVoice from './childViews/DelVoice/index.vue'; //语音
import DelStory from './childViews/DelStory/index.vue'; //故事
import DelEquip from './childViews/DelEquip/index.vue'; //装备
import DelEpigraph from './childViews/DelEpigraph/index.vue'; //铭文
import useManageCard from '../../hooks/useManageCard';

const { box, list } = useManageCard;
const components = [DelHero, DelSkin, DelVoice, DelSkill, DelStory, DelEquip, DelEpigraph];
const options = reactive({
  Hero: {
    i: 0,
    show: false,
  },
  Skin: {
    i: 1,
    show: false,
  },
  Voice: {
    i: 2,
    show: false,
  },
  Skill: {
    i: 3,
    show: false,
  },
  Story: {
    i: 4,
    show: false,
  },
  Equip: {
    i: 5,
    show: false,
  },
  Epigraph: {
    i: 6,
    show: false,
  },
});

const open = (key) => {
  options[key].show = true;
};
</script>
<style scoped lang="less">
.Del {
}

/* 蒙版裁剪 */
.clip-enter-active {
  animation: clip-in 1s;
}

.clip-leave-active {
  animation: clip-out 0.35s;
}

@keyframes clip-in {
  0% {
    clip-path: inset(50% 49.75% 50% 49.75%);
  }
  50% {
    clip-path: inset(0 49.75% 0 49.75%);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes clip-out {
  0% {
    clip-path: inset(0 0 0 0);
  }
  80% {
    clip-path: inset(49.75% 0 49.75% 0%);
  }
  95% {
    clip-path: inset(49.75% 49.75% 49.75% 49.75%);
  }
  100% {
    clip-path: inset(50% 50% 50% 50%);
  }
}

/* 进入前状态 */
.Del-enter-from,
.Del-leave-active {
  opacity: 0;
  transform: translateY(25%) scale(0.75);
}
/* 进入和离开动画属性 */
.Del-leave-active,
.Del-enter-active {
  transition: all 0.5s;
}
/* 解决添加元素占位时无动画，替代 width: 0 与 overflow: hidden */
.Del-move {
  transition: all 0.5s;
}
/* 解决删除元素时，其他元素补位无动画 */
.Del-leave-active {
  position: absolute; /* 必须为绝对定位 */
}
</style>
