<template>
  <div class="HeroSkillIcon">
    <div class="icon" ref="skillImg" v-for="(item, index) in hero_data.skills" :key="index">
      <transition name="borderFade">
        <div class="border" v-show="currentIndex === index"></div>
      </transition>
      <img :src="item.img" @click="selectSkill(index)" />
      <img :src="item.img" :class="{ active: currentIndex === index }" />
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue';

const currentIndex = ref(0); //处于展示的技能索引

const hero_data = inject('hero_data', {});

/* 点击需要展示的技能 */
const emit = defineEmits(['select-skill']);
const selectSkill = (index) => {
  currentIndex.value = index;
  emit('select-skill', index);
};
</script>
<style scoped lang="less">
.HeroSkillIcon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .icon {
    position: relative;
    overflow: hidden;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    filter: drop-shadow(0 2px 5px #000);
    .border {
      position: absolute;
      left: 0;
      z-index: 1;
      width: 90px;
      height: 90px;
      border: 5px solid #f9ca24;
      border-radius: 50%;
      box-shadow: 0 0 10px 5px #000 inset;
      pointer-events: none;
      &::before,
      &::after {
        position: absolute;
        left: 50%;
        box-sizing: border-box;
        width: 20px;
        width: 20px;
        border-width: 10px;
        border-style: solid;
        content: '';
        transform: translatex(-50%);
      }
      &::before {
        top: -1px;
        border-color: #f9ca24 transparent transparent transparent;
      }
      &::after {
        bottom: -1px;
        border-color: transparent transparent #f9ca24 transparent;
      }
    }
    img {
      width: 100%;
      height: 100%;
      &:nth-of-type(1) {
        position: absolute;
        filter: grayscale(100%) brightness(25%);
      }
      &:nth-of-type(2) {
        transition: all 0.5s;
        transform: translateY(-100%);
      }
    }
  }
}

.active {
  transform: translateY(0) !important;
}

.borderFade-enter-from,
.borderFade-leave-active {
  opacity: 0;
  transform: scaleY(2);
}
.borderFade-enter-active {
  transition: all 0.5s 0.35s;
}
.borderFade-leave-active {
  transition: all 0.5s;
}
</style>
