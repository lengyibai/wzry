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
  km30: "设置成功",
  y2l2: "退卡成功",
  a2k3: "请选择png、jpg、jpeg格式的图片文件",
  by88: "卡片已损坏！！！",
  kq89: "开发者身份已确认",
  mj67: "请输入完整",
  fh97: "注册成功，请保管好你的召唤师卡",
  iy70: "正在检查更新",
  r12t: "数据已过期，已为你退卡",
  uf04: "检测到你之前有通过修改系统时间的操作，此卡已作废！",
  mg14: "此卡片为{v}环境卡片，与当前环境不互通，请重新注册",
  wa83: "{v}不足",
  dl57: "购买成功",
  pt07: "升级成功",
  y9k8: "你还没有选择{v}",
  vf38: "自选宝箱库存不足，剩余{v}",
  nw29: "低于最短时间，无法获取奖励",
  ds85: "复制成功",
  xv24: "今日补给已结束，请明日再来！",
  xu03: "新的一天！去看看邮箱里都有什么吧？",
  yz00: "补给中，请耐心等待...",
  fo08: "开卡成功",
  rc53: "【{v}】请求下载失败，如果你开启了VPN，请关闭，或尝试刷新浏览器，如果仍未解决，请联系作者。",
  ep96: "",
  z0r7: "",
  g3h9: "",
  kq91: "",
  f1q2: "",
  m21j: "",
  yk98: "",
  ai11: "",
  da62: "",
} as const;

/** @description 模板提示 */
const $msgTipText = (key: keyof typeof MESSAGE_TIP, variables: Record<string, string | number>) => {
  let template = MESSAGE_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(
      `{${key}}`,
      value.toString(),
    ) as (typeof MESSAGE_TIP)[keyof typeof MESSAGE_TIP];
  });
  return template;
};

export { MESSAGE_TIP, $msgTipText };
