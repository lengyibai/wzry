/** @description 消息提醒 */
const MESSAGE_TIP = {
  cg09: "内容不能为空",
  j5l7: "已重置所有配置项",
  l23d: "保存成功",
  kc58: "修改成功",
  s24z: "验证成功",
  rh43: "密码错误",
  n32v: "你还没有设置二级密码",
  w89h: "二级密码不能与卡片密码相同，请重新输入",
  f1q2: "登录密码不能与二级密码相同，请重新输入",
  km30: "设置成功",
  y2l2: "退卡成功",
  a2k3: "请选择png、jpg、jpeg格式的图片文件",
  by88: "卡片已损坏！！！",
  kq89: "开发者身份已确认",
  mj67: "请输入完整",
  fh97: "注册成功",
  iy70: "正在检查更新",
  uf04: "检测到你之前有通过修改系统时间的操作，此卡已作废！",
  mg14: "此卡片为{v}环境卡片，与当前环境不互通，请重新注册",
  wa83: "{v}不足",
  dl57: "购买成功",
  pt07: "升级成功",
  y9k8: "你还没有选择{v}",
  vf38: "自选宝箱库存不足，剩余{v}",
  nw29: "低于最短时间，无法获取奖励",
  ds85: "复制成功",
  xv24: "今日{v}已用完，请明日再来！如需获取更多夺宝石，可前往道具商城",
  xu03: "新的一天！去看看邮箱里都有什么吧？",
  yz00: "补给中，请耐心等待...",
  fo08: "开卡成功",
  ep96: "续费成功",
  rc53: "【{v}】请求下载失败，请检查网络，如果频繁出现请联系作者。",
  kq91: "{type}竞猜出题需要预留{num}个英雄，目前已到临界值，请等待网站上架新{goods}",
  m21j: "请先处理你的乂宝部件订单",
  yk98: "请手动点击右侧菜单选择竞猜",
  ai11: "请选择在本站退卡的卡片文件，后缀名为.wzry的文件",
  da62: "请完成答题后再退出",
  z0r7: "",
  g3h9: "",
} as const;

/** @description 模板Tip
 * @param key Tip的键名
 * @param variables 替换Tip中的key值
 */
const $msgTipText = (key: keyof typeof MESSAGE_TIP, variables: Record<string, string | number>) => {
  let template = MESSAGE_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replaceAll(
      `{${key}}`,
      value.toString(),
    ) as (typeof MESSAGE_TIP)[keyof typeof MESSAGE_TIP];
  });
  return template;
};

export { MESSAGE_TIP, $msgTipText };
