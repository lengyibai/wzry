import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";

import { API_DATA } from "@/api";
import { MailStoreType } from "@/store/interface";
import { _retryRequest, dayjs } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { $msgTipText } from "@/config";

/** @description 邮件相关 */
const MailStore = defineStore("mail", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 邮箱列表 */
    mail_list: ref<Game.Mail[]>([]),
    /** 由于签到邮件每日发放，需要单独处理 */
    sign_mails: ref<Game.Mail[]>([]),
    /** 邮件标记，不再推送的活动 */
    mail_mark: ref<string[]>([]),
  };
  const { mail_list, mail_mark, sign_mails } = ExposeData;

  const ExposeComputed = {
    /** 是否存在未读消息 */
    haveUnread: computed(() => {
      return mail_list.value.some((item) => !item.read);
    }),
  };

  /** @description 保存邮箱数据 */
  const saveMailData = () => {
    $authStore.updateUserData({
      mail: mail_list.value,
      mallMark: mail_mark.value,
    });
  };

  const ExposeMethods = {
    /** @description 使用用户邮箱数据
     * @param v 邮箱数据
     */
    useUserMail(mails: User.Data["mail"], marks: User.Data["mallMark"]) {
      mail_list.value = mails;
      mail_mark.value = marks;
    },

    /** @description 请求公共邮件 */
    async getAllMail() {
      //请求公共邮件
      await _retryRequest({
        promiseFn: API_DATA.Mail,
      })
        .then((res) => {
          //循环处理判断邮箱列表
          res.data.forEach((item) => {
            const { mark, title, type, key, desc, userIds, props, sendTime } = item;

            //签到类型邮件单独处理
            if (key === "SIGN") {
              sign_mails.value.push({
                ...item,
                id: `${type}_${key}_${title}_${dayjs().valueOf().toString()}`,
                read: false,
                time: dayjs().valueOf(),
                desc,
                key,
                props,
                title,
                type,
              });

              return;
            }

            const mail = {
              id: `${type}_${key}_${title}_${dayjs().valueOf().toString()}`,
              read: false,
              time: dayjs().valueOf(),
              desc,
              key,
              mark,
              props,
              title,
              type,
            };

            //是否在推送名单内
            if (userIds && userIds.length && !userIds.includes($authStore.user_data.id)) return;

            //是否已经领取或参与过
            if (mail_mark.value.includes(mark)) return;

            //是否已收到推送
            if (mail_list.value.some((item) => item.mark === mark)) {
              const v = mail_list.value.find((item) => item.mark === mark);

              //如果邮件存在临时更新，则替换邮件内容，仅在未读状态能成功替换
              if (v!.time < sendTime) {
                const index = mail_list.value.findIndex((item) => item.mark === mark);
                mail_list.value[index] = mail;
              }

              return;
            }

            mail_list.value.unshift(mail);
          });

          saveMailData();
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: "公共邮件" }), "error");
        });
    },

    /** @description 签到福袋 */
    async sign() {
      sign_mails.value = [];

      //签到之前需要读取远程签到配置
      await this.getAllMail();
      sign_mails.value.forEach((item) => {
        const { key, type, title } = item;
        mail_list.value.unshift({
          ...item,
          id: `${type}_${key}_${title}_${dayjs().valueOf().toString()}`,
          time: dayjs().valueOf(),
        });
      });

      saveMailData();
    },

    /** @description 推送领取道具邮件
     * @param mail 邮件数据
     */
    sendGiftMail(mail: MailStoreType.GiftMail) {
      const { title, desc, props } = mail;

      mail_list.value.unshift({
        key: "DEFAULT",
        title,
        desc,
        props,
        time: dayjs().valueOf(),
        type: "GIFT",
        id: `GIFT_DEFAULT_${title}_${dayjs().valueOf().toString()}`,
        read: false,
      });

      saveMailData();
    },

    /** @description 推送消息邮件
     * @param mail 邮件数据
     */
    sendMsgMail(mail: MailStoreType.MsgMail) {
      const { title, desc } = mail;

      mail_list.value.unshift({
        key: "DEFAULT",
        title,
        desc,
        time: dayjs().valueOf(),
        type: "MSG",
        id: `MSG_DEFAULT_${title}_${dayjs().valueOf().toString()}`,
        read: false,
      });

      saveMailData();
    },

    /** @description 设置已读
     * @param id 邮件id
     */
    setMailRead(id: string) {
      const index = mail_list.value.findIndex((item) => item.id === id);
      const mark = mail_list.value[index].mark;
      mail_list.value[index].read = true;
      mark && mail_mark.value.push(mark);

      saveMailData();
    },

    /** @description 一键领取时删除可领取的邮件 */
    delGiftMail() {
      mail_list.value = mail_list.value.filter((item) => {
        if (item.type !== "GIFT") {
          return true;
        }
        item.mark && mail_mark.value.push(item.mark);
      });
      saveMailData();
    },

    /** @description 删除邮件
     * @param id 邮件id
     */
    delMail(id: string) {
      const index = mail_list.value.findIndex((item) => item.id === id);
      mail_list.value.splice(index, 1);
      saveMailData();
    },

    /** @description 清空邮箱列表 */
    clearMail() {
      mail_list.value = [];
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { MailStore };
