<script setup lang="ts">
import SelectHeroSkin from "./components/SelectHeroSkin/index.vue";
import { useOptional } from "./hooks/useOptional";

import { KDialog } from "@/components/business";

const { mode, show, closeOptional } = useOptional();
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      :ratio="0.7"
      width="60rem"
      z-index="var(--z-index-input-dialog)"
      audio
      up
      show-close
      :title="`选择一个${mode === 'HERO' ? '英雄' : '皮肤'}并领取`"
    >
      <div class="k-optional">
        <SelectHeroSkin :mode="mode" @close="closeOptional" />
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
