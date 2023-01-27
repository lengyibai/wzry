<script setup lang="ts">
import { ref } from "vue";

const show_setting = ref(false); //显示/隐藏设置弹窗
</script>

<template>
  <div class="btn-icon">
    <!-- 按钮 -->
    <i class="iconfont wzry-setting cursor-pointer" title="设置" @click="show_setting = true" />
    <i class="iconfont wzry-gengxinrizhi cursor-pointer" title="更新日志" />

    <!-- 设置弹窗 -->
    <transition name="fade">
      <SettingDialog v-if="show_setting" v-model="show_setting" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
