<script setup lang="ts">
import { computed, ref } from "vue";

import KButton from "@/components/business/Parts/K-Button/index.vue";
import KDialog from "@/components/business/Parts/K-Dialog/index.vue";
import { VersionStore } from "@/store";
import { vMouseTip, vScrollVirtualization } from "@/directives";

const $emit = defineEmits<{
  close: [];
}>();

const $versionStore = VersionStore();

const kDialogRef = ref<InstanceType<typeof KDialog>>();

/** 数据需要更新 */
const data_status = computed(() => $versionStore.data_status);
/** 文件需要更新 */
const dist_status = computed(() => $versionStore.dist_status);
/** 日志 */
const update_log = computed(() => $versionStore.update_log);

/* 更新并重启 */
const handleReset = () => {
  $versionStore.updateAll(true);
};

/** @description 确定 */
const handleConfirm = () => {
  $versionStore.updateAll();
  kDialogRef.value?._close();
};

/* 关闭弹窗 */
const onClose = () => {
  $versionStore.setShowLog(false);
  $emit("close");
};
</script>

<template>
  <KDialog
    ref="kDialogRef"
    :show-close="!data_status && !dist_status"
    v-bind="$attrs"
    width="57.5rem"
    header="更新日志"
    :desc="update_log.time"
    @close="onClose"
  >
    <div class="update-log">
      <div v-scroll-virtualization class="main">
        <h1>一、新增特性</h1>
        <template v-if="update_log.updateLog.new.length">
          <div class="log-list">
            <div v-for="(item, index) in update_log.updateLog.new" :key="index" class="log-item">
              <div class="time">·{{ item.time }}</div>
              <p v-for="(log, index) in item.log" :key="index" class="text">
                {{ index + 1 }}、{{ log }}
              </p>
            </div>
          </div>
        </template>
        <p v-else class="empty">暂无</p>

        <h1>二、功能优化</h1>
        <template v-if="update_log.updateLog.function.length">
          <div class="log-list">
            <div
              v-for="(item, index) in update_log.updateLog.function"
              :key="index"
              class="log-item"
            >
              <div class="time">·{{ item.time }}</div>
              <p v-for="(log, index) in item.log" :key="index" class="text">
                {{ index + 1 }}、{{ log }}
              </p>
            </div>
          </div>
        </template>
        <p v-else class="empty">暂无</p>

        <h1>三、样式优化</h1>
        <template v-if="update_log.updateLog.style.length">
          <div class="log-list">
            <div v-for="(item, index) in update_log.updateLog.style" :key="index" class="log-item">
              <div class="time">·{{ item.time }}</div>
              <p v-for="(log, index) in item.log" :key="index" class="text">
                {{ index + 1 }}、{{ log }}
              </p>
            </div>
          </div>
        </template>
        <p v-else class="empty">暂无</p>

        <h1>四、BUG修复</h1>
        <template v-if="update_log.updateLog.bug.length">
          <div class="log-list">
            <div v-for="(item, index) in update_log.updateLog.bug" :key="index" class="log-item">
              <div class="time">·{{ item.time }}</div>
              <p v-for="(log, index) in item.log" :key="index" class="text">
                {{ index + 1 }}、{{ log }}
              </p>
            </div>
          </div>
        </template>
        <p v-else class="empty">暂无</p>
      </div>

      <!-- 重启 -->
      <KButton v-if="dist_status" v-mouse-tip type="warning" @click="handleReset">
        更新并重启
      </KButton>
      <KButton v-else-if="data_status" v-mouse-tip @click="handleConfirm">确定</KButton>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
