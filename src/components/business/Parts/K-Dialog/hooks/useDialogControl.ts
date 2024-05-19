import { ref } from "vue";

import { AudioStore } from "@/store/modules/audio";
import { _promiseTimeout } from "@/utils/tool";

/**
 * @description 弹窗管理
 * @param closeFn 弹窗完全关闭后调用
 */
const useDialogControl = (closeFn: () => void) => {
  const $audioStore = AudioStore();

  const ExposeData = {
    /** 显示蒙版 */
    show_mask: ref(true),
    /** 显示弹窗 */
    show_dialog: ref(true),
  };
  const { show_mask, show_dialog } = ExposeData;

  const ExposeMethods = {
    /** @description 关闭 */
    handleClose() {
      return new Promise<void>(async (resolve) => {
        $audioStore.play("pj83");
        show_dialog.value = false;

        await _promiseTimeout(500);
        show_mask.value = false;
        $audioStore.play("ba09");

        await _promiseTimeout(500);
        closeFn();
        resolve();
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useDialogControl as useDialogControl };
