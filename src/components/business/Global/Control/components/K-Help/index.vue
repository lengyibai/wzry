<script setup lang="ts">
import { useHelp } from "./hooks/useHelp";

import { KDialog } from "@/components/business";
import { vScrollVirtualization } from "@/directives";
import { _setHighlight } from "@/utils/tool";

const { show, title, content } = useHelp();
</script>

<template>
  <teleport to="body">
    <KDialog
      v-if="show"
      v-model="show"
      width="57rem"
      z-index="var(--z-index-close-dialog)"
      :title="title"
    >
      <div v-scroll-virtualization class="content" v-html="_setHighlight(content)"></div>
    </KDialog>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
