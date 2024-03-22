import dayjs from "dayjs";

import { AuthStore, MailStore } from "@/store";
import { LOTTERY_STONE_WEEK_CARD_GRANT } from "@/config/modules/game-config";

/** @description 周卡相关领取推送与自动到期重置 */
const useWeekCard = () => {
  const $authStore = AuthStore();
  const $mailStore = MailStore();

  const hero_time = $authStore.user_data.heroLotteryStoneWeekCardExpireTime;
  const skin_time = $authStore.user_data.skinLotteryStoneWeekCardExpireTime;

  /** 统一处理 */
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
      "英雄夺宝抵扣石周卡发放",
      "HERO_LOTTERY_STONE",
      "HERO_LOTTERY_COIN",
      LOTTERY_STONE_WEEK_CARD_GRANT.HERO.STONE,
      LOTTERY_STONE_WEEK_CARD_GRANT.HERO.COIN,
    );
  }

  /** 发放奖励 */
  if (skin_time !== 0 && skin_time > dayjs().valueOf()) {
    sendGiftMailForWeekCard(
      "皮肤夺宝抵扣石周卡发放",
      "SKIN_LOTTERY_STONE",
      "SKIN_LOTTERY_COIN",
      LOTTERY_STONE_WEEK_CARD_GRANT.SKIN.STONE,
      LOTTERY_STONE_WEEK_CARD_GRANT.SKIN.COIN,
    );
  }

  /** 过期处理 */
  if (hero_time <= dayjs().valueOf()) {
    $authStore.updateUserData({
      heroLotteryStoneWeekCardExpireTime: 0,
    });
  }

  /** 过期处理 */
  if (hero_time <= dayjs().valueOf()) {
    $authStore.updateUserData({
      heroLotteryStoneWeekCardExpireTime: 0,
    });
  }
};

export { useWeekCard };
