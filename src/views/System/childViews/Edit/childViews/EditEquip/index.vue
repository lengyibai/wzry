<!-- 添加铭文 -->
<template>
  <div class="Equip view-add">
    <transition name="fade">
      <div v-if="show" ref="content" class="content">
        <transition-group name="fade"></transition-group>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn
      class="lib-commit-btn"
      size="50px"
      :finish="finish"
      title="发布"
      @commit="commit"
    />

    <!-- 取消发布 -->
    <LibCancelBtn
      class="lib-cancel-btn"
      size="50px"
      title="取消"
      @close="close"
    />
  </div>
</template>
<script setup lang="ts">
import viewHide from "../../../../hooks/useViewHide";

import switchStore from "@/store/switch";

const emit = defineEmits(["update:modelValue"]);
const { show, finish, close } = viewHide(emit, "");

const $store = switchStore();
setTimeout(async () => {
  $store.$loading.show("正在加载");
  $store.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

const commit = () => {
  setTimeout(() => {
    finish.value = true;
    setTimeout(() => {
      close();
    }, 250);
  }, 250);
};
</script>
