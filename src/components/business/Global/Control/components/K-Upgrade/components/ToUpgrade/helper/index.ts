import { UPGRADE_GIFT } from "@/config/modules/game-config";

/** @description 升级赠送
 * @param currentExp 当前经验
 * @param nextExp 下一级经验
 */
export const upgradeGift = (currentExp: number, nextExp: number) => {
  const rewards: Partial<Record<Game.PropKey, number>> = {};
  for (let level = currentExp + 1; level <= nextExp; level++) {
    const reward = UPGRADE_GIFT[level];
    if (reward) {
      rewards[reward.key] ??= 0;
      rewards[reward.key]! += reward.count;
    }
  }
  return Object.entries(rewards).map(([key, count]) => ({ key, count }));
};
