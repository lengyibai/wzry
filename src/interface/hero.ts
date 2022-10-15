/* 封面偏移量 */
export interface Offset {
  top: number; //向下偏移
  left: number; //向右偏移
  transform: string; //缩放
}

/* 语音 */
export interface Voice {
  desc: string; //语音文字
  voice: string; //语音链接
}

/* 技能效果 */
export interface SkillEffect {
  type: string; //技能类型
  phase: number[]; //效果等级数值
}

/* 技能信息 */
export interface Skill {
  name: string; //名称
  desc: string; //简述
  img: string; //图标
  type: string[]; //类型
  effect?: SkillEffect; //效果
}

/* 皮肤信息 */
export interface Skin {
  id: number; //标识
  num: number; //序号
  hero: number; //所属英雄id
  name: string; //名称
  img: string; //图片
  head: string; //头像
  type: number; //类型
  price: number; //价格
}

/* 英雄信息 */
export interface Hero {
  id: number; //标识符
  attack: number; //攻击
  difficulty: number; //难度
  effect: number; //增益
  survival: number; //生存
  camp: string; //阵营
  cover: string; //封面
  energy: string; //能量
  gamestory: string; //游戏故事
  headImg: string; //头像
  height: string; //身高
  history: string; //历史故事
  identity: string; //身份
  location: string; //区域
  mark: string; //代号
  name: string; //名字
  period: string; //时期
  poster: string; //海报
  profession: string; //职业
  specialty: string; //特长
  offset: Offset; //封面偏移量
  voices: Voice[]; //语音
  skills: Skill[]; //技能
  skins: Skin[]; //皮肤
}
