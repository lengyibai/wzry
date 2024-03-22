import { defineStore } from "pinia";
import { computed, ref } from "vue";
import dayjs from "dayjs";

import { AuthStore } from "./auth";

import { API_DATA } from "@/api";
import { MailStoreType } from "@/store/interface";
import { useUserConfigFinish } from "@/hooks/modules/useUserConfigFinish";
import { _retryRequest } from "@/utils/tool";
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
  };
  const { mail_list, sign_mails } = ExposeData;

  const ExposeComputed = {
    /** 是否存在未读消息 */
    haveUnread: computed(() => {
      return mail_list.value.some((item) => !item.read);
    }),
  };

  /* 保存邮箱数据 */
  const saveMailList = () => {
    $authStore.updateUserData({
      mail: mail_list.value,
    });
  };

  const ExposeMethods = {
    /** @description 使用用户邮箱数据 */
    useUserMail(v: Global.UserData["mail"]) {
      mail_list.value = v;
    },

    /** @description 请求公共及私人邮件 */
    async getAllMail() {
      /* 请求公共邮件 */
      await _retryRequest({
        promiseFn: API_DATA.Mail,
      })
        .then((res) => {
          //循环处理判断邮箱列表
          res.data.forEach((item) => {
            const { mark, title, type, key, desc, userIds, props, sendTime: time } = item;

            //签到类型邮件单独处理
            if (key === "SIGN") {
              sign_mails.value.push({
                ...item,
                title,
                desc,
                time: 0,
                props,
                type: "GIFT",
                key: "SIGN",
                id: "",
                read: false,
              });

              return;
            }

            //是否在推送名单内
            if (userIds && !userIds.includes($authStore.user_data.id)) return;

            //是否已经领取或参与过
            if ($authStore.user_data.mallMark.includes(mark)) return;

            //是否已收到推送
            if ($authStore.user_data.mail.some((item) => item.mark === mark)) return;

            mail_list.value.push({
              id: `${type}_${key}_${dayjs().unix().toString()}`,
              mark,
              key,
              type,
              title,
              desc,
              time,
              props,
              read: false,
            });
          });

          saveMailList();
        })
        .catch(() => {
          $message($msgTipText("rc53", { v: "公共邮件" }));
        });

      /* 请求私人邮件 */
      useUserConfigFinish.readPromise.then(() => {
        _retryRequest({
          promiseFn: API_DATA.UserMail,
          params: $authStore.user_data.id,
        })
          .then((res) => {
            //循环处理判断邮箱列表
            res.data.forEach((item) => {
              const { mark, key, type, title, desc, issue, props, sendTime: time } = item;

              const mail = {
                id: `${type}_${key}_${dayjs().unix().toString()}`,
                mark,
                key,
                type,
                title,
                desc,
                issue,
                time,
                props,
                read: false,
              };

              //是否已经领取或参与过
              if ($authStore.user_data.mallMark.includes(mark)) return;

              //是否已收到推送
              if ($authStore.user_data.mail.some((item) => item.mark === mark)) {
                const v = $authStore.user_data.mail.find((item) => item.mark === mark);

                //如果邮件存在临时更新，则替换邮件内容
                if (v!.time < time) {
                  const index = mail_list.value.findIndex((item) => item.mark === mark);
                  mail_list.value[index] = mail;
                }
                return;
              }

              mail_list.value.push(mail);
            });

            saveMailList();
          })
          .catch((err) => {
            if (err?.response?.status !== 404) {
              $message($msgTipText("rc53", { v: "私人邮件" }));
              return;
            }
            // eslint-disable-next-line no-console
            console.error("为什么文件404？因为你还没有收到过私人邮件，私人邮件是开发者推送给你的");
          });
      });
    },

    /** @description 签到福袋 */
    async sign() {
      sign_mails.value = [];

      //签到之前需要读取远程签到配置
      await this.getAllMail();
      sign_mails.value.forEach((item) => {
        const { key, type } = item;
        mail_list.value.unshift({
          ...item,
          id: `${type}_${key}_${dayjs().unix().toString()}`,
          time: dayjs().valueOf(),
        });
      });

      saveMailList();
    },

    /** @description 推送领取道具邮件 */
    sendGiftMail(mail: MailStoreType.SendMail) {
      const { title, desc, props } = mail;

      mail_list.value.unshift({
        key: "DEFAULT",
        title,
        desc,
        props,
        time: dayjs().valueOf(),
        type: "GIFT",
        id: `GIFT_DEFAULT_${dayjs().unix().toString()}`,
        read: false,
      });

      saveMailList();
    },

    /** @description 设置已读 */
    setMailRead(id: string) {
      const index = mail_list.value.findIndex((item) => item.id === id);
      mail_list.value[index].read = true;

      const mark = mail_list.value[index].mark;

      if (mark) {
        $authStore.updateUserData({
          mallMark: [...$authStore.user_data.mallMark, mark],
        });
      }

      saveMailList();
    },

    /** @description 删除邮件 */
    delMail(id: string) {
      const index = mail_list.value.findIndex((item) => item.id === id);
      mail_list.value.splice(index, 1);

      saveMailList();
    },

    /** @description 退出登录清空邮箱列表 */
    clearMail() {
      mail_list.value = [];
      sign_mails.value = [];
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { MailStore };
