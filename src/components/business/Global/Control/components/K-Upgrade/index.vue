<script setup lang="ts">
import { computed, ref } from "vue";

import SelectHero from "./components/SelectHero/index.vue";
import ToUpgrade from "./components/ToUpgrade/index.vue";
import type { HeroUpgradeInfo } from "./interface";
import { useUpgrade } from "./hook/useUpgrade";

import { KDialog } from "@/components/business";

const { show, prop_type } = useUpgrade();

/** 是否显示升级组件 */
const show_upgrade = ref(false);
/** 处于升级状态的英雄信息 */
const hero_upgrade_info = ref();

/** 弹窗标题 */
const title = computed(() => (show_upgrade.value ? "升级英雄" : "选择英雄进行升级"));

/* 选择的英雄 */
const onSelectHero = (hero: HeroUpgradeInfo) => {
  show_upgrade.value = true;
  hero_upgrade_info.value = hero;
};

/* 关闭弹窗 */
const onClose = () => {
  show_upgrade.value = false;
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      :ratio="0.65"
      width="70rem"
      z-index="var(--z-index-input-dialog)"
      audio
      show-close
      :title="title"
      @close="onClose"
    >
      <div class="k-upgrade">
        <SelectHero v-if="!show_upgrade" @change="onSelectHero" />
        <ToUpgrade
          v-else
          :prop-type="prop_type"
          :hero="hero_upgrade_info"
          @back="show_upgrade = false"
        />
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
