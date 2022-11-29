/* 可选偏移量 */
type Scale = "left" | "right";
type Direction = "left" | "right" | "top" | "bottom";

/** @description: 英雄信息 */
declare namespace Hero {
  interface Data {
    id: string | undefined; //标识符
    attack: string; //攻击
    difficulty: string; //难度
    effect: string; //增益
    survival: string; //生存
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
    offset: Offset; //封面偏移量
    specialty: string[]; //特长
    voices: Voice[]; //语音
    skills: Skill[]; //技能
    skins: Skin[]; //皮肤
    [propName: string]: any;
  }

  /** @description: 封面偏移量 */
  interface Offset {
    top: number; //向下偏移
    left: number; //向右偏移
    transform: string; //缩放
  }

  /** @description: 语音 */
  interface Voice {
    desc: string; //语音文字
    voice: string; //语音链接
  }

  /** @description: 技能信息 */
  interface Skill {
    cd?: number; //技能冷却
    consume?: number; //消耗
    name: string; //名称
    desc: string; //简述
    img: string; //图标
    type: string[]; //类型
    effect?: SkillEffect[]; //效果
  }

  /** @description: 技能效果 */
  interface SkillEffect {
    type: string; //技能类型
    phase: number[]; //效果等级数值
  }
  /** @description: 技能类型 */
  interface SkillType {
    id: string;
    name: string;
  }

  /** @description: 皮肤信息 */
  interface Skin {
    id: number; //标识
    hero: number; //所属英雄id
    num: number; //序号
    price: number; //价格
    type: string; //类型
    name: string; //名称
    img: string; //图片
    head: string; //头像
  }
  /** @description: 皮肤类型 */
  interface SkinType {
    id: string;
    name: string;
    link: string;
  }
}
