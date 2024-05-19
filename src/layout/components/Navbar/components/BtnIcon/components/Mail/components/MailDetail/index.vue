<script setup lang="ts">
import { ref } from "vue";

import { KButton, KDialog, KProp } from "@/components/business";
import { GAME_PROP } from "@/config";
import { MailStore } from "@/store";
import { $obtain } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";
import { vOverflowCenter } from "@/directives";

interface Props {
  /** 邮件信息 */
  mail: Game.Mail;
}
defineProps<Props>();

const $mailStore = MailStore();

const KDialogRef = ref<InstanceType<typeof KDialog>>();

/** @description 确定 */
const handleConfirm = (id: string) => {
  KDialogRef.value?._close();
  $mailStore.delMail(id);
};

/** @description 领取奖励 */
const handleReceive = (main: Game.Mail) => {
  const obtain = main.props!.map(({ num, key }) => {
    return {
      name: GAME_PROP.NAME[key],
      num: num,
      key: key,
      icon: _getPropLink(GAME_PROP.ICON[key]),
    };
  });

  $obtain(obtain);

  KDialogRef.value?._close();
  $mailStore.delMail(main.id);
};
</script>

<template>
  <KDialog ref="KDialogRef" title="邮件详情" width="57.5rem" up :ratio="0.65">
    <div class="mail-detail">
      <div class="title">
        <div class="label">标题</div>
        <div class="value">{{ mail.title }}</div>
      </div>

      <div class="content">
        <div class="label">内容</div>
        <div class="value">{{ mail.desc }}</div>
      </div>

      <div class="reward">
        <div v-overflow-center class="prop-list">
          <KProp
            v-for="(item, index) in mail.props"
            :key="index"
            :prop-key="item.key"
            :num="item.num"
          />
        </div>

        <KButton
          v-if="mail.type === 'GIFT'"
          type="warning"
          class="k-button"
          @click="handleReceive(mail)"
        >
          领取
        </KButton>
        <KButton v-else class="k-button" @click="handleConfirm(mail.id)">删除</KButton>
      </div>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>