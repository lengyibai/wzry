import { Hero, Voice, Skill } from './hero';
import { Equip } from './items';
import { Epigraph } from './items';
export const hero: Hero = {
  id: 0, //标识符
  attack: 0, //攻击
  difficulty: 0, //难度
  effect: 0, //增益
  survival: 0, //生存
  camp: '', //阵营
  cover: '', //封面
  energy: '', //能量
  gamestory: '', //游戏故事
  headImg: '', //头像
  height: '', //身高
  history: '', //历史故事
  identity: '', //身份
  location: '', //区域
  mark: '', //代号
  name: '', //名字
  period: '', //时期
  poster: '', //海报
  profession: '', //职业
  specialty: '', //特长
  offset: {
    top: 0, //向下偏移
    left: 0, //向右偏移
    transform: '', //缩放
  },
  voices: [], //语音
  skills: [], //技能
  skins: [], //皮肤
};

export const voice: Voice = {
  desc: '', //语音文字
  voice: '', //语音链接
};

export const skill: Skill = {
  cd: 0, //技能冷却
  consume: 0, //消耗
  name: '', //名称
  desc: '', //简述
  img: '', //图标
  type: [], //类型
  effect: [], //效果
};

export const equip: Equip = {
  id: 0, //标识符
  level: 0, //等级
  price: 0, //价格
  type: '', //类型
  name: '', //名称
  icon: '', //图标
  note: '', //备注
  desc: '', //简述
  effect: [], //效果
  motivation: [], //动机
};

export const epigraph: Epigraph = {
  name: '', //名称
  type: '', //类型
  img: '', //图标
  effect: [], //效果
};
