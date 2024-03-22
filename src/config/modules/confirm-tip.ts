/** @description 确认提示 */
const CONFIRM_TIP = {
  i8p8: "确定[重置]所有配置项？",
  wd31: "退卡会[销毁]当前卡片数据，请确保你已经[下载]了卡片，确定[退卡]吗？",
  nh44: "退卡会[下载]最新卡片，确定[退卡]吗？",
  wi59: "确认[换卡]登录吗？",
  q7h5: "确定[拆卸]铭文吗？",
  va64: "确定删除[{name}]这个方案吗？",
  ao63: "即将从远程下载当前数据进行覆盖",
  p89n: "[{prop}]不足，是否[前往购买]？",
  r36m: "确定花费[{count}]个[{prop}]兑换[{name}]吗？",
  eb14: "你还没有获取该{v}，是否[前往购买]？",
  yb85: "夺宝币[用完了]，快去[补给站]获取抵扣石吧！",
  wr91: "夺宝币[不足5个]，先[夺宝一次]吧！",
  qv90: "抵扣石[不足5个]，先[夺宝一次]吧！",
  ah95: "资料[已修改]，确定[关闭]吗？",
  jn63: "终止后[只能领取]当前倒计时过去时间的[上一个补给模式奖励]，确定[终止补给]吗？",
  ob55: "今日剩余抵扣石补给数量[{v}]个，当前模式[已超出]剩余补给数量，确定让系统[自动选择]模式吗？",
  m2x2: "确定使用一张[{v}]吗？",
  jt83: "已有[{v}]生效中，是否继续使用一张延续时间？",
  vj93: "",
  ee02: "",
  yn45: "",
  vk62: "",
  vt39: "",
  nl88: "",
  uv41: "",
  wl74: "",
  qh65: "",
  fx84: "",
  a99u: "",
  rh92: "",
};

/** @description 模板Tip */
const $confirmText = (
  key: keyof typeof CONFIRM_TIP,
  variables: Record<string, string | number>,
) => {
  let template = CONFIRM_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(`{${key}}`, value.toString());
  });
  return template;
};

export { CONFIRM_TIP, $confirmText };
