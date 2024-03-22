<script setup lang="ts">
import { ref } from "vue";

import { KButton, KDialog } from "@/components/business";
import { GAME_PROP } from "@/config";
import { KnapsackStore, MailStore } from "@/store";
import { $obtain } from "@/utils/busTransfer";

interface Props {
  /** 邮件信息 */
  mail: Game.Mail;
}
defineProps<Props>();

const $knapsack = KnapsackStore();
const $mailStore = MailStore();

const KDialogRef = ref<InstanceType<typeof KDialog>>();

/* 领取奖励 */
const handleReceive = (main: Game.Mail) => {
  const obtain = main.props.map((item) => {
    const prop = GAME_PROP[item.key];

    $knapsack.setGamePropNum(item.key, item.num, "ADD");
    return {
      /** 图标 */
      icon: prop.icon,
      /** 名称 */
      name: prop.label,
      /** 数量 */
      num: item.num,
    };
  });

  $obtain(obtain);

  KDialogRef.value?._close();
  $mailStore.delMail(main.id);
};
</script>

<template>
  <KDialog
    ref="KDialogRef"
    title="邮件详情"
    ct-width="85%"
    ct-top="57%"
    width="57.5rem"
    up
    :ratio="0.65"
    ct-height="78%"
  >
    <div class="mail-detail">
      <div class="title">
        <div class="label">标题</div>
        <div class="value">{{ mail.title }}</div>
      </div>

      <div class="content">
        <div class="label">内容</div>
        <div v-if="mail.key === 'ISSUE'" class="value">
          <p>你的以下反馈被采纳：</p>
          <p
            v-for="(item, index) in mail.issue"
            :key="index"
            :class="[item.type === 'BUG' ? 'bug' : 'idea']"
          >
            {{ item.desc }}
          </p>
          <p>期待你更多的反馈！</p>
        </div>
        <div v-else class="value">{{ mail.desc }}</div>
      </div>

      <div class="prop">
        <div class="prop-list">
          <div v-for="(item, index) in mail.props" :key="index" class="prop-item">
            <div class="icon-box">
              <img :src="GAME_PROP[item.key].icon" alt="" class="icon" />
              <div class="num" :data-text="item.num">{{ item.num }}</div>
            </div>

            <div class="name">{{ GAME_PROP[item.key].label }}</div>
          </div>
        </div>

        <KButton type="warning" class="k-button" @click="handleReceive(mail)">领取</KButton>
      </div>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
