<script setup lang="ts" name="Data">
import { $typeSort, $savefiles, $deepCopy } from "@/utils/index";
import { ref } from "vue";
import hooks from "./hooks/index";

const { requests, cache, tableData, load, setStatus, updateData } = hooks();
load();

/* 导出 */
const handleExport = (data: any) => {
  $savefiles(JSON.stringify({ data: data.data }, null, 2), data.key + ".json");
};

/* 检查更新 */
const handleCheck = async (data: any) => {
  data.status = "正在检查...";
  const v = (await requests[data.key]()).data;
  setTimeout(() => {
    setStatus(data, v);
  }, 1000);
};

/* 强制覆盖 */
const show_ConfirmClose = ref(false);
let replace_data: any = {};
const handleReplace = (data: any) => {
  replace_data = data;
  show_ConfirmClose.value = true;
};

/* 确认覆盖 */
const EmitConfirmReset = async () => {
  const v = (await requests[replace_data.key]()).data;
  updateData(replace_data.key, v);
  handleCheck(replace_data);
};

/* 更新指定 */
const handleUpdate = async (data: any) => {
  const v = (await requests[data.key]()).data;
  updateData(data.key, v);
  data.data = v;
  handleCheck(data);
};

/* 排序触发 */
const EmitsSortChange = (v: number[]) => {
  if (v[1] === 1 || v[1] === 2) {
    tableData.value = $typeSort(tableData.value, "length", v[1] === 1 ? true : false);
  } else {
    tableData.value = $deepCopy(cache.value);
  }
};
</script>

<template>
  <div class="data">
    <LibTable
      :data="tableData"
      :head="['数据类型', '数据量', '状态', '操作']"
      :sort="['数据量']"
      @sortChange="EmitsSortChange"
    >
      <template v-slot:body="{ data }">
        <TableColumn minWidth="175px">{{ data.name }}</TableColumn>
        <TableColumn minWidth="100px">{{ data.data.length }}</TableColumn>
        <TableColumn minWidth="200px">{{ data.status }}</TableColumn>
        <TableColumn width="500px" minWidth="425px">
          <button class="check lib-click" @click="handleCheck(data)">检查更新</button>
          <button class="export lib-click" @click="handleExport(data)" v-if="data.status === '本地已更改'">导出</button>
          <button class="update lib-click" v-if="data.status === '待更新'" @click="handleUpdate(data)">更新</button>
          <button
            class="replace lib-click"
            v-if="!['最新', '待更新', '正在检查...'].includes(data.status)"
            @click="handleReplace(data)"
          >
            重置
          </button>
        </TableColumn>
      </template>
    </LibTable>
    <ConfirmClose
      v-model="show_ConfirmClose"
      @confirm="EmitConfirmReset"
      text="即将从远程下载当前数据进行覆盖"
      title="确认重置"
    />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
