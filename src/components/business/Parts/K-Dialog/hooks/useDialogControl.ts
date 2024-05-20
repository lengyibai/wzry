import { ref } from "vue";

import { _promiseTimeout } from "@/utils/tool";
import { usePlayAudio } from "@/hooks";

/**
 * @description 弹窗管理
 * @param closeFn 弹窗完全关闭后调用
 */
const useDialogControl = (closeFn: () => void) => {
  const { playAudio } = usePlayAudio();

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
        playAudio("pj83");
        show_dialog.value = false;

        await _promiseTimeout(500);
        show_mask.value = false;
        playAudio("ba09");

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
