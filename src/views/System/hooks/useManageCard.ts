import { StyleValue } from 'vue';

export default {
  box: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    overflow: 'auto',
  },
  list: {
    Hero: '英雄',
    Skin: '皮肤',
    Voice: '语音',
    Skill: '技能',
    Story: '故事',
    Equip: '装备',
    Epigraph: '铭文',
    /* { name: "英雄关系", key: "" },
    { name: "关系类型", key: "" },
    { name: "技能类型", key: "" },
    { name: "技能效果", key: "" },
    { name: "装备类型", key: "" },
    { name: "铭文类型", key: "" },
    { name: "铭文效果", key: "" }, */
  },
} as {
  box: StyleValue;
  list: {
    [propName: string]: string;
  };
};
