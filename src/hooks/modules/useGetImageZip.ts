import { ref } from "vue";

import { API_DATA } from "@/api";
import { $msgTipText } from "@/config/modules/message-tip";
import { _downloadZip } from "@/utils/privateTool";

const image_links = ref<Record<string, string>>({});

/** @description 获取贴图压缩包并解压设置贴图列表 */
const useGetImageZip = () => {
  const ExposeData = {
    /** 贴图列表 */
    image_links,

    /** zip总大小KB */
    image_zip_size: ref("正在计算..."),
    /** zip已下载大小KB */
    image_zip_downloaded_size: ref("0KB"),
    /** zip下载进度百分比 */
    image_zip_download_progress: ref("0%"),
    /** 是否下载完成 */
    image_zip_download_finish: ref(false),
    /** zip解压进度百分比 */
    image_zip_decompression_progress: ref("0%"),
    /** 是否解压完成 */
    image_zip_decompression_finish: ref(false),
  };
  const {
    image_zip_size,
    image_zip_downloaded_size,
    image_zip_download_progress,
    image_zip_download_finish,
    image_zip_decompression_progress,
    image_zip_decompression_finish,
  } = ExposeData;

  const ExposeMethods = {
    /** @description 获取贴图 */
    getImage() {
      return new Promise<void>((resolve) => {
        if (Object.keys(image_links.value).length) {
          resolve();
          return;
        }

        //下载Zip
        _downloadZip(API_DATA.ImageResource, "IMG", (v) => {
          const {
            zip_size,
            zip_downloaded_size,
            zip_download_progress,
            zip_download_finish,
            zip_decompression_progress,
            zip_decompression_finish,
          } = v;

          image_zip_size.value = zip_size;
          image_zip_downloaded_size.value = zip_downloaded_size;
          image_zip_download_progress.value = zip_download_progress;
          image_zip_download_finish.value = zip_download_finish;
          image_zip_decompression_progress.value = zip_decompression_progress;
          image_zip_decompression_finish.value = zip_decompression_finish;
        })
          .then((link) => {
            image_links.value = link;
            resolve();
          })
          .catch(() => {
            alert($msgTipText("rc53", { v: "贴图包" }));
          });
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useGetImageZip };
