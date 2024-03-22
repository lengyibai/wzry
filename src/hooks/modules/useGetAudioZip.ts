import JSZip from "jszip";
import { ref } from "vue";

import { API_DATA } from "@/api";
import { _promiseTimeout } from "@/utils/tool";
import { $msgTipText } from "@/config/modules/message-tip";

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
        API_DATA.AudioResource((e) => {
          /** KB单位 */
          const BYTES_IN_KB = 1024;
          /** 已下载大小 */
          const downloaded_size = e.loaded / BYTES_IN_KB;
          /** 总大小 */
          const total_size = e.total! / BYTES_IN_KB;

          audio_zip_size.value = total_size.toFixed(0) + "KB";
          audio_zip_downloaded_size.value = downloaded_size.toFixed(0) + "KB";
          audio_zip_download_progress.value = Math.round((e.loaded * 100) / e.total!) + "%";
        })
          .then(async (res) => {
            audio_zip_download_finish.value = true;

            /** 用于计算解压进度 */
            let finish_files = 0;
            /** 本地是否存在用户信息 */
            const exist_user = !!localStorage.getItem("user_data");
            const zip = await JSZip.loadAsync(res.data);
            const file_names = Object.keys(zip.files);

            // 遍历文件名列表
            for (const fileName of file_names) {
              //节流处理
              await _promiseTimeout(
                async () => {
                  const zipEntry = zip.files[fileName];

                  // 如果文件不是文件夹且文件名以 .mp3 结尾
                  if (!zipEntry.dir && fileName.match(/\.mp3$/i)) {
                    const originalFileName = fileName.replace(/\.mp3$/i, "");
                    const mp3Blob = await zip.files[fileName].async("blob");
                    const mp3Url = URL.createObjectURL(mp3Blob);
                    audio_links.value[originalFileName] = mp3Url;
                    finish_files++;
                    audio_zip_decompression_progress.value =
                      Math.round((finish_files / file_names.length) * 100) + "%";
                  }
                },
                exist_user ? 0 : 50,
              );
            }

            audio_zip_decompression_finish.value = true;
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

export { useGetAudioZip };
