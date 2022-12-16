// 消息文本信息
export interface MsgText {
  id: number;
  text: string;
  type: string;
}

//音频类型
export interface Sound {
  default: string[];
  tab: string[];
  login: string[];
  模式选择: string[];
  查看详情: string[];
  皮肤相关: string[];
  装备相关: string[];
  英雄列表: string[];
  查看: string[];
  确定: string[];
  关闭: string[];
  取消: string[];
  消息提示: string[];
  警告提示: string[];
  错误提示: string[];
  确认弹窗: string[];
  关闭抽屉: string[];
  项目组件: string[];
}
