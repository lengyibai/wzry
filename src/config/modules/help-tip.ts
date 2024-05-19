import { LOTTERY_SUPPLY_LIMIT } from "./game-config";

/** @description 帮助提示 */
const HELP_TIP = {
  dq76: `1、优先使用{crystal}夺宝石进行夺宝。
2、{crystal}水晶在幸运值为[{luckValue1}-{luckValue2}]时获得，获取后将[重置]幸运值。
3、{type}夺宝石补给倒计时结束后，不会自动叠加，需要领取补给后再次设置模式，重新倒计时。
4、{type}夺宝石补给每日领取上限为[${LOTTERY_SUPPLY_LIMIT}]个夺宝石，额外的{type}夺宝次数前往[商城-道具商店]购买。
5、{type}夺宝石补给如果在倒计时没有结束时[终止]，会根据当前已过去的时间，匹配对应的模式奖励。
6、{type}夺宝石补给倒计时是根据[当前时间-开始时间]来计算[剩余时间]，不受关闭浏览器影响。
※、{type}夺宝概率设计：{chance}放入奖池，从奖池随机选择，没有保底机制。`,
  g5k2: "",
  j5s5: "",
  ak79: "",
  yn25: "",
  tw50: "",
  fr16: "",
  pg06: "",
  op14: "",
  sg33: "",
  kc45: "",
  mx01: "",
  dy76: "",
  xw01: "",
  en46: "",
  ku28: "",
  vf96: "",
  ib49: "",
  hv47: "",
};

/** @description 模板Tip
 * @param key Tip的键名
 * @param variables 替换Tip中的key值
 */
const $helpText = (key: keyof typeof HELP_TIP, variables: Record<string, string | number>) => {
  let template = HELP_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replaceAll(
      `{${key}}`,
      value.toString(),
    ) as (typeof HELP_TIP)[keyof typeof HELP_TIP];
  });
  return template;
};

export { HELP_TIP, $helpText };
