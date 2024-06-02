import { defineStore } from "pinia";
import { ref } from "vue";

import { AuthStore } from "./auth";
import { TaskStore } from "./task";

import { $confirmText, $msgTipText, GAME_CONFIG, MESSAGE_TIP } from "@/config";
import { $confirm, $message } from "@/utils/busTransfer";
import { _formatSeconds, dayjs } from "@/utils/tool";
import { usePlayAudio } from "@/hooks/modules/usePlayAudio";

/** @description 夺宝石补给 */
const SupplyStore = defineStore("supply", () => {
  const $authStore = AuthStore();
  const $taskStore = TaskStore();

  const { playAudio } = usePlayAudio();

  /** 英雄夺宝补给计时器 */
  let hero_timer: NodeJS.Timeout;
  /** 皮肤夺宝补给计时器 */
  let skin_timer: NodeJS.Timeout;
  /** 是否已退出登录 */
  let is_logout = false;

  const ExposeData = {
    /** 英雄夺宝今日剩余补给数量 */
    hero_supply_remain_num: ref(0),
    /** 皮肤夺宝今日剩余补给数量 */
    skin_supply_remain_num: ref(0),
    /** 英雄夺宝补给当前秒数 */
    hero_seconds: ref(0),
    /** 皮肤夺宝补给当前秒数 */
    skin_seconds: ref(0),
    /** 英雄夺宝补给开始时间 */
    hero_start_time: ref(0),
    /** 皮肤夺宝补给开始时间 */
    skin_start_time: ref(0),
    /** 英雄补给状态 */
    hero_supply_status: ref<Game.LotterySupply.Status>("IDLE"),
    /** 皮肤补给状态 */
    skin_supply_status: ref<Game.LotterySupply.Status>("IDLE"),
    /** 英雄夺宝石补给倒计时 */
    hero_countdown: ref<string[]>(["0", "0", "0", "0", "0", "0"]),
    /** 皮肤夺宝石补给倒计时 */
    skin_countdown: ref<string[]>(["0", "0", "0", "0", "0", "0"]),
    /** 英雄夺宝补给模式 */
    hero_mode: ref<Game.LotterySupply.Mode>(),
    /** 英雄夺宝补给模式 */
    skin_mode: ref<Game.LotterySupply.Mode>(),
  };
  const {
    hero_supply_remain_num,
    skin_supply_remain_num,
    hero_mode,
    skin_mode,
    hero_start_time,
    skin_start_time,
    hero_supply_status,
    skin_supply_status,
    hero_seconds,
    skin_seconds,
    hero_countdown,
    skin_countdown,
  } = ExposeData;

  /** @description 通过开始时间计算出剩余时间
   * @param startTime 开始时间
   * @param mode 补给模式
   */
  const getSurplusTime = (startTime: number, mode: Game.LotterySupply.Mode) => {
    const now_time = dayjs().unix();
    const pass_time = now_time - startTime;

    const surplus_time = mode.seconds - pass_time;
    return surplus_time >= 0 ? surplus_time : 0;
  };

  /** @description 保存游戏数据 */
  const saveGameData = () => {
    $authStore.updateUserData({
      supply: {
        hero: {
          supply_remain_num: hero_supply_remain_num.value,
          status: hero_supply_status.value,
          mode: hero_mode.value,
          startTime: hero_start_time.value,
        },
        skin: {
          supply_remain_num: skin_supply_remain_num.value,
          status: skin_supply_status.value,
          mode: skin_mode.value,
          startTime: skin_start_time.value,
        },
      },
    });
  };

  const ExposeMethods = {
    /** @description 使用用户补给数据
     * @param v 用户补给数据
     */
    useUserSupply(v: User.Data["supply"]) {
      is_logout = false;
      const updateSupply = (type: "HERO" | "SKIN") => {
        const supply_data = v[type.toLowerCase() as "hero" | "skin"];
        const supply_remain_num = type === "HERO" ? hero_supply_remain_num : skin_supply_remain_num;
        const mode = type === "HERO" ? hero_mode : skin_mode;
        const start_time = type === "HERO" ? hero_start_time : skin_start_time;
        const supply_status = type === "HERO" ? hero_supply_status : skin_supply_status;
        const seconds = type === "HERO" ? hero_seconds : skin_seconds;

        supply_remain_num.value = supply_data.supply_remain_num;
        mode.value = supply_data.mode;
        start_time.value = supply_data.startTime;
        supply_status.value = supply_data.status;
        seconds.value = getSurplusTime(start_time.value, mode.value!);

        if (["RUNNING", "RECEIVE"].includes(supply_data.status)) {
          this.enableCountdown(type);
        }
      };

      //更新英雄和皮肤的补给数据
      updateSupply("HERO");
      updateSupply("SKIN");

      //监听浏览器状态
      window.addEventListener("visibilitychange", () => {
        if (is_logout) return;

        //当重新进入网页时，重新计算剩余时间并启动倒计时
        if (document.visibilityState === "visible") {
          hero_seconds.value = getSurplusTime(hero_start_time.value, hero_mode.value!);
          skin_seconds.value = getSurplusTime(skin_start_time.value, skin_mode.value!);
          this.enableCountdown("HERO");
          this.enableCountdown("SKIN");
        } else {
          //当离开网页时，清除计时器
          clearInterval(hero_timer);
          clearInterval(skin_timer);
        }
      });
    },

    /** @description 签到 */
    sign() {
      hero_supply_remain_num.value = 200;
      skin_supply_remain_num.value = 200;
    },

    /** @description 设置补给剩余数量
     * @param type 补给类型
     * @param v 补给数量
     */
    setSupplyRemainNum(type: "HERO" | "SKIN", v: number) {
      const supply_remain_num = type === "HERO" ? hero_supply_remain_num : skin_supply_remain_num;
      supply_remain_num.value -= v;

      //一块都没有了
      if (supply_remain_num.value === 0) {
        $taskStore.setTaskStatus("week_zero_supply", 1);
      }

      saveGameData();
    },

    /** @description 设置补给状态
     * @param type 补给类型
     * @param status 补给状态
     */
    setSupplyStatus(type: "HERO" | "SKIN", status: Game.LotterySupply.Status) {
      const supply_status = type === "HERO" ? hero_supply_status : skin_supply_status;
      supply_status.value = status;

      saveGameData();
    },

    /** @description 设置补给模式
     * @param type 补给类型
     * @param index 补给模式索引
     */
    setTimeMode(type: "HERO" | "SKIN", index: number) {
      const supply_status = type === "HERO" ? hero_supply_status : skin_supply_status;
      const mode = type === "HERO" ? hero_mode : skin_mode;
      supply_status.value = "READY";
      mode.value = GAME_CONFIG.LOTTERY_SUPPLY_MODE[index];

      saveGameData();
    },

    /** @description 开始倒计时
     * @param type 补给类型
     */
    startCountdown(type: "HERO" | "SKIN") {
      const supply_remain_num =
        type === "HERO" ? hero_supply_remain_num.value : skin_supply_remain_num.value;
      const mode = type === "HERO" ? hero_mode : skin_mode;
      const supply_status = type === "HERO" ? hero_supply_status : skin_supply_status;
      const start_time = type === "HERO" ? hero_start_time : skin_start_time;
      const seconds = type === "HERO" ? hero_seconds : skin_seconds;
      const timer = type === "HERO" ? hero_timer : skin_timer;

      //如果可补给数量低于0，则提示明日再来
      if (supply_remain_num <= 0) {
        $message($msgTipText("xv24", { v: "补给额度" }), "error");
        return;
      }

      //如果当前选择的模式获得的补给数量大于剩余的补给数量
      if (supply_remain_num < mode.value!.count) {
        $confirm({
          text: $confirmText("ob55", { v: supply_remain_num }),
          confirm() {
            const newMode = GAME_CONFIG.LOTTERY_SUPPLY_MODE.findLast((item) => {
              return item.count <= supply_remain_num;
            });

            mode.value = newMode;
            supply_status.value = "READY";
          },
        });
        return;
      }

      //清除计时器并设置相关变量
      clearInterval(timer);
      start_time.value = dayjs().unix();
      supply_status.value = "RUNNING";
      seconds.value = mode.value!.seconds;
      this.enableCountdown(type);
    },

    /** @description 正式启动倒计时，为了兼容使用用户数据时启用
     * @param type 补给类型
     */
    enableCountdown(type: "HERO" | "SKIN") {
      const supplyStatus = type === "HERO" ? hero_supply_status : skin_supply_status;
      const seconds = type === "HERO" ? hero_seconds : skin_seconds;
      const countdown = type === "HERO" ? hero_countdown : skin_countdown;

      //如果处于运行或领取状态
      if (["RUNNING", "RECEIVE"].includes(supplyStatus.value)) {
        const timer = setInterval(() => {
          countdown.value = _formatSeconds(seconds.value);

          if (seconds.value === 0) {
            clearInterval(timer);
            supplyStatus.value = "RECEIVE";
            playAudio("bg51");
          } else {
            seconds.value--;
          }

          saveGameData();
        }, 1000);

        //根据类型保存计时器
        if (type === "HERO") {
          hero_timer = timer;
        } else {
          skin_timer = timer;
        }
      }
    },

    /** @description 终止倒计时
     * @param type 补给类型
     */
    stopCountdown(type: "HERO" | "SKIN") {
      const supplyStatus = type === "HERO" ? hero_supply_status : skin_supply_status;
      const seconds = type === "HERO" ? hero_seconds : skin_seconds;
      const countdown = type === "HERO" ? hero_countdown : skin_countdown;
      const mode = type === "HERO" ? hero_mode : skin_mode;
      const timer = type === "HERO" ? hero_timer : skin_timer;

      clearInterval(timer);

      //计算终止后的奖励
      const receive = GAME_CONFIG.LOTTERY_SUPPLY_MODE.filter((item) => {
        return item.seconds <= mode.value!.seconds - seconds.value;
      });

      seconds.value = 0;
      countdown.value = ["0", "0", "0", "0", "0", "0"];

      if (receive.length) {
        mode.value = receive[receive.length - 1];
        supplyStatus.value = "RECEIVE";
      } else {
        supplyStatus.value = "IDLE";
        $message(MESSAGE_TIP.nw29, "warning");
      }
    },

    /** @description 中止倒计时，用于退出登录时调用 */
    interruptCountdown() {
      is_logout = true;
      clearInterval(hero_timer);
      clearInterval(skin_timer);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { SupplyStore };
