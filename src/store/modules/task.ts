import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { taskSort } from "../helper/taskStore";

import { AuthStore } from "./auth";

import type { TaskSchedule, TaskType } from "@/config/interface";
import { DEFAULT, GAME_CONFIG, GAME_PROP } from "@/config";
import { $obtain } from "@/utils/busTransfer";
import { _getPropLink } from "@/utils/concise";
import { _accumulate, _decimal } from "@/utils/tool";
import { TASK_KV_LIST } from "@/config/modules/game-config";

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
      //判断是否应用于恢复用户配置，如果是，则直接赋值，否则追加进度
      if (restore) {
        task_status.value[key] = scheduleValue;
      } else {
        task_status.value[key] += scheduleValue;
      }

      //设置进度值
      task_list.value.forEach((userTask) => {
        const setTaskSchedule = (info: TaskSchedule) => {
          const { taskId, data, once } = info;

          //将用户的任务ID与任务配置ID匹配
          if (userTask.id === taskId) {
            //循环任务配置表的配置数据
            data.forEach((item) => {
              //将需要追加的任务数据Key与任务数据Key匹配
              if (key === item.key) {
                //将用户进度数据的label与任务配置数据的label匹配查找索引号
                const index = userTask.schedule.findIndex((schedule) => {
                  return schedule.label === item.label;
                });

                if (index !== -1) {
                  /** 获取用户任务进度总值 */
                  const total = userTask.schedule[index].total;
                  /** 获取用户任务当前进度值 */
                  const value = userTask.schedule[index].value;

                  //如果是用户使用用户任务数据，则使用用户的进度
                  if (restore) {
                    userTask.schedule[index].value = Math.min(scheduleValue, total);
                  }

                  //如果当前进度小于总值
                  else if (value < total) {
                    //如果任务是以次计算
                    if (once) {
                      userTask.schedule[index].value = 1;
                    } else {
                      userTask.schedule[index].value += scheduleValue;
                    }
                  }
                }
              }
            });
          }
        };

        TASK_KV_LIST().forEach((task) => setTaskSchedule(task));
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
