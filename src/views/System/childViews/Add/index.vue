<template>
  <div class="Add flex" :style="box">
    <K-ManageCard @click="open(k)" v-for="(v, k) in list" :title="v" :key="k" :style="card" type="add" />

    <!--//%%%%%··········发布列表··········%%%%%//-->
    <transition name="clip" v-for="(v, k) in options" :key="k">
      <component v-if="v.show" v-model="v.show" :is="components[v.i]" />
    </transition>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import AddHero from './childViews/AddHero/index.vue'; //英雄
import AddSkin from './childViews/AddSkin/index.vue'; //皮肤
import AddSkill from './childViews/AddSkill/index.vue'; //技能
import AddVoice from './childViews/AddVoice/index.vue'; //语音
import AddStory from './childViews/AddStory/index.vue'; //故事
import AddEquip from './childViews/AddEquip/index.vue'; //装备
import AddEpigraph from './childViews/AddEpigraph/index.vue'; //铭文
import useManageCard from '../../hooks/useManageCard.js';

const { card, box, list } = useManageCard;
const components = [AddHero, AddSkin, AddVoice, AddSkill, AddStory, AddEquip, AddEpigraph];
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
.Add {
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
</style>
