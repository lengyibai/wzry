import { GAME_PROP } from "./game-prop";

/** @description 帮助提示 */
const HELP_TIP = {
  kc45: `1、价值[≤6]个皮肤碎片的皮肤无法兑换，只能通过[${GAME_PROP.SKIN_CHEST_BRAVE_OPTIONAL.label}]概率获取。
2、[限定皮肤]无法兑换，只能通过[${GAME_PROP.SKIN_LIMIT_TREASURE.label}]。`,
  dq76: `1、每日赠送[25次]皮肤夺宝次数，优先使用抵扣石。
2、荣耀水晶在幸运值为[150-200]时获得，获取后将[重置]幸运值。
3、抵扣石补给倒计时结束后，不会自动叠加，需要领取补给后再次设置模式，重新倒计时。
4、抵扣石补给每日领取上限为[200]个抵扣石，额外的夺宝次数前往[商城-道具商店]购买。
5、抵扣石补给如果在倒计时没有结束时[终止]，会根据当前已过去的时间，匹配对应的模式奖励。
6、抵扣石补给倒计时是根据[当前时间-开始时间]来计算[剩余时间]，不受关闭浏览器影响。`,
  v74k: "",
  g5k2: "",
  j5s5: "",
  ak79: "",
  yn25: "",
  tw50: "",
  fr16: "",
  pg06: "",
  op14: "",
  sg33: "",
  mx01: "",
  dy76: "",
  xw01: "",
  en46: "",
  ku28: "",
  vf96: "",
  ib49: "",
  hv47: "",
};

/** @description 模板Tip */
const $helpText = (key: keyof typeof HELP_TIP, variables: Record<string, string | number>) => {
  let template = HELP_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(`{${key}}`, value.toString());
  });
  return template;
};

export { HELP_TIP, $helpText };
