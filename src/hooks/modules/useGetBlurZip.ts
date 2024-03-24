import { ref } from "vue";

import { API_DATA } from "@/api";
import { $msgTipText } from "@/config/modules/message-tip";
import { _downloadZip } from "@/utils/privateTool";

const blur_links = ref<Record<string, string>>({});

/** @description 获取模糊图压缩包并解压设置模糊图列表 */
const useGetBlurZip = () => {
  const ExposeData = {
    /** 模糊图列表 */
    blur_links,

    /** zip总大小KB */
    blur_zip_size: ref("正在计算..."),
    /** zip已下载大小KB */
    blur_zip_downloaded_size: ref("0KB"),
    /** zip下载进度百分比 */
    blur_zip_download_progress: ref("0%"),
    /** 是否下载完成 */
    blur_zip_download_finish: ref(false),
    /** zip解压进度百分比 */
    blur_zip_decompression_progress: ref("0%"),
    /** 是否解压完成 */
    blur_zip_decompression_finish: ref(false),
  };
  const {
    blur_zip_size,
    blur_zip_downloaded_size,
    blur_zip_download_progress,
    blur_zip_download_finish,
    blur_zip_decompression_progress,
    blur_zip_decompression_finish,
  } = ExposeData;

  const ExposeMethods = {
    /** @description 获取模糊图 */
    getBlur() {
      return new Promise<void>((resolve) => {
        if (Object.keys(blur_links.value).length) {
          resolve();
          return;
        }

        //下载Zip
        _downloadZip(API_DATA.BlurImageResource, "BLUR", (v) => {
          const {
            zip_size,
            zip_downloaded_size,
            zip_download_progress,
            zip_download_finish,
            zip_decompression_progress,
            zip_decompression_finish,
          } = v;

          blur_zip_size.value = zip_size;
          blur_zip_downloaded_size.value = zip_downloaded_size;
          blur_zip_download_progress.value = zip_download_progress;
          blur_zip_download_finish.value = zip_download_finish;
          blur_zip_decompression_progress.value = zip_decompression_progress;
          blur_zip_decompression_finish.value = zip_decompression_finish;
        })
          .then((link) => {
            blur_links.value = link;
            resolve();
          })
          .catch(() => {
            alert($msgTipText("rc53", { v: "英雄及皮肤模糊图包" }));
          });
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useGetBlurZip };
