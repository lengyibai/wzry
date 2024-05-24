<script setup lang="ts">
import { ref } from "vue";

import { useSelectAvatar } from "./hooks/useSelectAvatar";

import { KDialog } from "@/components/business";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { _getHeroAvatarLink } from "@/utils/concise";
import { _blobTextToBase64 } from "@/utils/tool";

const { show, confirmCallback } = useSelectAvatar();

const dialogRef = ref<InstanceType<typeof KDialog>>();

/** @description 选择的头像 */
const handleSelectAvatar = async (blob: string) => {
  const base64 = await _blobTextToBase64(blob);
  confirmCallback.value?.(base64);
  dialogRef.value?._close();
};
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      ref="dialogRef"
      v-model="show"
      width="70rem"
      :ratio="0.6"
      z-index="var(--z-index-close-dialog)"
      title="选择头像"
    >
      <div class="k-select-avatar">
        <div v-scroll-virtualization class="avatar-list">
          <img
            v-for="(item, index) in 13"
            :key="index"
            v-mouse-tip
            alt=""
            class="avatar"
            :src="_getHeroAvatarLink(`avatar_${item}`)"
            @click="handleSelectAvatar(_getHeroAvatarLink(`avatar_${item}`))"
          />
        </div>
      </div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
