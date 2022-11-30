interface Desc extends Record<string, string> {
  headImg: string;
  name: string;
  mark: string;
  identity: string;
  height: string;
  cover: string;
  poster: string;
}

interface Attr extends Record<string, string> {
  survival: string;
  attack: string;
  effect: string;
  difficulty: string;
}

export default () => {
  const AddLink_set_desc: Desc = {
    headImg: "头像链接",
    name: "英雄名",
    mark: "代号",
    identity: "身份",
    height: "身高",
    cover: "封面",
    poster: "海报",
  };

  const attr: Attr = {
    survival: "生存能力",
    attack: "攻击伤害",
    effect: "技能效果",
    difficulty: "上手难度",
  };

  const info: string[][] = [
    ["阵营", "campType", "camp"],
    ["定位", "locationType", "location"],
    ["时期", "periodType", "period"],
  ];

  return {
    AddLink_set_desc,
    attr,
    info,
  };
};
