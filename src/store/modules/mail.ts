import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";

import { _getPropLink } from "@/utils/concise";
import { _retryRequest, dayjs } from "@/utils/tool";
import { $message, $obtain, $tip } from "@/utils/busTransfer";
import { $msgTipText, CUSTOM_TIP, GAME_PROP } from "@/config";
import { API_DATA } from "@/api";
import type { MailStoreType } from "@/store/interface";

/** @description 邮件相关 */
const MailStore = defineStore("mail", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 远程邮件配置 */
    mail_config: ref<Global.Mail[]>([]),
    /** 邮箱列表 */
    mail_list: ref<Game.Mail[]>([]),
    /** 由于签到邮件每日发放，需要单独处理 */
    sign_mails: ref<Game.Mail[]>([]),
    /** 邮件标记，不再推送的活动 */
    mail_mark: ref<string[]>([]),
  };
  const { mail_config, mail_list, mail_mark, sign_mails } = ExposeData;

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
      await _retryRequest({
        promiseFn: API_DATA.Mail,
      })
        .then((res) => {
          mail_config.value = res.data;
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: "公共邮件" }), "error");
        });
    },

    /** @description 读取邮箱配置 */
    readMailConfig() {
      //循环处理判断邮箱列表
      mail_config.value.forEach((item) => {
        const { mark, title, type, key, desc, props } = item;

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

        //单独处理新手大礼包
        if (key === "NEW" && !mail_mark.value.includes(mark)) {
          $tip({
            text: CUSTOM_TIP.yn35,
            align: "right-bottom",
            btnText: "领取",
            btnFn() {
              const obtain = item.props!.map(({ num, key }) => {
                return {
                  name: GAME_PROP.NAME[key],
                  num: num,
                  key: key,
                  icon: _getPropLink(GAME_PROP.ICON[key]),
                };
              });

              $obtain(obtain);
              saveMailData();
              mail_mark.value.push(mark);
            },
          });
          return;
        }
      });

      saveMailData();
    },

    /** @description 签到福袋 */
    async sign() {
      sign_mails.value = [];

      //签到之前需要读取远程签到配置
      this.readMailConfig();
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
      mail_list.value[index].read = true;

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
