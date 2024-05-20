import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { taskSort } from "../helper/taskStore";

import { AuthStore } from "./auth";

import type { TaskType } from "@/config/interface";
import { DEFAULT, GAME_CONFIG, GAME_PROP } from "@/config";
import { $obtain } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";
import type { TaskStoreType } from "@/store/interface";
import { _accumulate, _decimal } from "@/utils/tool";

/** @description 任务相关 */
const TaskStore = defineStore("task", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 任务列表 */
    task_list: ref<TaskType[]>(GAME_CONFIG.TASK_LIST()),
    /** 任务数据记录 */
    task_status: ref<Game.Task>(DEFAULT.userInfoDefault().taskStatus),
  };
  const { task_list, task_status } = ExposeData;

  const ExposeComputed = {
    /** 今日任务列表 */
    today_task_list: computed(() => {
      const data = task_list.value.filter((item) => item.type === "DAILY");
      //可领取置顶，已领取置底
      taskSort(data);

      return data;
    }),
    /** 本周任务列表 */
    week_task_list: computed(() => {
      const data = task_list.value.filter((item) => item.type === "WEEKLY");
      //可领取置顶，已领取置底
      taskSort(data);

      return data;
    }),
    /** 是否存在可领取的任务 */
    exist_receive: computed(() => {
      return task_list.value.some((item) => {
        const total_sum = _accumulate(item.schedule, "total");
        const value_sum = _accumulate(item.schedule, "value");
        const v = value_sum === 0 ? 0 : _decimal([value_sum, total_sum, 100], ["/", "*"], 0);

        return v >= 100 && !item.receive;
      });
    }),
  };

  /** @description 保存已领取奖励的任务ID组及任务数据状态 */
  const saveTaskStatus = () => {
    const taskFinish: string[] = task_list.value
      .filter((item) => item.receive)
      .map((item) => item.id);

    $authStore.updateUserData({
      taskFinish,
      taskStatus: task_status.value,
    });
  };

  const ExposeMethods = {
    /** @description 使用用户任务状态数据
     * @param finish 已领取奖励的任务ID组
     * @param status 任务数据状态
     */
    useUserTask(finish: User.Data["taskFinish"], status: User.Data["taskStatus"]) {
      task_list.value.forEach((item) => {
        if (finish.includes(item.id)) {
          item.receive = true;
          item.schedule.forEach((item) => {
            item.value = item.total;
          });
        }
      });

      for (const key in status) {
        const k = key as keyof Game.Task;
        this.setTaskStatus(k, status[k], true);
      }
    },

    /** @description 设置任务数据记录
     * @param key 任务状态键名
     * @param scheduleValue 任务状态值
     * @param restore 是否应用于恢复用户配置
     */
    setTaskStatus(key: keyof Game.Task, scheduleValue: number, restore: boolean = false) {
      //设置任务状态
      if (restore) {
        (task_status.value[key] as number) = scheduleValue as number;
      } else {
        (task_status.value[key] as number) += scheduleValue as number;
      }

      //设置进度值
      task_list.value.forEach((task) => {
        //设置任务进度
        const setTaskSchedule = (info: TaskStoreType.TaskSchedule) => {
          const { taskId, data, once } = info;
          if (task.id === taskId) {
            data.forEach((item) => {
              if (key === item.key) {
                const index = task.schedule.findIndex((schedule) => schedule.label === item.label);
                const total = task.schedule[index].total;
                let value = task.schedule[index].value;

                //是否为使用用户任务配置时调用，是则直接赋值
                if (restore) {
                  task.schedule[index].value = scheduleValue > total ? total : scheduleValue;
                } else if (value < total) {
                  //是否为单次任务
                  if (once) {
                    task.schedule[index].value = 1;
                  } else {
                    value += scheduleValue;
                    task.schedule[index].value = value > total ? total : value;
                  }
                }
              }
            });
          }
        };

        //在线奖励
        setTaskSchedule({
          once: false,
          taskId: "de89",
          data: [
            {
              key: "today_online_duration",
              label: "今日已在线",
            },
          ],
        });

        //每日消费
        setTaskSchedule({
          once: true,
          taskId: "qw27",
          data: [
            {
              key: "today_gold_consume",
              label: "今日已消费金币",
            },
            {
              key: "today_diamond_consume",
              label: "今日已消费钻石",
            },
          ],
        });

        //每日夺宝
        setTaskSchedule({
          once: true,
          taskId: "mx25",
          data: [
            {
              key: "today_hero_lottery",
              label: "今日英雄夺宝",
            },
            {
              key: "today_skin_lottery",
              label: "今日皮肤夺宝",
            },
          ],
        });

        //双倍的诱惑
        setTaskSchedule({
          once: true,
          taskId: "r88v",
          data: [
            {
              key: "today_double_gold_card",
              label: "今日已使用双倍金币卡",
            },
            {
              key: "today_double_exp_card",
              label: "今日已使用双倍经验卡",
            },
          ],
        });

        //每日补给
        setTaskSchedule({
          once: true,
          taskId: "sp37",
          data: [
            {
              key: "today_hero_supply",
              label: "今日英雄夺宝补给领取",
            },
            {
              key: "today_skin_supply",
              label: "今日皮肤夺宝补给领取",
            },
          ],
        });

        //英雄夺宝达人
        setTaskSchedule({
          once: false,
          taskId: "d1b7",
          data: [
            {
              key: "today_hero_coin",
              label: "今日已消耗夺宝币",
            },
            {
              key: "today_hero_stone",
              label: "今日已消耗夺宝石",
            },
          ],
        });

        //皮肤夺宝达人
        setTaskSchedule({
          once: false,
          taskId: "q35i",
          data: [
            {
              key: "today_skin_coin",
              label: "今日已消耗夺宝币",
            },
            {
              key: "today_skin_stone",
              label: "今日已消耗夺宝石",
            },
          ],
        });

        //免费英雄夺宝石
        setTaskSchedule({
          once: false,
          taskId: "o1u8",
          data: [
            {
              key: "today_hero_supply",
              label: "今日已获取夺宝石",
            },
          ],
        });

        //免费皮肤夺宝石
        setTaskSchedule({
          once: false,
          taskId: "vk13",
          data: [
            {
              key: "today_skin_supply",
              label: "今日已获取夺宝石",
            },
          ],
        });

        //本周在线时长
        setTaskSchedule({
          once: false,
          taskId: "q20y",
          data: [
            {
              key: "week_online_duration",
              label: "本周已在线",
            },
          ],
        });

        //本周本周登录天数
        setTaskSchedule({
          once: false,
          taskId: "a21l",
          data: [
            {
              key: "week_login_day",
              label: "本周已登录",
            },
          ],
        });

        //天天领取夺宝石
        setTaskSchedule({
          once: true,
          taskId: "a6b9",
          data: [
            {
              key: "week_hero_stone_card",
              label: "本周英雄夺宝石周卡",
            },
            {
              key: "week_skin_stone_card",
              label: "本周皮肤夺宝石周卡",
            },
          ],
        });

        //一块都没有了
        setTaskSchedule({
          once: false,
          taskId: "pc22",
          data: [
            {
              key: "week_zero_supply",
              label: "本周用完某日英雄或皮肤夺宝石补给站额度",
            },
          ],
        });

        //夺宝狂魔
        setTaskSchedule({
          once: false,
          taskId: "om70",
          data: [
            {
              key: "week_hero_coin",
              label: "本周消耗英雄夺宝币",
            },
            {
              key: "week_skin_coin",
              label: "本周消耗皮肤夺宝币",
            },
          ],
        });
      });

      saveTaskStatus();
    },

    /** @description 领取任务奖励
     * @param id 任务id
     */
    receiveTaskReward(id: string) {
      const index = task_list.value.findIndex((task) => task.id === id);
      task_list.value[index].receive = true;

      //格式化奖励
      const obtain = task_list.value[index].props.map(({ num, key }) => {
        return {
          num,
          name: GAME_PROP.NAME[key],
          key,
          icon: _getPropLink(GAME_PROP.ICON[key]),
        };
      });
      $obtain(obtain);
      saveTaskStatus();
    },

    /** @description 新的一天/周，重置昨日任务
     * @param type 任务为每日任务还是周任务
     */
    resetDayWeekTask(type: "DAY" | "WEEK") {
      if (type === "DAY") {
        //将初始任务列表转化为对象
        const TASK_LIST: Record<string, TaskType> = {};
        GAME_CONFIG.TASK_LIST().forEach((item) => {
          TASK_LIST[item.id] = item;
        });

        //重置昨日任务
        for (let i = 0; i < task_list.value.length; i++) {
          const item = task_list.value[i];
          if (item.type === "DAILY") {
            task_list.value[i] = TASK_LIST[item.id];
          }
        }

        //重置昨日状态
        const initial_status: Record<string, any> = {};
        for (const key in DEFAULT.userInfoDefault().taskStatus) {
          if (key.includes("today")) {
            initial_status[key as keyof Game.Task] =
              DEFAULT.userInfoDefault().taskStatus[key as keyof Game.Task];
          }
        }

        task_status.value = {
          ...task_status.value,
          ...initial_status,
        };
      } else {
        //如果是新的一周，则重置所有
        this.resetTask();
      }

      saveTaskStatus();
    },

    /** @description 退出登录重置任务 */
    resetTask() {
      task_list.value = GAME_CONFIG.TASK_LIST();
      task_status.value = DEFAULT.userInfoDefault().taskStatus;
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { TaskStore };
