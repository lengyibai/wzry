/**
 * v-drag-analysis
 * 拖拽解析
 */
import type { Directive } from "vue";

interface Params {
  /**
   * @description 拖拽放置后调用
   * @param file 拖拽放置的文件
   */
  getFile: (file: File) => void;
  enter: () => void;
  leave: () => void;
}

const vDragAnalysis: Directive<HTMLElement, Params> = {
  mounted(el, binding) {
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      binding.value.enter?.();
    });

    el.addEventListener("dragleave", () => {
      binding.value.leave?.();
    });

    el.addEventListener("drop", (e) => {
      e.preventDefault();
      const file = e.dataTransfer?.items[0].getAsFile();

      binding.value.getFile(file!);
    });
  },
};

export { vDragAnalysis };
