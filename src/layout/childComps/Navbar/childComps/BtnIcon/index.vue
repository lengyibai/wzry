<script setup lang="ts">
import { ref, onMounted } from "vue";

import SettingDialog from "./components/SettingDialog/index.vue";
import UpdateLog from "./components/UpdateLog/index.vue";
import Todo from "./components/Todo/index.vue";

import { VersionStore } from "@/store";
import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";

const $versionStore = VersionStore();

/** 是否显示设置弹窗 */
const show_setting = ref(false);
/** 是否显示日志弹窗 */
const show_update = ref(false);
/** 是否显示任务清单 */
const show_todo = ref(false);

onMounted(() => {
  setTimeout(() => {
    show_update.value = true;
  }, 3000);
});
</script>

<template>
  <div class="btn-icon">
    <!-- 按钮 -->
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.er37,
      }"
      class="iconfont wzry-setting"
      @click="show_setting = true"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.g9u9,
      }"
      class="iconfont wzry-gengxinrizhi"
      @click="$versionStore.setShowLog(true)"
    />
    <i
      v-mouse-tip="{
        text: MOUSE_TIP.g9x6,
      }"
      class="iconfont wzry-todo"
      @click="show_todo = true"
    />

    <!-- 设置弹窗 -->
    <teleport to="body">
      <SettingDialog v-if="show_setting" v-model="show_setting" />
    </teleport>

    <!-- 任务清单 -->
    <teleport to="body">
      <Todo v-if="show_todo" v-model="show_todo" />
    </teleport>

    <!-- 更新日志 -->
    <teleport to="body">
      <UpdateLog v-if="$versionStore.show_update && show_update" />
    </teleport>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
