import type { TaskType } from "@/config/interface";
import { _accumulate } from "@/utils/tool";

/** @description 任务列表排序
 * @param data 任务列表
 */
export const taskSort = (data: TaskType[]) => {
  data.sort((a, b) => {
    //先按照 finish 的值排序，true 在后，false 在前
    if (a.receive !== b.receive) {
      return a.receive ? 1 : -1;
    }

    //当 finish 为 true 时，按照 status 是否等于 total 排序
    if (a.receive && b.receive) {
      return _accumulate(a.schedule, "value") === _accumulate(a.schedule, "total")
        ? -1
        : _accumulate(b.schedule, "value") === _accumulate(b.schedule, "total")
          ? 1
          : 0;
    }

    //当 finish 为 false 时
    if (!a.receive && !b.receive) {
      // 当 status 小于 total 时，保持原顺序
      if (
        _accumulate(a.schedule, "value") < _accumulate(a.schedule, "total") &&
        _accumulate(b.schedule, "value") < _accumulate(b.schedule, "total")
      ) {
        return 0;
      }
      // 当 status 大于等于 total 时，优先级较高
      if (
        _accumulate(a.schedule, "value") >= _accumulate(a.schedule, "total") &&
        _accumulate(b.schedule, "value") < _accumulate(b.schedule, "total")
      ) {
        return -1;
      }
      if (
        _accumulate(a.schedule, "value") < _accumulate(a.schedule, "total") &&
        _accumulate(b.schedule, "value") >= _accumulate(b.schedule, "total")
      ) {
        return 1;
      }
      // 当 status 均大于 total 时，按照 status 的大小排序
      return _accumulate(a.schedule, "value") - _accumulate(b.schedule, "value");
    }

    //默认情况下保持原顺序
    return 0;
  });
};
