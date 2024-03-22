<script setup lang="ts">
import { useDataFinish, useGetAudioZip, useGetData } from "@/hooks";

/** 是否下载完成 */
const finish = defineModel<boolean>("finish", { required: true });

const { type: data_type, getData, progress: data_progress, finish: data_finish } = useGetData();
const {
  zip_size,
  zip_downloaded_size,
  zip_download_progress,
  zip_download_complete,
  zip_decompression_progress,
  getAudio,
} = useGetAudioZip();

/* 下载数据 */
const load = async () => {
  await getData();
  await getAudio();
  finish.value = true;
  useDataFinish.readyDataResolve();
};
load();
</script>

<template>
  <div class="down-load">
    <div class="down-load__bar">
      <div
        class="progress"
        :style="{
          width: !data_finish
            ? data_progress
            : !zip_download_complete
              ? zip_download_progress
              : zip_decompression_progress,
        }"
      ></div>
    </div>

    <template v-if="!zip_download_complete">
      <div class="down-load__desc">
        <div class="text">正在为您下载{{ !data_finish ? data_type : "网站音效包" }}</div>
        <div class="num">
          {{ !data_finish ? data_progress : `${zip_downloaded_size} / ${zip_size}` }}
        </div>
      </div>
    </template>

    <template v-else>
      <div class="down-load__desc">
        <div class="text">正在为您解压音效包</div>
        <div class="num">
          {{ !zip_download_complete ? zip_download_progress : zip_decompression_progress }}
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
