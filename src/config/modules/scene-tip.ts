/** @description 小贴士配置 */
const SCENE_TIP: Record<keyof Global.Tip.Key, string> = {
  d7o5: "底部工具栏可以切换音乐！",
  kr53: "顶部的弹幕可以点击查看语音来源！你也可以在设置关闭弹幕。",
  ma67: "点击英雄关系可切换英雄信息！",
  mu63: "",
  f1y0: "别忘了进入铭文搭配页。",

  /**
   * PC端专属
   */
  v44s: "按住边缘头像，拖动到中心位置并松开(点击头像也可以)。",

  /**
   * 移动端专属
   */
  lp57: "手指按住边缘头像，拖动到中心位置并松开(点击头像也可以)。",
  cl60: "按住方案卡片拖拽可排序。",
};

/** @description 自定义/动态Tip */
const CUSTOM_TIP = {
  zd98: "检测到本地缺失{t}：[{v}]，已为你自动恢复。",
  qk36: "我一定会回来的~",
  hg86: "我又回来啦！",
  sm04: "恢复小贴士需要刷新浏览器才会生效。",
  vu90: "数据丢失，请刷新页面。",
  cw90: "你已经{d}天没有访问本站了，为保证数据准确性，请点击确定清除本地数据重新下载资源。",
  le13: "{h}存在{c}套技能，页面右下角有个切换副技能的按钮，点击它吧！",
  yn35: "",
  j33c: "",
  wi79: "",
};

/** @description 模板Tip */
const $tipText = (key: keyof typeof CUSTOM_TIP, variables: Record<string, string | number>) => {
  let template = CUSTOM_TIP[key];
  Object.entries(variables).forEach(([key, value]) => {
    template = template.replace(`{${key}}`, value.toString());
  });
  return template;
};

export { SCENE_TIP, CUSTOM_TIP, $tipText };
