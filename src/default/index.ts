/** @description 默认英雄信息 */
export const heroDefault: () => Game.Hero.Detail = () => ({
  id: 0,
  attack: 0,
  difficulty: 0,
  effect: 0,
  survival: 0,
  camp: "",
  cover: "",
  coverBlur: "",
  avatar: "",
  height: 0,
  identity: "",
  location: "",
  mark: "",
  name: "",
  period: "",
  poster: "",
  posterBig: "",
  posterBlur: "",
  race: "",
  resume: "",
  gender: "男",
  skillUnit: "",
  profession: [],
  specialty: [],
  voices: [],
  skills: [],
  skins: [],
  relationships: [],
  skinCount: 0,
  relationCount: 0,
});

/** @description 默认技能信息 */
export const skillDefault: () => Remote.Skill.Info = () => ({
  cd: 0,
  consume: 0,
  name: "",
  desc: "",
  img: "",
  type: [],
  effect: [],
});

/** @description 默认技能效果信息 */
export const skillEffectDefault: () => Remote.Skill.Info["effect"][0] = () => ({
  name: "",
  phase: [],
});

/** @description 默认用户信息 */
export const userDefaultInfo: () => Global.User = () => ({
  id: "",
  avatar: "",
  nickname: "",
  password: "",
  role: 1,
});

/** @description 默认配置信息 */
export const configDefault: () => Global.SettingConfig = () => ({
  tip: true,
  audio: true,
  audioVolume: 50,
  music: true,
  musicVolume: 50,
  barrage: true,
  musicProgress: false,
  speed: 1,
  muted: false,
  border: false,
  shadow: true,
  shine: true,
  particle: true,
  language: 0,
  noTips: {
    f1y0: false,
    mu63: false,
    ma67: false,
    v44s: false,
    d7o5: false,
    lp57: false,
    kr53: false,
    cl60: false,
  },
});
