import { defineStore } from "pinia";
import { ref } from "vue";

import { heroDefault } from "@/default";
import { getImgLink } from "@/utils/modules/concise";
import { GAME_HERO } from "@/api";

type SkinToggleFn = (hero_id: number, skin_name: string) => void;
type ScrollFn = { name: string; fn: (pageName: string) => void }[];
interface RelationInfoType extends Game.Hero.RelationType {
  /** 对应关系英雄的回复 */
  reply: string;
  /** 对应关系 */
  replyRelation: string;
  /** 对应关系的性别 */
  replyGender: string;
}

/** @description 英雄详情 */
const HeroDetailStore = defineStore("heroDetail", () => {
  const ExposeData = {
    /** 英雄信息 */
    hero_info: ref<Game.Hero.Detail>(heroDefault()),
    /** 滚动结束后触发函数组 */
    scrollFns: ref<ScrollFn>([]),
    /** 处于展示的技能索引 */
    skill_index: ref(0),
    /** 滚动索引 */
    page_name: ref("英雄资料"),
    /** 技能选择触发的函数 */
    skillSelectFn: ref<(index: number) => void>(() => {}),
    /** 皮肤切换后触发函数组 */
    skinToggleFns: ref<SkinToggleFn[]>([]),
    /** 皮肤语音列表 */
    skin_voice: ref<Remote.Voice.Data["voice"]>([]),
    /** 当前悬浮显示的关系信息 */
    relation_info: ref<RelationInfoType>({
      reply: "？",
      replyRelation: "？",
      desc: "？",
      replyGender: "",
      relation: "？",
      id: 0,
      heroName: "？",
      avatar: getImgLink("unknown"),
    }),
  };
  const {
    hero_info,
    scrollFns,
    skill_index,
    page_name,
    skillSelectFn,
    skinToggleFns,
    skin_voice,
    relation_info,
  } = ExposeData;

  const ExposeMethods = {
    /** @description 设置英雄数据 */
    setHeroInfo(data: Game.Hero.Detail) {
      hero_info.value = data;
    },

    /** @description 设置滚动页名 */
    setPageName(name: string) {
      page_name.value = name;
      scrollFns.value.forEach((item) => {
        item.fn(name);
      });
    },

    /**
     * @description: 设置需要滚动触发的函数
     * @param name 标识符
     * @param fn 触发函数
     */
    setScrollFn(name: string, fn: (pageName: string) => void) {
      scrollFns.value.push({ name: name, fn: fn });
    },

    /** @description 移除需要滚动触发的函数 */
    removeScrollFn(name: string) {
      const index = scrollFns.value.findIndex((item) => item.name === name);
      scrollFns.value.splice(index, 1);
    },

    /** @description 设置技能索引 */
    setSkillIndex(index: number) {
      setTimeout(() => {
        skill_index.value = index;
      }, 500);
    },

    /** @description 设置技能选择函数 */
    setSkillSelectFn(fn: () => void) {
      skillSelectFn.value = fn;
    },

    /** @description 设置需要切换皮肤触发的函数 */
    setSkinToggleFn(fn: SkinToggleFn) {
      skinToggleFns.value.push(fn);
    },

    /** @description 切换皮肤时触发 */
    skinToggle(hero_id: number, skin_name: string) {
      skinToggleFns.value.forEach((item) => {
        item(hero_id, skin_name);
      });
    },

    /** @description 设置关系信息 */
    setRelationInfo(data: Game.Hero.RelationType) {
      const res = GAME_HERO.getHeroRelationshipDesc(data.id, hero_info.value.id);
      relation_info.value = {
        ...data,
        reply: res.desc || "？",
        replyGender: res.gender === "男" ? "nan" : "nv",
        replyRelation: res.relation || "？",
      };
    },

    /** @description 获取设置皮肤语音 */
    setSkinVoice(hero_id: number, skin_name: string) {
      skin_voice.value = GAME_HERO.getSkinVoice(hero_id, skin_name).voice || [];
    },

    /** @description 点击技能后触发 */
    skillToggler(index: number) {
      skillSelectFn.value(index);
    },

    /** @description 重置关系信息、切换皮肤触发函数、语音列表 */
    resetStatus() {
      skin_voice.value = [];
      skinToggleFns.value = [];
      relation_info.value = {
        reply: "？",
        replyRelation: "？",
        desc: "？",
        replyGender: "",
        relation: "？",
        id: 0,
        heroName: "？",
        avatar: getImgLink("unknown"),
      };
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { HeroDetailStore };
