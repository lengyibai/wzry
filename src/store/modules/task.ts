import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";

import { TaskType } from "@/config/interface";
import { DEFAULT, GAME_CONFIG, GAME_PROP } from "@/config";
import { $obtain } from "@/utils/busTransfer";
import { _getImgLink } from "@/utils/concise";

/** @description 任务相关 */
const TaskStore = defineStore("task", () => {
  const $authStore = AuthStore();

  const ExposeData = {
    /** 任务列表 */
    task_list: ref<TaskType[]>([...GAME_CONFIG.TASK_LIST]),
    /** 任务数据记录 */
    task_status: ref<Game.Task>(DEFAULT.userDefaultInfo().taskStatus),
  };
  const { task_list, task_status } = ExposeData;

  const ExposeComputed = {
    today_task_list: computed(() => {
      const data = task_list.value.filter((item) => item.type === "DAILY");
      //可领取置顶，已领取置底
      data.sort((a) => {
        if (a.receive) return 1;
        if (a.schedule < a.total) return 0;
        return -1;
      });

      return data;
    }),
    week_task_list: computed(() => {
      const data = task_list.value.filter((item) => item.type === "WEEKLY");
      //可领取置顶，已领取置底
      data.sort((a) => {
        if (a.receive) return 1;
        if (a.schedule < a.total) return 0;
        return -1;
      });

      return data;
    }),
  };

  /* 保存已领取奖励的任务ID组 */
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
    /** @description 使用用户任务状态数据 */
    useUserTask(finish: Global.UserData["taskFinish"], status: Global.UserData["taskStatus"]) {
      task_status.value = status;
      task_list.value.forEach((item) => {
        if (finish.includes(item.id)) {
          item.receive = true;
        }
      });
    },

    /** @description 设置任务数据记录 */
    setTaskStatus(key: keyof Game.Task, v: boolean | number) {
      if (typeof task_status.value[key] === "number") {
        (task_status.value[key] as number) += v as number;
        return;
      } else {
        (task_status.value[key] as boolean) = v as boolean;
      }
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

    /** @description 新的一天，重置昨日任务 */
    resetYesterdayTask() {
      task_list.value.forEach((item) => {
        if (item.type === "DAILY") {
          item.receive = false;
        }
      });
    },

    /** @description 退出登录重置任务 */
    resetTask() {
      task_list.value = [...GAME_CONFIG.TASK_LIST];
      task_status.value = DEFAULT.userDefaultInfo().taskStatus;
    },
  };

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { TaskStore };
