import { onScopeDispose, ref } from "vue";

import { useCloseToStore } from "../../../../../common/hooks/useCloseToStore";

import { LOCAL_HERO, KVP_HERO, LOCAL_TYPE } from "@/api";
import { _formatSeconds, _promiseTimeout, _random } from "@/utils/tool";
import { AuthStore, KnapsackStore } from "@/store";
import { $message, $obtain, $tip } from "@/utils/busTransfer";
import { $msgTipText, CUSTOM_TIP, GAME_CONFIG, GAME_PROP } from "@/config";
import { _getPropLink } from "@/utils/concise";
import { useSetMarker } from "@/hooks";

/**
 * @description 海报竞猜
 * @param closeActivity 关闭当前游戏及活动
 * @param closeGame 关闭当前游戏
 */
const useGuessPoster = (closeActivity: () => void, closeGame: () => Promise<void>) => {
  const $knapsackStore = KnapsackStore();
  const $authStore = AuthStore();

  const { addStatusMarkerNum } = useSetMarker();

  /** 当前皮肤ID */
  let skin_id = 0;
  /** 当前英雄ID */
  let hero_id = 0;
  /** hook否被销毁 */
  let is_destroyed = false;
  /** 秒 */
  let seconds = 20;
  /** 完整的皮肤列表 */
  let complete_skin_list: number[] = [];
  /** 英雄名键值表 */
  let kvp_hero_names: Record<number, string> = {};
  /** 皮肤名键值表 */
  let kvp_skin_names: Record<number, string> = {};
  /** 皮肤类型键值表 */
  let skin_type_kvp: Record<number, number> = {};
  /** 皮肤所属英雄键值表 */
  let kvp_skin_hero: Record<number, number> = {};
  /** 皮肤图片键值表 */
  let kvp_skin_img: Record<number, Omit<Remote.Skin.Image, "id">> = {};
  /** 需要过滤的皮肤ID */
  let skin_ids: number[] = [];
  /** 需要过滤的情侣皮肤类型ID */
  let filter_types: number[] = [];
  /** 需要过滤的同封面皮肤ID
   * 乒乓鲁班
   */
  const filter_sames: number[] = [1127, 5252];

  const ExposeData = {
    /** 当前输入的答案 */
    answer: ref(""),
    /** 当前展示的海报 */
    poster: ref(""),
    /** 正确答案的完整文本，英雄-皮肤名 */
    right_answer: ref(""),
    /** 状态文本 */
    status_text: ref(""),
    /** 当前可领取的竞猜币 */
    guess_coin: ref(GAME_CONFIG.GUESS_COIN_REWARD_RANGE[1]),
    /** 今日已竞猜次数 */
    guess_count: ref(0),
    /** 是否处于竞猜中 */
    guessing: ref(false),
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
    /** 答案状态 0-回答中 1-回答正确 2-回答错误 */
    answer_status: ref<0 | 1 | 2>(0),
    /** 倒计时 */
    countdown: ref<string[]>(["2", "0"]),
  };
  const {
    answer_status,
    answer,
    countdown,
    loading,
    poster,
    reveal,
    right_answer,
    running,
    show_receive,
    show_status,
    status_text,
    guess_coin,
    guessing,
    guess_count,
  } = ExposeData;

  //筛选情侣皮肤ID
  LOCAL_TYPE.getTypeSkinList().then((res) => {
    filter_types = res.filter((item) => item.alias === "情侣").map((item) => item.id);
  });

  /* 保存配置 */
  const saveConfig = () => {
    $authStore.updateUserData({
      guess: {
        poster: {
          guessing: guessing.value,
          skinIds: skin_ids,
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
    /** @description 随机挑选一张海报 */
    randomPoster() {
      if (guess_count.value >= GAME_CONFIG.GUESS_COUNT_LIMIT) {
        closeGame();
        $message($msgTipText("xv24", { v: "竞猜次数" }), "error");
        return;
      }
      answer.value = "";
      seconds = 20;
      reveal.value = false;
      loading.value = true;
      countdown.value = ["2", "0"];

      //过滤无可用海报的皮肤ID
      const skin_list = complete_skin_list.filter((item) => {
        return (
          !skin_ids.includes(item) &&
          !filter_types.includes(skin_type_kvp[item]) &&
          !filter_sames.includes(item)
        );
      });

      //可用海报数量低于51个
      if (skin_list.length <= 50) {
        closeGame();
        $message($msgTipText("kq91", { type: "海报", num: 50, goods: "皮肤" }), "error");
        return;
      }

      //设置随机技能索引
      const index = _random(0, skin_list.length - 1);
      skin_id = skin_list[index];

      //海报加载成功后喀什倒计时，加载失败则重新调用
      const link = kvp_skin_img[skin_list[index]].cover;
      const img = new Image();
      img.src = link;
      img.onload = () => {
        if (is_destroyed) return;
        poster.value = link;
        loading.value = false;
        guessing.value = true;
        guess_count.value++;

        saveConfig();
        addStatusMarkerNum("POSTER_GUESS_COUNT");
        setTimeout(startCountdown, 2000);

        //通过皮肤ID获取英雄ID
        hero_id = kvp_skin_hero[skin_id];
      };
      img.onerror = randomPoster;
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
        addStatusMarkerNum("POSTER_GUESS_WRONG_COUNT");
      }

      await _promiseTimeout(2000);

      show_status.value = true;
      right_answer.value = `${kvp_hero_names[hero_id]}-${kvp_skin_names[skin_id]}`;

      if (is_right) {
        skin_ids.push(skin_id);
        show_receive.value = true;
        answer_status.value = 1;
        status_text.value = "回答正确，是否继续答题？";
      } else {
        guess_coin.value = GAME_CONFIG.GUESS_COIN_REWARD_RANGE[0];
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
  const { randomPoster } = ExposeMethods;

  /* 使用用户配置 */
  const useUserConfig = async () => {
    const { skinIds, guessing, guessCount } = $authStore.user_data.guess.poster;
    skin_ids = skinIds;
    guess_count.value = guessCount;

    kvp_hero_names = await KVP_HERO.getHeroNameKvp();
    kvp_skin_names = await KVP_HERO.getSkinNameKvp();
    skin_type_kvp = await KVP_HERO.getSkinTypeKvp();
    kvp_skin_img = await KVP_HERO.getSkinImageKvp();
    kvp_skin_hero = await KVP_HERO.getSkinHeroKvp();
    complete_skin_list = await LOCAL_HERO.getSkinList();

    //如果上次未正常退出，扣除竞猜券
    if (guessing) {
      saveConfig();
      setTimeout(() => {
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
              randomPoster();
            }, 1000);
          },
        });
      }, 1000);
    } else {
      setTimeout(randomPoster, 1000);
    }
  };
  useUserConfig();

  onScopeDispose(() => {
    is_destroyed = true;
  });

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useGuessPoster };
