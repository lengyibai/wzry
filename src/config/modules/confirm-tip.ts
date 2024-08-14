/** @description 确认提示 */
const CONFIRM_TIP = {
  i8p8: "确定[重置]所有配置项？",
  wd31: "退卡会[销毁]当前插入的卡片，请确保你已经[下载]了最新卡片文件，否则你的数据将[永久丢失]，如果已下载,请点击确定。",
  wi59: "确认[换卡]登录吗？",
  q7h5: "确定[拆卸]铭文吗？",
  va64: "确定删除[{name}]这个方案吗？",
  ao63: "即将从远程下载当前数据进行覆盖。",
  p89n: "[{prop}]不足，是否[前往获取]？",
  r36m: "确定花费[{count}]个[{prop}]兑换[{name}]吗？",
  eb14: "你还没有获取该{v}，是否[前往购买]？",
  yb85: "夺宝币[用完了]，快去[补给站]或[道具商店]获取夺宝石吧！",
  wr91: "夺宝币[不足5个]，先[夺宝一次]吧！",
  qv90: "夺宝石[不足5个]，先[夺宝一次]吧！",
  ah95: "资料[已修改]，确定[关闭]吗？",
  jn63: "终止后[只能领取]当前倒计时过去时间的[上一个补给模式奖励]，确定[终止补给]吗？",
  ob55: "今日剩余夺宝石补给数量[{v}]个，当前模式[已超出]剩余补给数量，确定让系统[自动选择]模式吗？",
  m2x2: "确定使用一张[{v}]吗？",
  jt83: "已有[{v}]生效中，是否继续使用一张延续时间？",
  yn45: "由于你的[竞猜券]扣除为[0]，请前往[道具商店]购买[竞猜券]。",
  vk62: "确定花费[{price}]个[{name}]购买[{part}]吗？",
  vt39: "确定删除[{order}]订单吗？",
  nl88: "确定清空购物车吗？",
  vj93: "确定删除邮件吗？",
  uv41: "",
  wl74: "",
  nh44: "",
  qh65: "",
  fx84: "",
  a99u: "",
  ee02: "",
  rh92: "",
};

/** @description 模板Tip
 * @param key Tip的键名
 * @param variables 替换Tip中的key值
 */
const $confirmText = (
  key: keyof typeof CONFIRM_TIP,
  variables: Record<string, string | number>,
) => {
  let template = CONFIRM_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replaceAll(`{${key}}`, value.toString());
  });
  return template;
};

export { CONFIRM_TIP, $confirmText };
