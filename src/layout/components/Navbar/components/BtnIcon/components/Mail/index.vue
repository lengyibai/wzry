<script setup lang="ts">
import { ref } from "vue";

import MailDetail from "./components/MailDetail/index.vue";

import { KDialog } from "@/components/business";
import { KEmpty } from "@/components/business";
import { _getImgLink } from "@/utils/concise";
import { _getTimeAgo } from "@/utils/tool";
import { vScrollVirtualization } from "@/directives";
import { MailStore } from "@/store";

const $mailStore = MailStore();

/** 是否显示邮件详情 */
const show_detail = ref(false);
/** 当前查看的邮件 */
const mail = ref<Game.Mail>();

/* 查看邮件 */
const handleViewMail = (v: Game.Mail) => {
  mail.value = v;
  show_detail.value = true;
  $mailStore.setMailRead(v.id);
};
</script>

<template>
  <KDialog v-bind="$attrs" title="邮箱" ct-width="85%" ct-top="55%" width="50rem" :ratio="0.65">
    <div v-scroll-virtualization class="mail">
      <div
        v-for="(item, index) in $mailStore.mail_list"
        :key="index"
        class="mail-item"
        @click="handleViewMail(item)"
      >
        <div class="left">
          <img
            class="status"
            :src="_getImgLink(`${item.read ? 'mail_read' : 'mail_unread'}`, '1')"
            alt=""
          />
          <div class="title">{{ item.title }}</div>
        </div>
        <div class="time">{{ _getTimeAgo(item.time) }}</div>
      </div>
      <KEmpty v-if="$mailStore.mail_list.length === 0" tip="你还没有邮件" y="-1.25rem" />
    </div>
  </KDialog>

  <!-- 邮箱详情 -->
  <teleport to="body">
    <MailDetail v-if="show_detail" v-model="show_detail" :mail="mail!" />
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
