<script setup lang="ts">
import useTip from "./hooks/useTip"; //小贴士

import { Store } from "@/store";
import { Util } from "@/utils";

const $controlStore = Store.control();
const $audioStoreStore = Store.audio();

const { show_tip, title, btn_text, content, align, noTipName, btn, btnFn, tip } = useTip();

Util.$Bus.on("tip", (data) => {
  tip(data);
});

/* 挂载全局 */
$controlStore.setAudioStore($audioStoreStore.play);

/* 全局监听事件 */
window.addEventListener("resize", (e) => {
  Util.$Bus.emit("resize", e);
});
window.addEventListener("mousemove", (e) => {
  Util.$Bus.emit("mousemove", e);
});
window.addEventListener("mouseup", (e) => {
  Util.$Bus.emit("mouseup", e);
});
</script>

<template>
  <div class="GlobalSwitch">
    <!-- loading -->
    <K-Loading />

    <!-- 消息提醒 -->
    <K-Message />

    <!-- NPC -->
    <transition name="fade">
      <K-Tip
        v-if="show_tip"
        v-model="show_tip"
        v-model:btn="btn"
        :text="content"
        :align="align"
        :no-tip-name="noTipName"
        :title="title"
        :btn-text="btn_text"
        :btn-fn="btnFn"
      />
    </transition>
  </div>
</template>
