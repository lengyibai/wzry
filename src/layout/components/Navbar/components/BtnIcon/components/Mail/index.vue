<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import MailDetail from "./components/MailDetail/index.vue";

import { KButton, KDialog } from "@/components/business";
import { KEmpty } from "@/components/business";
import { _getMiscLink, _getPropLink } from "@/utils/concise";
import { _getTimeAgo } from "@/utils/tool";
import { vMouseTip, vScrollVirtualization } from "@/directives";
import { MailStore } from "@/store";
import { useRadialBorder } from "@/hooks";
import { $obtain } from "@/utils/busTransfer";
import { GAME_PROP, MOUSE_TIP } from "@/config";
import type { ObtainInfo } from "@/components/business/Global/Control/components/K-Obtain/interface";

const $mailStore = MailStore();
const { mail_list } = storeToRefs($mailStore);

const mailCardRefs = ref<HTMLElement[]>();
const KDialogRef = ref<InstanceType<typeof KDialog>>();

/** 是否显示邮件详情 */
const show_detail = ref(false);
/** 当前查看的邮件 */
const mail = ref<Game.Mail>();

const { enableRadialBorder, disableRadialBorder } = useRadialBorder(mailCardRefs);

/* 查看邮件 */
const handleViewMail = (v: Game.Mail) => {
  mail.value = v;
  show_detail.value = true;
  $mailStore.setMailRead(v.id);
};

/* 一键领取 */
const handleReceiveAll = () => {
  //合并奖品数量
  const rewards: Partial<Record<Game.PropKey, number>> = {};

  mail_list.value.forEach((item) => {
    item.props?.forEach(({ key, num }) => {
      rewards[key] ??= 0;
      rewards[key]! += num || 1;
    });
  });

  //格式化奖品数据
  const obtain: ObtainInfo[] = [];
  for (const k in rewards) {
    const key = k as Game.PropKey;

    obtain.push({
      name: GAME_PROP.NAME[key],
      key,
      num: rewards[key],
      icon: _getPropLink(GAME_PROP.ICON[key]),
    });
  }

  $obtain(obtain);
  $mailStore.delGiftMail();
};
</script>

<template>
  <KDialog v-bind="$attrs" ref="KDialogRef" title="邮箱" width="50rem" :ratio="0.75">
    <div class="mail">
      <div
        v-scroll-virtualization
        class="mail-list"
        @mouseenter="enableRadialBorder"
        @mouseleave="disableRadialBorder"
      >
        <div
          v-for="(item, index) in mail_list"
          :key="index"
          ref="mailCardRefs"
          v-mouse-tip
          class="mail-item"
          @click="handleViewMail(item)"
        >
          <div class="left">
            <img
              v-if="item.type === 'GIFT'"
              class="status"
              :src="_getMiscLink(`${item.read ? 'mail_gift_read' : 'mail_gift_unread'}`)"
              alt=""
            />
            <img
              v-if="item.type === 'MSG'"
              class="status"
              :src="_getMiscLink(`${item.read ? 'mail_msg_read' : 'mail_msg_unread'}`)"
              alt=""
            />
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="time">{{ _getTimeAgo(item.time) }}</div>
        </div>
        <KEmpty v-if="mail_list.length === 0" tip="你还没有邮件" y="-1.25rem" />
      </div>

      <KButton
        v-if="mail_list.some((item) => item.type === 'GIFT')"
        v-mouse-tip="{
          text: MOUSE_TIP.q1s7,
        }"
        type="warning"
        @click="handleReceiveAll"
      >
        一键领取
      </KButton>
    </div>
  </KDialog>

  <!-- 邮箱详情 -->
  <MailDetail v-if="show_detail" v-model="show_detail" :mail="mail!" />
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
