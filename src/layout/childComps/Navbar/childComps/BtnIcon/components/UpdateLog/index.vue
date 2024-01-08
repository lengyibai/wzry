<script setup lang="ts">
import { computed } from "vue";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import KDialog from "@/components/business/Parts/K-Dialog/index.vue";
import { VersionStore } from "@/store";
import { vMouseTip } from "@/directives";

const $versionStore = VersionStore();

/** 数据需要更新 */
const data_status = computed(() => $versionStore.data_status);
/** 文件需要更新 */
const dist_status = computed(() => $versionStore.dist_status);
/** 日志 */
const update_log = computed(() => $versionStore.update_log);

/* 更新并重启 */
const handleReset = () => {
  $versionStore.updateAll();
};

/* 关闭弹窗 */
const handleClose = () => {
  $versionStore.setShowLog(false);
};
</script>

<template>
  <KDialog
    :show-close="!data_status && !dist_status"
    v-bind="$attrs"
    width="56.25rem"
    header="更新日志"
    :desc="update_log.time"
    @close="handleClose"
  >
    <div class="main">
      <!-- 页面更新 -->
      <h1>页面层</h1>
      <div class="content">
        <h2>一、新增特性</h2>
        <template v-if="update_log.distLog.surface.new.length">
          <p v-for="(item, index) in update_log.distLog.surface.new" :key="index">
            {{ index + 1 }}、{{ item }}
          </p>
        </template>
        <p v-else>暂无</p>

        <h2>二、功能优化</h2>
        <template v-if="update_log.distLog.surface.function.length">
          <p v-for="(item, index) in update_log.distLog.surface.function" :key="index">
            {{ index + 1 }}、{{ item }}
          </p>
        </template>
        <p v-else>暂无</p>

        <h2>三、样式优化</h2>
        <template v-if="update_log.distLog.surface.style.length">
          <p v-for="(item, index) in update_log.distLog.surface.style" :key="index">
            {{ index + 1 }}、{{ item }}
          </p>
        </template>
        <p v-else>暂无</p>

        <h2>四、BUG修复</h2>
        <template v-if="update_log.distLog.surface.bug.length">
          <p v-for="(item, index) in update_log.distLog.surface.bug" :key="index">
            {{ index + 1 }}、{{ item }}
          </p>
        </template>
        <p v-else>暂无</p>
      </div>

      <!-- 页面更新 -->
      <h1>代码层</h1>

      <div class="content">
        <template v-if="update_log.distLog.substrate.length">
          <p v-for="(item, index) in update_log.distLog.substrate" :key="index">
            {{ index + 1 }}、{{ item }}
          </p>
        </template>
        <p v-else>暂无</p>
      </div>

      <!-- 数据更新 -->
      <h1>数据更新</h1>
      <div class="content">
        <template v-if="update_log.dataLog.length">
          <p v-for="(item, index) in update_log.dataLog" :key="index">《{{ item }}》</p>
        </template>
        <p v-else>暂无</p>
      </div>

      <!-- 语音更新 -->
      <h1>语音更新</h1>
      <div class="content">
        <template v-if="update_log.voiceLog.length">
          <p v-for="(item, index) in update_log.voiceLog" :key="index">《{{ item }}》</p>
        </template>
        <p v-else>暂无</p>
      </div>
    </div>

    <!-- 重启 -->
    <KButton v-if="data_status || dist_status" v-mouse-tip type="warning" @click="handleReset">
      更新并重启
    </KButton>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
