/** @description 确认提示 */
const CONFIRM_TIP = {
  i8p8: "确定重置所有配置项？",
  wd31: "退卡会销毁当前卡片数据，请确保你已经下载了卡片，确定退卡吗？",
  nh44: "退卡会下载最新卡片，确定退卡吗？",
  wi59: "确认换卡登录吗？",
  q7h5: "确定拆卸铭文吗？",
  va64: "确定删除[{name}]这个方案吗？",
  ao63: "即将从远程下载当前数据进行覆盖",
  p89n: "",
  r36m: "",
  eb14: "",
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
