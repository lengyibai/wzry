<script setup lang="ts">
import { ref, onMounted } from "vue";

import versionStore from "@/store/version";

const $versionStore = versionStore();

const show_setting = ref(false); //显示/隐藏设置弹窗
const show_update = ref(false); //显示/隐藏日志弹窗

onMounted(() => {
  setTimeout(() => {
    show_update.value = true;
  }, 3000);
});

/* 控制日志弹窗显示 */
const EmitUpdateLog = (v: boolean) => {
  $versionStore.setShowLog(v);
};
</script>

<template>
  <div class="btn-icon">
    <!-- 按钮 -->
    <i class="iconfont wzry-setting cursor-pointer" title="设置" @click="show_setting = true" />
    <i class="iconfont wzry-gengxinrizhi cursor-pointer" title="更新日志" @click="EmitUpdateLog(true)" />

    <!-- 设置弹窗 -->
    <transition name="fade">
      <SettingDialog v-if="show_setting" v-model="show_setting" @close="show_setting = false" />
    </transition>

    <!-- 更新日志 -->
    <transition name="fade">
      <UpdateLog v-if="$versionStore.show_update && show_update" @close="EmitUpdateLog" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
