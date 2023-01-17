/** @description: 默认英雄信息 */
export const heroDefault: Hero.Data = {
  id: 0, //标识符
  attack: 0, //攻击
  difficulty: 0, //难度
  effect: 0, //增益
  survival: 0, //生存
  camp: "", //阵营
  cover: "", //封面
  headImg: "", //头像
  height: 0, //身高
  identity: "", //身份
  location: "", //区域
  mark: "", //代号
  name: "", //名字
  period: "", //时期
  poster: "", //海报
  race: "", //种族
  gender: "",
  skillUnit: "无", //技能消耗单位
  profession: [], //职业
  specialty: [], //特长
};

/** @description: 默认皮肤信息 */
export const skinDefault: Hero.Skin = {
  id: 0, //标识
  hero: 0, //所属英雄id
  num: 0, //序号
  price: 0, //价格
  type: 0, //类型
  name: "", //名称
  poster: "", //海报
  cover: "", //封面
  headImg: "", //头像
  profession: [], //职业
  heroName: "", //英雄名称
  gender: "", //性别
};

/** @description: 默认音频信息 */
export const voiceDefault: Hero.Voice = {
  text: "", //语音文字
  link: "", //语音链接
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
export const equipMotivationDefault: Equip.Motivation = {
  type: false,
  name: "",
  desc: "",
  time: 0,
  note: "",
};

/** @description: 默认铭文信息 */
export const epigraphDefault: Epigraph.Data = {
  id: 0,
  name: "", //名称
  type: [], //类型
  img: "", //图标
  effect: [], //效果
};

/** @description: 默认配置信息 */
export const configDefault: SettingConfig = {
  tip: true,
  videoBg: true,
  audio: true,
  audioVolume: 50,
  music: true,
  musicVolume: 50,
  theme: 0,
  speed: 1,
  loginSound: true,
  particle: false,
};
