<script setup lang="ts">
import { useObtain } from "./hooks/useObtain";

import { KButton } from "@/components/business";
import { vMaskGradient, vMouseTip, vParticleEffect, vScrollVirtualization } from "@/directives";

const { show, prop_list, show_bg, closeObtain } = useObtain();
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="show && prop_list"
        v-mask-gradient="{
          color: 'rgba(40, 100, 195, 0.5)',
          start: '0%',
          end: '25%',
        }"
        class="k-obtain"
      >
        <div class="title" data-text="恭喜你获得">恭喜你获得</div>
        <div
          v-particle-effect="{
            size: 6,
            speed: 2000,
            count: 30,
          }"
          class="content"
          :class="{
            hide: !show_bg,
          }"
        >
          <div
            v-scroll-virtualization="prop_list.length > 1"
            class="article-list"
            :class="{
              alone: prop_list.length === 1,
            }"
          >
            <div v-for="(item, index) in prop_list" :key="index" class="box">
              <!-- 散射元素 -->
              <div v-if="show_bg && prop_list.length === 1" class="shine">
                <span v-for="(item, index) in 16" :key="index" :style="'--i: ' + item"></span>
              </div>

              <!-- 图标元素 -->
              <div class="icon-box">
                <img :src="item.icon" alt="" class="icon" />
                <div v-if="item.num" class="num" :data-text="item.num">
                  {{ item.num }}
                </div>
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <KButton v-mouse-tip class="k-button" @click="closeObtain">确定</KButton>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
