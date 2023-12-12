import { ref } from "vue";

import { AudioStore } from "@/store/modules/audio";

const useDialogContorl = (close: () => void) => {
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
      $audioStore.play("36jn");
      show_dialog.value = false;
      setTimeout(() => {
        show_mask.value = false;
        $audioStore.play("6xc6");
        setTimeout(close, 350);
      }, 500);
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useDialogContorl };
