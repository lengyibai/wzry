import { computed, onScopeDispose, ref } from "vue";

import { useCloseToStore } from "../../../../../common/hooks/useCloseToStore";

import { LOCAL_HERO, KVP_HERO } from "@/api";
import { _formatSeconds, _promiseTimeout, _random } from "@/utils/tool";
import { AuthStore, KnapsackStore } from "@/store";
import { $message, $obtain, $tip } from "@/utils/busTransfer";
import { $msgTipText, CUSTOM_TIP, GAME_CONFIG, GAME_PROP } from "@/config";
import { _getPropLink } from "@/utils/concise";
import { useSetMarker } from "@/hooks";

/**
 * @description 技能竞猜
 * @param closeActivity 关闭当前游戏及活动
 * @param closeGame 关闭当前游戏
 */
const useGuessSkill = (closeActivity: () => void, closeGame: () => Promise<void>) => {
  const $knapsackStore = KnapsackStore();
  const $authStore = AuthStore();

  const { addStatusMarkerNum } = useSetMarker();

  /** 剩余秒数 */
  let seconds = 20;
  /** 当前英雄ID */
  let hero_id = 0;
  /** 是否可以点击技能 */
  let can_click_skill = true;
  /** hook否被销毁 */
  let is_destroyed = false;
  /** 完整的英雄列表 */
  let complete_hero_list: number[] = [];
  /** 英雄技能列表键值表 */
  let kvp_hero_skill: Record<number, Remote.Skill.Info[][]> = {};
  /** 英雄名键值表 */
  let kvp_hero_names: Record<number, string> = {};
  /** 需要过滤的技能索引，以英雄ID为键，技能索引数组为值 */
  let filter_skill_indexes: Record<number, number[]> = {};
  /** 需要过滤的英雄ID */
  const filter_hero_ids: number[] = [];

  const ExposeData = {
    /** 当前输入的答案 */
    answer: ref(""),
    /** 当前英雄名称 */
    hero_name: ref(""),
    /** 状态文本 */
    status_text: ref(""),
    /** 当前选择答题的技能索引 */
    skill_index: ref(-1),
    /** 当前可领取的竞猜币 */
    guess_coin: ref(GAME_CONFIG.GUESS_COIN_REWARD_RANGE[1]),
    /** 今日已竞猜次数 */
    guess_count: ref(0),
    /** 答案状态 0-回答中 1-回答正确 2-回答错误 */
    answer_status: ref<0 | 1 | 2>(0),
    /** 是否公布答案 */
    reveal: ref(false),
    /** 图片是否处于加载中 */
    loading: ref(false),
    /** 是否显示领取 */
    show_receive: ref(false),
    /** 是否显示回答状态 */
    show_status: ref(false),
    /** 是否处于倒计时中 */
    running: ref(false),
    /** 是否处于竞猜中 */
    guessing: ref(false),
    /** 是否显示题目 */
    show_question: ref(false),
    /** 当前选择的技能信息 */
    skill: ref<Remote.Skill.Info>(),
    /** 倒计时 */
    countdown: ref<string[]>(["2", "0"]),
    /** 技能列表 */
    skill_list: ref<Remote.Skill.Info[]>([]),
    /** 当前技能列表已回答正确的技能索引列表 */
    right_skill_index_list: ref<number[]>([]),
  };
  const {
    answer_status,
    answer,
    countdown,
    hero_name,
    loading,
    reveal,
    running,
    show_receive,
    show_status,
    status_text,
    guess_coin,
    guessing,
    right_skill_index_list,
    skill_index,
    show_question,
    skill,
    skill_list,
    guess_count,
  } = ExposeData;

  const ExposeComputed = {
    /** @description 展示的技能列表 */
    show_skill_list: computed({
      get() {
        return skill_list.value.filter(
          (_, index) => skill_index.value === -1 || skill_index.value === index,
        );
      },
      set(v) {
        skill_list.value = v;
      },
    }),
  };

  /* 保存配置 */
  const saveConfig = () => {
    $authStore.updateUserData({
      guess: {
        skill: {
          guessing: guessing.value,
          skillIds: filter_skill_indexes,
          guessCount: guess_count.value,
        },
      },
    });
  };

  /* 开始倒计时 */
  const startCountdown = () => {
    answer_status.value = 0;
    running.value = true;

    setTimeout(() => {
      if (reveal.value || is_destroyed) return;

      //倒计时结束自动提交答案
      if (seconds <= 0) {
        ExposeMethods.submitAnswer();
        return;
      }

      seconds--;

      //从16秒开始每减少一秒，竞猜币减少三枚
      if (guess_coin.value > GAME_CONFIG.GUESS_COIN_REWARD_RANGE[0] && seconds <= 16) {
        guess_coin.value -= 3;
      }

      countdown.value = _formatSeconds(seconds, "SEC");
      startCountdown();
    }, 1000);
  };

  const ExposeMethods = {
    /** @description 随机技能 */
    randomSkill() {
      if (guess_count.value >= GAME_CONFIG.GUESS_COUNT_LIMIT) {
        closeGame();
        $message($msgTipText("xv24", { v: "竞猜次数" }), "error");
        return;
      }

      answer.value = "";
      seconds = 20;
      skill_index.value = -1;
      reveal.value = false;
      can_click_skill = true;
      countdown.value = ["2", "0"];

      //过滤无可用技能的英雄ID
      const efficient_hero_id_list = complete_hero_list.filter((id) => {
        return !filter_hero_ids.includes(id);
      });

      //可用技能的英雄低于四个
      if (efficient_hero_id_list.length <= 3) {
        closeGame();
        $message($msgTipText("kq91", { type: "技能", num: 10, goods: "英雄" }), "error");
        return;
      }

      //设置随机英雄ID
      hero_id = efficient_hero_id_list[_random(0, efficient_hero_id_list.length - 1)];
      right_skill_index_list.value = filter_skill_indexes[hero_id] || [];

      //由于英雄存在多套技能，这里只需要第一套技能列表
      const first_skill_list = kvp_hero_skill?.[hero_id]?.[0];

      //当前英雄是否所有技能都回答正确过
      const all_right = first_skill_list.every((_, index) => {
        return filter_skill_indexes[hero_id]?.includes(index);
      });

      //如果该英雄所有技能都回答正确过，则重新生成题目
      if (all_right) {
        filter_hero_ids.push(hero_id);
        randomSkill();
        return;
      }

      hero_name.value = kvp_hero_names[hero_id];
      skill_list.value = first_skill_list;
    },

    /**
     * @description 选择技能索引进行答题
     * @param index 点击的技能索引
     */
    async selectSkillIndex(index: number) {
      if (filter_skill_indexes[hero_id]?.includes(index)) return;
      if (!can_click_skill) return;
      skill.value = skill_list.value[index];
      can_click_skill = false;
      loading.value = true;
      skill_index.value = index;

      await _promiseTimeout(500);

      const img = new Image();
      img.src = skill.value.img;

      img.onload = () => {
        if (is_destroyed) return;
        loading.value = false;
        guessing.value = true;
        show_question.value = true;
        guess_count.value++;

        saveConfig();
        addStatusMarkerNum("SKILL_GUESS_COUNT");
        setTimeout(startCountdown, 1500);
      };
      img.onerror = randomSkill;

      saveConfig();
    },

    /**
     * @description 提交答案
     * @param answer 英雄名称
     */
    async submitAnswer() {
      if (!running.value) return;
      const is_right = answer.value === kvp_hero_names[hero_id];
      reveal.value = true;
      running.value = false;

      if (!is_right) {
        addStatusMarkerNum("SKILL_GUESS_WRONG_COUNT");
      }

      await _promiseTimeout(2000);

      show_status.value = true;

      if (answer.value === kvp_hero_names[hero_id]) {
        filter_skill_indexes[hero_id] ??= [];
        filter_skill_indexes[hero_id].push(skill_index.value);
        show_receive.value = true;
        answer_status.value = 1;
        status_text.value = "回答正确，是否继续答题？";
      } else {
        guess_coin.value = GAME_CONFIG.GUESS_COIN_REWARD_RANGE[1];
        answer_status.value = 2;
        status_text.value = "回答错误，已扣除竞猜券，是否继续答题？";
        $knapsackStore.setGamePropNum("GUESS_CARD", 1, "SUB");
      }

      guessing.value = false;
      saveConfig();
    },

    /** @description 领取竞猜币 */
    receiveGuessCoin() {
      //发放竞猜币
      $obtain(
        {
          name: GAME_PROP.NAME["GUESS_COIN"],
          icon: _getPropLink(GAME_PROP.ICON["GUESS_COIN"]),
          key: "GUESS_COIN",
          num: guess_coin.value,
        },
        () => {
          show_receive.value = false;
          guess_coin.value = GAME_CONFIG.GUESS_COIN_REWARD_RANGE[1];
        },
      );
    },

    /** @description 设置显示答案状态文本 */
    setShowStatus(v: boolean) {
      show_status.value = v;
    },
  };
  const { randomSkill } = ExposeMethods;

  /* 使用用户配置 */
  const useUserConfig = async () => {
    const { skillIds, guessing, guessCount } = $authStore.user_data.guess.skill;
    filter_skill_indexes = skillIds;
    guess_count.value = guessCount;

    kvp_hero_skill = await KVP_HERO.getHeroSkillListKvp();
    kvp_hero_names = await KVP_HERO.getHeroNameKvp();
    complete_hero_list = await LOCAL_HERO.getHeroList();

    //如果上次未正常退出，扣除竞猜券
    if (guessing) {
      saveConfig();
      setTimeout(() => {
        //上次未正常退出，扣除竞猜券
        $knapsackStore.setGamePropNum("GUESS_CARD", 1, "SUB");

        $tip({
          text: CUSTOM_TIP.j33c,
          align: "right-bottom",
          color: false,
          btnText: "确定",
          btnFn() {
            setTimeout(() => {
              //当竞猜券恰好被扣完，则退出竞猜并前往道具商店
              if (useCloseToStore(closeActivity, closeGame)) return;
              randomSkill();
            }, 1000);
          },
        });
      }, 1000);
    } else {
      setTimeout(randomSkill, 1000);
    }
  };
  useUserConfig();

  onScopeDispose(() => {
    is_destroyed = true;
  });

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
};

export { useGuessSkill };
