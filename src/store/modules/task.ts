import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";

import { TaskType } from "@/config/interface";
import { GAME_CONFIG, GAME_PROP } from "@/config";
import { $obtain } from "@/utils/busTransfer";
import { _getImgLink } from "@/utils/concise";

/** @description 任务相关 */
const TaskStore = defineStore("task", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 任务列表 */
    task_list: ref<TaskType[]>(GAME_CONFIG.TASK_LIST),
  };
  const { task_list } = ExposeData;

  const ExposeComputed = {
    today_task_list: computed(() => {
      const data = task_list.value.filter((item) => item.type === "DAILY");
      //可领取置顶，已领取置底
      data.sort((a) => {
        if (a.receive) return 1;
        if (a.schedule >= a.total && !a.receive) return 0;
        return -1;
      });

      return data;
    }),
    week_task_list: computed(() => {
      const data = task_list.value.filter((item) => item.type === "WEEKLY");
      //可领取置顶，已领取置底
      data.sort((a) => {
        if (a.receive) return 1;
        if (a.schedule >= a.total && !a.receive) return 0;
        return -1;
      });

      return data;
    }),
  };

  /* 保存任务状态 */
  const saveTaskStatus = () => {
    const task_status: Game.Task[] = task_list.value.map((item) => {
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
        task_list.value.forEach((task, index) => {
          if (userTask.id === task.id) {
            task_list.value[index] = { ...task, ...userTask };
          }
        });
      });
    },

    /** @description 领取任务奖励 */
    receiveTaskReward(id: string) {
      const index = task_list.value.findIndex((task) => task.id === id);
      task_list.value[index].receive = true;

      //格式化奖励
      const obtain = task_list.value[index].props.map((item) => {
        const prop = GAME_PROP[item.type];
        return {
          icon: _getImgLink(prop.iconName),
          name: prop.label,
          num: item.num,
        };
      });
      $obtain(obtain);
      saveTaskStatus();
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { TaskStore };
