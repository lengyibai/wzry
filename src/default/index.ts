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

/** @description 默认技能信息 */
export const skillDefault: Hero.Skill = {
  cd: 0,
  consume: "",
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
