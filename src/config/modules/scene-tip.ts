/** @description 小贴士配置，注意：只要是使用了这里的内容，已读后都不再提示 */
const SCENE_TIP: Record<keyof Global.Tip.Key, string> = {
  d7o5: "底部工具栏可以切换音乐！",
  mu63: "别忽略了这里可以切换为Minecraft贴图哦！",
  f1y0: "别忘了进入铭文搭配页。",
  cl60: "按住方案卡片拖拽可排序。",
  ma67: "",
  kr53: "",

  /**
   * PC端专属
   */
  v44s: "按住边缘头像，拖动到中心位置并松开(点击头像也可以)。",

  /**
   * 移动端专属
   */
  lp57: "手指按住边缘头像，拖动到中心位置并松开(点击头像也可以)。",
};

/** @description 自定义/动态Tip */
const CUSTOM_TIP = {
  zd98: "检测到本地缺失{t}：[{v}]，已为你自动恢复。",
  qk36: "我一定会回来的~",
  hg86: "我又回来啦！",
  sm04: "恢复小贴士需要刷新浏览器才会生效。",
  vu90: "数据丢失，请刷新页面。",
  le13: "{h}存在{c}套技能，页面右下角有个切换副技能的按钮，点击它吧！",
  yn35: "",
  j33c: "",
  wi79: "",
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
