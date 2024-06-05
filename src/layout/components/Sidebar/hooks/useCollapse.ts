/* eslint-disable @typescript-eslint/no-unused-vars */
import { onScopeDispose, ref } from "vue";

import { _debounce, dayjs } from "@/utils/tool";

/** 是否已注册resize事件 */
let is_registered = false;
/** 事件池 */
const eventPool = new Map<number, (status: boolean) => void>();

const ExposeData = {
  /** 折叠 */
  collapse: ref(false),
};
const { collapse } = ExposeData;

/** @description 侧边栏折叠 */
const useCollapse = (callback?: (status: boolean) => void) => {
  /** 生成事件ID */
  const event_id = dayjs().valueOf();

  /** @description 折叠状态发生改变时调用事件池 */
  const triggerCollapse = () => {
    for (const [_, fn] of eventPool) {
      fn(collapse.value);
    }
  };
  const ExposeMethods = {
    /** @description 切换折叠 */
    toggleCollapse() {
      collapse.value = !collapse.value;
      triggerCollapse();
    },

    /** @description 控制折叠
     * @param v 折叠状态
     */
    setCollapse(v: boolean) {
      collapse.value = v;
      triggerCollapse();
    },
  };

  //注入事件池
  callback && eventPool.set(event_id, callback);

  //只允许注册一次resize事件
  if (!is_registered) {
    is_registered = true;

    const debounceSidebarStatus = _debounce(() => {
      collapse.value = window.innerWidth < 640;
      triggerCollapse();
    }, 250);

    debounceSidebarStatus();
    window.addEventListener("resize", debounceSidebarStatus);
  }

  onScopeDispose(() => {
    eventPool.delete(event_id);
  });

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useCollapse };
