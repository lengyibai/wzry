import { ref } from "vue";

import { API_DATA } from "@/api";
import { $msgTipText } from "@/config/modules/message-tip";
import { _downloadZip } from "@/utils/privateTool";

const audio_links = ref<Record<string, string>>({});

/** @description 获取音效压缩包并解压设置音效列表 */
const useGetAudioZip = () => {
  const ExposeData = {
    /** 音效列表 */
    audio_links,

    /** zip总大小KB */
    audio_zip_size: ref("正在计算..."),
    /** zip已下载大小KB */
    audio_zip_downloaded_size: ref("0KB"),
    /** zip下载进度百分比 */
    audio_zip_download_progress: ref("0%"),
    /** 是否下载完成 */
    audio_zip_download_finish: ref(false),
    /** zip解压进度百分比 */
    audio_zip_decompression_progress: ref("0%"),
    /** 是否解压完成 */
    audio_zip_decompression_finish: ref(false),
  };
  const {
    audio_zip_size,
    audio_zip_downloaded_size,
    audio_zip_download_progress,
    audio_zip_download_finish,
    audio_zip_decompression_progress,
    audio_zip_decompression_finish,
  } = ExposeData;

  const ExposeMethods = {
    /** @description 获取音效 */
    getAudio() {
      return new Promise<void>((resolve) => {
        if (Object.keys(audio_links.value).length) {
          resolve();
          return;
        }

        //下载Zip
        _downloadZip(API_DATA.AudioResource, "AUDIO", (v) => {
          const {
            zip_size,
            zip_downloaded_size,
            zip_download_progress,
            zip_download_finish,
            zip_decompression_progress,
            zip_decompression_finish,
          } = v;

          audio_zip_size.value = zip_size;
          audio_zip_downloaded_size.value = zip_downloaded_size;
          audio_zip_download_progress.value = zip_download_progress;
          audio_zip_download_finish.value = zip_download_finish;
          audio_zip_decompression_progress.value = zip_decompression_progress;
          audio_zip_decompression_finish.value = zip_decompression_finish;
        })
          .then((link) => {
            audio_links.value = link;
            resolve();
          })
          .catch(() => {
            alert($msgTipText("rc53", { v: "音效包" }));
          });
      });
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useGetAudioZip };
