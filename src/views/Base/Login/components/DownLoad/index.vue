<script setup lang="ts">
import { computed } from "vue";

import { useGetZip } from "@/hooks";
import { _promiseTimeout } from "@/utils/tool";
import { AuthStore } from "@/store";
import { LOCAL_KEY } from "@/config";

/** 是否下载完成 */
const finish = defineModel<boolean>("finish", { required: true });

const $authStore = AuthStore();

const {
  zip_key_name,
  zip_name,
  downloaded_index,
  zip_size,
  zip_downloaded_size,
  zip_download_progress,
  zip_download_finish,
  zip_decompression_progress,
  zip_decompression_finish,
  getZipList,
} = useGetZip();

/** 进度条百分比 */
const download_info = computed(() => {
  return (status: "进度条" | "下载内容" | "进度信息") => {
    let a = "";
    let b = "";
    let c = "";

    //如果压缩包未下载完毕，则显示下载进度
    if (!zip_download_finish.value) {
      a = zip_download_progress.value;
      b = `正在下载${zip_name.value}`;
      c = `${zip_downloaded_size.value}/${zip_size.value}`;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    //如果压缩包未解压完毕，则显示解压进度
    if (!zip_decompression_finish.value) {
      a = zip_decompression_progress.value;
      b = `正在解压${zip_name.value}`;
      c = zip_decompression_progress.value;
      if (status === "进度条") return a;
      if (status === "下载内容") return b;
      if (status === "进度信息") return c;
    }

    if (status === "下载内容") return "加载完毕，祝你体验愉快。";
  };
});

/** @description 下载数据 */
const load = async () => {
  await getZipList();
  await _promiseTimeout(1000);
  finish.value = true;

  //当存在用户信息，资源下载完成后自动登录
  const user_info = !!localStorage.getItem(LOCAL_KEY.USER_DATA);
  user_info && $authStore.autoLogin();
};
load();
</script>

<template>
  <div class="down-load">
    <div class="download-list">
      <div class="title">下载列表</div>
      <div
        v-for="(item, index) in Object.values(zip_key_name)"
        :key="index"
        class="download-item"
        :class="{
          downloaded: downloaded_index > index,
          downloading: zip_name === item,
        }"
      >
        {{ index + 1 }}、{{ item }}
      </div>
    </div>
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
