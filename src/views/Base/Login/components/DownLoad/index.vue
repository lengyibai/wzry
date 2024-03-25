<script setup lang="ts">
import { computed } from "vue";

import { useGetAudioZip, useGetData, useGetBlurZip, useGetImageZip } from "@/hooks";
import { _promiseTimeout } from "@/utils/tool";
import { AuthStore } from "@/store";
import { LOCAL_KEY } from "@/config";

/** 是否下载完成 */
const finish = defineModel<boolean>("finish", { required: true });

const $authStore = AuthStore();

const { type: data_type, getData, progress: data_progress } = useGetData();
const {
  image_zip_size,
  image_zip_downloaded_size,
  image_zip_download_progress,
  image_zip_download_finish,
  image_zip_decompression_progress,
  image_zip_decompression_finish,
  getImage,
} = useGetImageZip();
const {
  audio_zip_size,
  audio_zip_downloaded_size,
  audio_zip_download_progress,
  audio_zip_download_finish,
  audio_zip_decompression_progress,
  audio_zip_decompression_finish,
  getAudio,
} = useGetAudioZip();
const {
  blur_zip_size,
  blur_zip_downloaded_size,
  blur_zip_download_progress,
  blur_zip_download_finish,
  blur_zip_decompression_progress,
  blur_zip_decompression_finish,
  getBlur,
} = useGetBlurZip();

/** 进度条百分比 */
const download_info = computed(() => {
  return (status: "进度条" | "下载内容" | "进度信息") => {
    let a = "";
    let b = "";
    let c = "";

    //如果图片未下载完毕，则显示图片下载进度
    if (!image_zip_download_finish.value) {
      a = image_zip_download_progress.value;
      b = "正在下载贴图包";
      c = `${image_zip_downloaded_size.value}/${image_zip_size.value}`;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //如果图片未解压完毕，则显示图片解压进度
    if (!image_zip_decompression_finish.value) {
      a = image_zip_decompression_progress.value;
      b = "正在解压贴图";
      c = image_zip_decompression_progress.value;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //如果音效未下载完毕，则显示音效下载进度
    if (!audio_zip_download_finish.value) {
      a = audio_zip_download_progress.value;
      b = "正在下载音效包";
      c = `${audio_zip_downloaded_size.value}/${audio_zip_size.value}`;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //如果音效解压下载完毕，则显示音效解压下载进度
    if (!audio_zip_decompression_finish.value) {
      a = audio_zip_decompression_progress.value;
      b = "正在解压音效";
      c = audio_zip_decompression_progress.value;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //如果模糊图包未下载完毕，则显示模糊图包下载进度
    if (!blur_zip_download_finish.value) {
      a = blur_zip_download_progress.value;
      b = "正在下载模糊图包";
      c = `${blur_zip_downloaded_size.value}/${blur_zip_size.value}`;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //如果模糊图包解压下载完毕，则显示模糊图包解压下载进度
    if (!blur_zip_decompression_finish.value) {
      a = blur_zip_decompression_progress.value;
      b = "正在解压模糊图包";
      c = blur_zip_decompression_progress.value;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //数据最后下载
    a = data_progress.value;
    b = data_type.value;
    c = data_progress.value;

    if (status === "进度条") return a;
    if (status === "下载内容") return b;
    if (status === "进度信息") return c;
  };
});

/* 下载数据 */
const load = async () => {
  await getImage();
  await getAudio();
  await getBlur();
  await getData();
  await _promiseTimeout(() => {
    finish.value = true;

    //当存在用户信息，资源下载完成后自动登录
    const user_info = !!localStorage.getItem(LOCAL_KEY.USER_DATA);
    if (user_info) {
      $authStore.autoLogin();
    }
  }, 1000);
};
load();
</script>

<template>
  <div class="down-load">
    <div class="down-load__bar">
      <div
        class="progress"
        :style="{
          width: download_info('进度条'),
        }"
      ></div>
    </div>

    <div class="down-load__desc">
      <div class="text">{{ download_info("下载内容") }}</div>
      <div class="num">
        {{ download_info("进度信息") }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
