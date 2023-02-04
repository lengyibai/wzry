/** @description 默认英雄信息 */
export const heroDefault: Hero.Data = {
  id: 0,
  attack: 0,
  difficulty: 0,
  effect: 0,
  survival: 0,
  camp: "",
  cover: "",
  headImg: "",
  height: 0,
  identity: "",
  location: "",
  mark: "",
  name: "",
  period: "",
  poster: "",
  race: "",
  gender: "",
  skillUnit: "无",
  profession: [],
  specialty: [],
};

/** @description 默认皮肤信息 */
export const skinDefault: Hero.Skin = {
  id: 0,
  hero: 0,
  num: 0,
  price: 0,
  type: 0,
  name: "",
  poster: "",
  cover: "",
  headImg: "",
  profession: [],
  heroName: "",
  gender: "",
};

/** @description 默认音频信息 */
export const voiceDefault: Hero.Voice = {
  text: "",
  link: "",
};

/** @description 默认技能信息 */
export const skillDefault: Hero.Skill = {
  cd: 0,
  consume: 0,
  name: "",
  desc: "",
  img: "",
  type: [],
  effect: [],
};

/** @description 默认技能效果信息 */
export const skillEffectDefault: Hero.SkillEffect = {
  type: "",
  phase: [],
};

/** @description 默认装备信息 */
export const equipDefault: Equip.Data = {
  id: 0,
  level: 0,
  num: 0,
  price: 0,
  type: "",
  name: "",
  icon: "",
  note: "",
  desc: "",
  effect: [],
  motivation: [],
};

/** @description 默认装备动机信息 */
export const equipMotivationDefault: Equip.Motivation = {
  type: false,
  name: "",
  desc: "",
  time: 0,
  note: "",
};

/** @description 默认铭文信息 */
export const epigraphDefault: Epigraph.Data = {
  id: 0,
  name: "",
  type: [],
  img: "",
  effect: [],
};

/** @description 默认用户信息 */
export const userDefaultInfo: User = {
  id: "",
  headImg: window.IMGBED + "/image/head.jpg",
  nickname: "",
  password: "",
  role: 1,
};

/** @description 默认配置信息 */
export const configDefault: SettingConfig = {
  tip: true,
  videoBg: true,
  audio: true,
  audioVolume: 50,
  music: true,
  musicVolume: 50,
  musicProgress: false,
  speed: 1,
  muted: false,
  border: false,
  shadow: true,
  shine: true,
  particle: false,
  noTips: {
    "2rb7": false,
    "9f5m": false,
    "05su": false,
    "9oy5": false,
    "58mz": false,
    "1w7o": false,
    "0vk2": false,
    "1zs6": false,
    "3vi5": false,
    "2l5m": false,
    "9ms5": false,
  },
};
