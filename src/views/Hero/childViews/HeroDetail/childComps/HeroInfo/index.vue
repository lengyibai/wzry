<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { storeToRefs } from "pinia";

import HeroTitle from "./childComps/HeroTitle/index.vue";
import HeroBasic from "./childComps/HeroBasic/index.vue";
import HeroRelationship from "./childComps/HeroRelationship/index.vue";
import HeroAttribute from "./childComps/HeroAttribute/index.vue";

import { HeroDetailStore } from "@/store";
import { $tip, $tool } from "@/utils";

const { hero_info } = storeToRefs(HeroDetailStore());

/** 通过设备来显示不同的提示 */
let tip_text = "0vk2";

const relationshipRef = ref<InstanceType<typeof HeroRelationship>>();
const downRef = ref<HTMLElement>();

/** 控制页面元素显示 */
const into = ref(false);
/** 显示向上滚动提示 */
const show_down = ref(false);

onMounted(() => {
  //设置按顺序出场的动画
  setTimeout(async () => {
    into.value = true;

    await nextTick();

    setTimeout(() => {
      if (!relationshipRef.value?.el || !downRef.value) return;
      const focusRelationship = new $tool.FocusElement(
        relationshipRef.value.el,
      );
      const focusdown = new $tool.FocusElement(downRef.value);

      if ($tool.isPhone) {
        tip_text = "1zs6";
      }

      $tip({
        text: tip_text,
        align: "left-top",
        createFn: () => {
          focusdown.focus();
          show_down.value = true;
        },
        btnFn: () => {
          focusdown.blur();

          //显示完滚动提示后显示关系提示
          $tip({
            text: "05su",
            align: "right-bottom",
            createFn: () => {
              focusRelationship.focus();
            },
            btnFn: () => {
              focusRelationship.blur();
            },
          });
        },
      });
    }, 1000);
  }, 1000);
});
</script>

<template>
  <div class="basic-info">
    <!-- 英雄标题 -->
    <HeroTitle :class="{ show: !into }" />

    <div class="basic-info__content">
      <div class="basic-info__content__left">
        <HeroBasic class="hero-basic" />

        <!-- 属性 -->
        <transition name="attribute">
          <div v-if="into" class="hero-attribute1">
            <HeroAttribute
              class="attribute"
              attr="survival"
              :length="hero_info.survival"
            />
            <HeroAttribute
              class="attribute"
              attr="attack"
              :length="hero_info.attack"
            />
            <HeroAttribute
              class="attribute"
              attr="effect"
              :length="hero_info.effect"
            />
            <HeroAttribute
              class="attribute"
              attr="difficulty"
              :length="hero_info.difficulty"
            />
          </div>
        </transition>
      </div>
      <div class="basic-info__content__right">
        <!-- 关系 -->
        <transition name="relationship">
          <HeroRelationship v-if="into" ref="relationshipRef" />
        </transition>

        <!-- 属性 -->
        <transition name="attribute">
          <div v-if="into" class="hero-attribute2">
            <HeroAttribute
              class="attribute"
              attr="survival"
              :length="hero_info.survival"
            />
            <HeroAttribute
              class="attribute"
              attr="attack"
              :length="hero_info.attack"
            />
            <HeroAttribute
              class="attribute"
              attr="effect"
              :length="hero_info.effect"
            />
            <HeroAttribute
              class="attribute"
              attr="difficulty"
              :length="hero_info.difficulty"
            />
          </div>
        </transition>
      </div>
    </div>

    <!-- 向上滚动提示 -->
    <i v-show="show_down" ref="downRef" class="iconfont wzry-down"></i>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
