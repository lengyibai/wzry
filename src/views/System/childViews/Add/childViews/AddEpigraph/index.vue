<template>
  <div class="epigraph view-add">
    <transition name="fade">
      <div class="content" ref="content" v-if="show">
        <transition-group name="fade"></transition-group>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="lib-commit-btn" size="50px" @commit="commit" :finish="finish" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="lib-cancel-btn" size="50px" @close="close" title="取消" />
  </div>
</template>
<script setup lang="ts">
import viewHide from "../../../../hooks/useViewHide";
import switchStore from "@/store/globalSwitch";

const $store = switchStore();

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const { show, finish, close } = viewHide(emit, "add_epigraph");

/* 延迟显示页面 */
setTimeout(async () => {
  $store.$loading.show("正在加载");
  await $store.$loading.close();
  show.value = true;
}, 1000);

/* 提交表单 */
const commit = () => {
  setTimeout(() => {
    finish.value = true;
    setTimeout(() => {
      close();
    }, 250);
  }, 250);
};
</script>
