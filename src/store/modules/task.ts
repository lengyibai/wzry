import { defineStore } from "pinia";
import { ref } from "vue";

import { AuthStore } from "./auth";

import { TaskType } from "@/config/interface";
import { GAME_CONFIG } from "@/config";

/** @description 任务相关 */
const TaskStore = defineStore("task", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 今日任务列表 */
    today_task_list: ref<TaskType[]>(GAME_CONFIG.TODAY_TASK_LIST),
    /** 本周任务列表 */
    week_task_list: ref<TaskType[]>(GAME_CONFIG.WEEK_TASK_LIST),
  };
  const { today_task_list, week_task_list } = ExposeData;

  /* 保存任务状态 */
  const saveTaskStatus = () => {
    const task_list = [...today_task_list.value, ...week_task_list.value];

    const task_status: Game.Task[] = task_list.map((item) => {
      const { id, schedule, receive } = item;
      return {
        id,
        schedule,
        receive,
      };
    });

    $authStore.updateUserData({
      task: task_status,
    });
  };

  const ExposeMethods = {
    /** @description 使用用户任务状态数据 */
    useUserTask(v: Global.UserData["task"]) {
      v.forEach((userTask) => {
        today_task_list.value.forEach((task, index) => {
          if (userTask.id === task.id) {
            today_task_list.value[index] = { ...task, ...userTask };
          }
        });
        week_task_list.value.forEach((task, index) => {
          if (userTask.id === task.id) {
            week_task_list.value[index] = { ...task, ...userTask };
          }
        });
      });
    },

    /** @description 领取任务奖励 */
    receiveTaskReward(id: number) {
      // const task_list = [...today_task_list.value, ...week_task_list.value];
      // task_list.forEach((task) => {
      //   if (task.id === id) {
      //     task.receive = true;
      //   }
      // });
      // saveTaskStatus();
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
});

export { TaskStore };
