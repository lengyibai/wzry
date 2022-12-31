/** @description: 英雄信息 */
declare namespace Hero {
  interface Data {
    id: number; //标识符
    attack: string; //攻击
    difficulty: string; //难度
    effect: string; //增益
    survival: string; //生存
    camp: string; //阵营
    cover: string; //封面
    headImg: string; //头像
    height: string; //身高
    identity: string; //身份
    location: string; //区域
    mark: string; //代号
    name: string; //名字
    period: string; //时期
    poster: string; //海报
    race: string; //种族
    skillUnit: string; //技能消耗单位
    profession: string[]; //职业
    specialty: string[]; //特长
    voices: Voice[]; //语音
    skills: Skill[][]; //技能
    skins: Skin[]; //皮肤
    relationships: RelationType[]; //关系表
    [propsName: string]: any;
  }
  /** @description: 头像列表 */
  interface HeadImg {
    id: number;
    name: string;
    headImg: string;
  }

  /** @description: 语音 */
  interface Voice {
    text: string; //语音文字
    link: string; //语音链接
  }
  interface Voices {
    name: string;
    voice: Voice[];
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

  /** @description: 返回的技能 */
  interface SkillParams {
    id: number;
    skills: Skill[][];
  }

  /** @description: 技能效果 */
  interface SkillEffect {
    type: string; //技能类型
    phase: number[]; //效果等级数值
  }
  /** @description: 技能类型 */
  interface SkillType {
    id: number;
    name: string;
  }
  /** @description: 关系信息 */
  interface Relationship {
    id: number;
    name: string;
    relationship: RelationType[];
  }
  /** @description: 关系类型 */
  interface RelationType {
    id: number;
    relation: string;
    hero: HeadImg;
  }

  /** @description: 皮肤信息 */
  interface Skin {
    id: number; //标识
    hero: number; //所属英雄id
    num: number; //序号
    price: string | number; //价格
    type: number | string; //类型
    gender: string; //性别
    name: string; //名称
    poster: string; //海报
    cover: string; //封面
    headImg: string; //头像
    profession: string[]; //职业
    heroName: string; //英雄名称
  }
  /** @description: 皮肤类型 */
  interface SkinType {
    id: number;
    name: string;
    link: string;
  }
  /** @description: 英雄额外信息 */
  /** @description: general */
  interface General {
    id: number;
    name: string;
  }
}
