<script setup lang="ts">
import type { HeroSkinOptionalInfo, OptionalMode } from "../../../../interface";

import { KLoadingRadiate } from "@/components/business";

interface Props {
  /** 数据 */
  data: HeroSkinOptionalInfo;
  /** 选中的ID */
  activeId: number;
  /** 当前模式 */
  mode: OptionalMode;
  /** 模式皮肤键名 */
  skinKeys: string[];
}

defineProps<Props>();
</script>

<template>
  <div class="hero-skin-card">
    <!-- 选中圆圈 -->
    <transition name="fade">
      <div v-show="activeId === data.id" class="round"></div>
    </transition>
    <div class="head-box">
      <KLoadingRadiate :link="data.avatar" width="5.5rem" height="5.5rem" />
      <div v-if="skinKeys.includes(mode)" class="hero-name" v-html="data.hero_name"></div>
    </div>
    <div v-if="skinKeys.includes(mode)" class="skin-name" v-html="data.skin_name"></div>
    <div v-if="mode === 'HERO'" class="skin-name" v-html="data.hero_name"></div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
