/** @description 小贴士配置，注意：只要是使用了这里的内容，已读后都不再提示 */
const SCENE_TIP: Record<keyof Global.Tip.Key, string> = {
  d7o5: "底部工具栏可以切换音乐！",
  mu63: "这里可以切换为Minecraft贴图哦！",
  f1y0: "别忘了进入铭文搭配页。",
  cl60: "按住方案卡片拖拽可排序。",
  kr53: "",

  /**
   * PC端专属
   */
  v44s: "按住边缘头像，拖动到中心位置并松开(点击头像也可以)。",

  /**
   * 移动端专属
   */
  lp57: "手指按住边缘头像，拖动到中心位置并松开(点击头像也可以)。",
  ma67: "手机端无法展示跟随鼠标跳跃的小乂宝，因此你无法获取跳跳币。",
};

/** @description 自定义/动态Tip */
const CUSTOM_TIP = {
  qk36: "我一定会回来的~",
  hg86: "我又回来啦！",
  sm04: "恢复小贴士需要刷新浏览器才会生效。",
  vu90: "数据丢失，请刷新页面。",
  le13: "{h}存在{c}套技能，页面右下角有个切换副技能的按钮，点击它吧！",
  yn35: "欢迎你注册王者图鉴，开发者精心为你准备了一份新手大礼包，让你更快地体验网站里的一些玩法，祝你体验愉快！",
  j33c: "由于上一次未正常退出竞猜，已扣除一张竞猜券。",
  wi79: "虽然勉强适配了手机端，但我仍希望你使用电脑横屏访问本站，体验完整效果。",
  zd98: "",
};

/** @description 模板Tip
 * @param key Tip的键名
 * @param variables 替换Tip中的key值
 */
const $tipText = (key: keyof typeof CUSTOM_TIP, variables: Record<string, string | number>) => {
  let template = CUSTOM_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replaceAll(`{${key}}`, value.toString());
  });
  return template;
};

export { SCENE_TIP, CUSTOM_TIP, $tipText };
