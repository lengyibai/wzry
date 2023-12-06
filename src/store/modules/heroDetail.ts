import { defineStore } from "pinia";
import { ref } from "vue";

import { heroDefault } from "@/default";
import { API_RELATIONSHIP, API_VOICE } from "@/api";
import { getImgLink } from "@/utils/modules/concise";

type SkinToggleFn = (hero_name: string, skin_name: string) => void;
type ScollFn = { name: string; fn: (index: number) => void }[];
interface RelationInfoType extends Hero.RelationType {
  /** 对应关系英雄的回复 */
  reply: string;
  /** 对应关系 */
  replyRelation: string;
  /** 对应关系的性别 */
  replyGender: string;
}

/** @description 英雄详情 */
const HeroDetailStore = defineStore("heroDetail", () => {
  /** 处于展示的技能索引 */
  const skill_index = ref(0);
  /** 滚动索引 */
  const scroll_index = ref(1);
  /** 滚动结束后触发函数组 */
  const scollFns = ref<ScollFn>([]);
  /** 皮肤切换后触发函数组 */
  const skinToggleFns = ref<SkinToggleFn[]>([]);
  /** 皮肤语音列表 */
  const skin_voice = ref<Hero.Voice[]>([]);
  /** 技能选择触发的函数 */
  const skillSelectFn = ref<(index: number) => void>(() => {});
  /** 英雄信息 */
  const hero_info = ref<Hero.Data>(heroDefault());
  /** 当前悬浮显示的关系信息 */
  const relation_info = ref<RelationInfoType>({
    reply: "？",
    replyRelation: "？",
    desc: "？",
    replyGender: "",
    relation: "？",
    id: 0,
    heroName: "？",
    headImage: getImgLink("unknown"),
  });

  /** @description 设置英雄数据 */
  const setHeroInfo = (data: Hero.Data) => {
    hero_info.value = data;
  };

  /** @description 设置关系信息 */
  const setRelationInfo = (data?: Hero.RelationType) => {
    if (!data) {
      relation_info.value = {
        reply: "？",
        replyRelation: "？",
        desc: "？",
        replyGender: "",
        relation: "？",
        id: 0,
        heroName: "？",
        headImage: getImgLink("unknown"),
      };
      return;
    }
    API_RELATIONSHIP.getHeroRelationshipDesc(data.id, hero_info.value.id).then((res) => {
      relation_info.value = {
        ...data,
        reply: res.desc || "？",
        replyGender: res.gender === "男" ? "nan" : "nv",
        replyRelation: res.relation || "？",
      };
    });
  };

  /** @description 设置滚动索引 */
  const setIndex = (index: number) => {
    scroll_index.value = index;
    scollFns.value.forEach((item) => {
      item.fn(index);
    });
  };

  /** @description 设置技能索引 */
  const setSkillIndex = (index: number) => {
    setTimeout(() => {
      skill_index.value = index;
    }, 500);
  };

  /**
   * @description: 设置需要滚动触发的函数
   * @param name 标识符
   * @param fn 触发函数
   */
  const setScollFn = (name: string, fn: (index: number) => void) => {
    scollFns.value.push({ name: name, fn: fn });
  };

  /** @description 移除需要滚动触发的函数 */
  const removeScollFn = (name: string) => {
    const index = scollFns.value.findIndex((item) => item.name === name);
    scollFns.value.splice(index, 1);
  };

  /** @description 切换皮肤时触发 */
  const skinToggle = (hero_name: string, skin_name: string) => {
    skinToggleFns.value.forEach((item) => {
      item(hero_name, skin_name);
    });
  };

  /** @description 设置需要切换皮肤触发的函数 */
  const setSkinToggleFn = (fn: SkinToggleFn) => {
    skinToggleFns.value.push(fn);
  };

  /** @description 设置技能选择函数 */
  const setSkillSelectFn = (fn: () => void) => {
    skillSelectFn.value = fn;
  };

  /** @description 点击技能后触发 */
  const skillToggler = (index: number) => {
    skillSelectFn.value(index);
  };

  /** @description 获取设置皮肤语音 */
  const setSkinVoice = async (hero_name: string, skin_name = "盾山") => {
    skin_voice.value = await API_VOICE.getSkinVoice(hero_name, skin_name);
  };

  return {
    /** 英雄信息 */
    hero_info,
    /** 滚动结束后触发函数组 */
    scollFns,
    /** 滚动索引 */
    scroll_index,
    /** 处于展示的技能索引 */
    skill_index,
    /** 技能选择触发的函数 */
    skillSelectFn,
    /** 皮肤切换后触发函数组 */
    skinToggleFns,
    /** 皮肤语音列表 */
    skin_voice,
    relation_info,
    setHeroInfo,
    setIndex,
    setScollFn,
    removeScollFn,
    setSkillIndex,
    setSkillSelectFn,
    setSkinToggleFn,
    setSkinVoice,
    skillToggler,
    skinToggle,
    setRelationInfo,
  };
});

export { HeroDetailStore };
