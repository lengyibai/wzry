<script setup lang="ts">
import { ref } from "vue";

import { KButton, KDialog, KProp } from "@/components/business";
import { CONFIRM_TIP, GAME_PROP } from "@/config";
import { MailStore } from "@/store";
import { $confirm, $obtain } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";
import { vMouseTip, vOverflowCenter } from "@/directives";
import { usePlayAudio } from "@/hooks";

interface Props {
  /** 邮件信息 */
  mail: Game.Mail;
}
defineProps<Props>();

const $mailStore = MailStore();

const { playAudio } = usePlayAudio();

const KDialogRef = ref<InstanceType<typeof KDialog>>();

/** @description 删除 */
const handleDelete = (id: string) => {
  $confirm({
    text: CONFIRM_TIP.vj93,
    async confirm() {
      KDialogRef.value?._close();
      $mailStore.delMail(id);
      playAudio("kh79");
    },
  });
};

/** @description 领取奖励 */
const handleReceive = (mail: Game.Mail) => {
  const obtain = mail.props!.map(({ num, key }) => {
    return {
      name: GAME_PROP.NAME[key],
      num: num,
      key: key,
      icon: _getPropLink(GAME_PROP.ICON[key]),
    };
  });

  $obtain(obtain);

  KDialogRef.value?._close();
  $mailStore.delMail(mail.id);
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
          v-mouse-tip
          type="warning"
          class="k-button"
          @click="handleReceive(mail)"
        >
          领取
        </KButton>
        <KButton v-else type="error" class="k-button" @click="handleDelete(mail.id)">删除</KButton>
      </div>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
