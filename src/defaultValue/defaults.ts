/** @description: 默认英雄信息 */
export const heroDefault: Hero.Data = {
  id: undefined, //标识符
  attack: "0", //攻击
  difficulty: "0", //难度
  effect: "0", //增益
  survival: "0", //生存
  camp: "", //阵营
  cover: "", //封面
  gamestory: "", //游戏故事
  headImg: "", //头像
  height: "", //身高
  history: "", //历史故事
  identity: "", //身份
  location: "", //区域
  mark: "", //代号
  name: "", //名字
  period: "", //时期
  poster: "", //海报
  offset: {
    top: 0, //向下偏移
    left: 0, //向右偏移
    transform: "", //缩放
  },
  profession: [], //职业
  specialty: [], //特长
  voices: [], //语音
  skills: [], //技能
  skins: [], //皮肤
};

export const voiceDefault: Hero.Voice = {
  desc: "", //语音文字
  voice: "", //语音链接
};

/** @description: 默认技能信息 */
export const skillDefault: Hero.Skill = {
  cd: 0, //技能冷却
  consume: 0, //消耗
  name: "", //名称
  desc: "", //简述
  img: "", //图标
  type: [], //类型
  effect: [], //效果
};

/** @description: 默认技能效果信息 */
export const skillEffectDefault: Hero.SkillEffect = {
  type: "",
  phase: [],
};

/** @description: 默认装备信息 */
export const equipDefault: Equip.Data = {
  id: 0, //标识符
  level: 0, //等级
  num: 0, //当前列第几个
  price: 0, //价格
  type: "", //类型
  name: "", //名称
  icon: "", //图标
  note: "", //备注
  desc: "", //简述
  effect: [], //效果
  motivation: [], //动机
};

/** @description: 默认装备动机信息 */
export const equipMotivationDefault: Equip.EquipMotivation = {
  type: false,
  name: "",
  desc: "",
  time: 0,
};

/** @description: 默认铭文信息 */
export const epigraphDefault: Epigraph.Data = {
  name: "", //名称
  type: "", //类型
  img: "", //图标
  effect: [], //效果
};
