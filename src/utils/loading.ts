import { $bus } from "./eventBus";

class LoadingManager {
  private loadingCount = 0;
  private closeTimer: NodeJS.Timeout | undefined;
  private openTimer: NodeJS.Timeout | undefined;

  /** @description 开启loading
   * @param text loading文字
   */
  show(text: string) {
    this.openTimer = setTimeout(() => {
      if (this.closeTimer) clearTimeout(this.closeTimer);

      if (this.loadingCount === 0) {
        $bus.emit("loading", {
          show: true,
          text,
        });
      }

      this.loadingCount++;
    }, 250);
  }

  /** @description 关闭loading */
  close(): Promise<void> {
    return new Promise<void>((resolve) => {
      clearTimeout(this.openTimer);

      if (this.loadingCount > 0) {
        this.loadingCount--;
      }

      if (this.loadingCount === 0) {
        this.closeTimer = setTimeout(() => {
          $bus.emit("loading", { show: false });
          this.closeTimer = undefined;
          resolve();
        }, 500);
      }
    });
  }
}

export const $loading = new LoadingManager();
