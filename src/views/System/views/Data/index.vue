<script setup lang="ts">
import { ref, onActivated } from "vue";
import _debounce from "lodash/debounce";

import type { TableData } from "./interface";

import { AudioStore } from "@/store";
import { $confirm, $message, $tool } from "@/utils";
import type { ResultData } from "@/api/interface";
import { LibTable, TableColumn } from "@/components/common";
import { CONFIRM_TIP, MESSAGE_TIP, REQUEST } from "@/config";
import { vMouseTip } from "@/directives";

defineOptions({
  name: "Database",
});

const $audioStore = AudioStore();

/** 更新限制 */
let update_status = true;
/** 替换的数据 */
let replace_data: TableData;

/** 表格数据 */
const table_data = ref<TableData[]>([]);

/* 加载数据 */
const load = async () => {
  table_data.value = REQUEST.map(([key, request, name]) => {
    const v = JSON.parse(localStorage.getItem(key) as string) || [];

    return {
      name: name,
      key: key,
      data: v,
      status: "正在检查...",
      length: v.length,
      request,
      size: $tool.getFileSizeInKB(v),
    };
  }).sort((a, b) => {
    return b.size - a.size;
  });

  for (let i = 0; i < table_data.value.length; i++) {
    const data = table_data.value[i];
    const v = (await data.request()).data;
    setStatus(data, v);
  }
};
load();

/* 比对远程数据设置状态 */
const setStatus = (data: TableData, v: unknown[]) => {
  data.data = JSON.parse(localStorage.getItem(data.key) as string) || [];

  if (JSON.stringify(v) === JSON.stringify(data.data)) {
    data.status = "最新";
  } else if (data.data.length > v.length) {
    data.status = "本地已更改";
  } else {
    data.status = "待更新";
  }
};

/* 音效触发 */
const play = () => $audioStore.play();

/* 更新数据 */
const updateData = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/* 检查更新 */
const debounceCheck = _debounce(
  async (data: TableData) => {
    if (update_status) {
      update_status = false;
      data.status = "正在检查...";
      const v = (await data.request()).data;
      update_status = true;
      setTimeout(() => {
        setStatus(data, v);
      }, 1000);
    } else {
      $message(MESSAGE_TIP.iy70, "warning");
    }
  },
  1000,
  {
    leading: true,
    trailing: false,
  },
);

/* 更新指定 */
const handleUpdate = async (data: TableData) => {
  const v = (await data.request()).data;
  updateData(data.key, v);
  data.data = v;
  debounceCheck(data);
};

/* 强制覆盖 */
const handleReplace = (data: TableData) => {
  replace_data = data;
  $confirm({
    text: CONFIRM_TIP.ao63,
    confirm: onConfirmReset(data.request),
  });
};

/* 导出 */
const handleExport = (data: TableData) => {
  $tool.saveFiles(JSON.stringify({ data: data.data }, null, 2), data.key + ".json");
};

/* 确认覆盖 */
const onConfirmReset = (request: () => Promise<ResultData<any>>) => {
  return async () => {
    const v = (await request()).data;
    updateData(replace_data.key, v);
  };
};

onActivated(() => {
  $audioStore.play("le78");
});
</script>

<template>
  <div class="data">
    <!-- 表格 -->
    <LibTable :data="table_data" :head="['数据类型', '数据量', '占用', '状态', '操作']">
      <template #body="{ data }">
        <TableColumn min-width="10.9375rem">{{ data.name }}</TableColumn>
        <TableColumn min-width="10rem">{{ data.length }}</TableColumn>
        <TableColumn min-width="10rem">{{ data.size }}KB</TableColumn>
        <TableColumn min-width="12.5rem">{{ data.status }}</TableColumn>
        <TableColumn min-width="20.5rem">
          <button
            v-if="data.status !== '本地已更改'"
            v-mouse-tip
            class="check"
            @click="debounceCheck(data), play()"
          >
            检查更新
          </button>
          <button v-mouse-tip class="export" @click="handleExport(data), play()">导出</button>
          <button
            v-if="data.status === '待更新'"
            v-mouse-tip
            class="update"
            @click="handleUpdate(data), play()"
          >
            更新
          </button>
          <button
            v-if="!['最新', '待更新', '正在检查...'].includes(data.status)"
            v-mouse-tip
            class="replace"
            @click="handleReplace(data), play()"
          >
            重置
          </button>
        </TableColumn>
      </template>
    </LibTable>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
