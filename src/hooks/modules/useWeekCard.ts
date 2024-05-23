import { AuthStore, MailStore } from "@/store";
import { LOTTERY_STONE_WEEK_CARD_GRANT } from "@/config/modules/game-config";
import { dayjs } from "@/utils/tool";

/** @description 周卡相关领取推送与自动到期重置 */
const useWeekCard = () => {
  const $authStore = AuthStore();
  const $mailStore = MailStore();

  /** 英雄夺宝石周卡到期时间戳 */
  const hero_time = $authStore.user_data.heroLotteryStoneWeekCardExpireTime;
  /** 皮肤夺宝石周卡到期时间戳 */
  const skin_time = $authStore.user_data.skinLotteryStoneWeekCardExpireTime;

  /** @description 统一发放周卡奖励
   * @param title 邮件标题
   * @param stoneKey 周卡奖励的夺宝石key
   * @param coinKey 周卡奖励的夺宝币key
   * @param stoneGrant 周卡奖励的夺宝石数量
   * @param coinGrant 周卡奖励的夺宝币数量
   */
  const sendGiftMailForWeekCard = (
    title: string,
    stoneKey: Game.PropKey,
    coinKey: Game.PropKey,
    stoneGrant: number,
    coinGrant: number,
  ) => {
    $mailStore.sendGiftMail({
      title: title,
      desc: "别忘了明天0点之前也来领取哦！",
      props: [
        {
          key: stoneKey,
          num: stoneGrant,
        },
        {
          key: coinKey,
          num: coinGrant,
        },
      ],
    });
  };

  /** 发放奖励 */
  if (hero_time !== 0 && hero_time > dayjs().valueOf()) {
    sendGiftMailForWeekCard(
      "英雄夺宝石周卡奖励发放",
      "HERO_LOTTERY_STONE",
      "HERO_LOTTERY_COIN",
      LOTTERY_STONE_WEEK_CARD_GRANT.HERO.STONE,
      LOTTERY_STONE_WEEK_CARD_GRANT.HERO.COIN,
    );
  }

  /** 发放奖励 */
  if (skin_time !== 0 && skin_time > dayjs().valueOf()) {
    sendGiftMailForWeekCard(
      "皮肤夺宝石周卡奖励发放",
      "SKIN_LOTTERY_STONE",
      "SKIN_LOTTERY_COIN",
      LOTTERY_STONE_WEEK_CARD_GRANT.SKIN.STONE,
      LOTTERY_STONE_WEEK_CARD_GRANT.SKIN.COIN,
    );
  }

  /** 过期处理 */
  if (hero_time !== 0 && hero_time <= dayjs().valueOf()) {
    $authStore.updateUserData({
      heroLotteryStoneWeekCardExpireTime: 0,
    });

    $mailStore.sendMsgMail({
      title: "周卡过期提醒",
      desc: "你的英雄夺宝石周卡已过期，快去开卡吧！",
    });
  }

  /** 过期处理 */
  if (skin_time !== 0 && skin_time <= dayjs().valueOf()) {
    $authStore.updateUserData({
      skinLotteryStoneWeekCardExpireTime: 0,
    });

    $mailStore.sendMsgMail({
      title: "周卡过期提醒",
      desc: "你的皮肤夺宝石周卡已过期，快去开卡吧！",
    });
  }
};

export { useWeekCard };
