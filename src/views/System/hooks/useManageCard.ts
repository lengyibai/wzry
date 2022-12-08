import { StyleValue } from "vue";

type Info = {
  box: StyleValue;
  list: Record<string, string>;
};
const data: Info = {
  box: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    overflow: "auto",
  },
  list: {
    Hero: "英雄",
    Skin: "皮肤",
    Voice: "语音",
    Skill: "技能",
    Equip: "装备",
    Epigraph: "铭文",
    /* { name: "英雄关系", key: "" },
    { name: "关系类型", key: "" },
    { name: "技能类型", key: "" },
    { name: "技能效果", key: "" },
    { name: "装备类型", key: "" },
    { name: "铭文类型", key: "" },
    { name: "铭文效果", key: "" }, */
  },
};

export default data;
