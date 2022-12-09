<template>
  <div class="data">
    <LibTable :data="tableData" :head="['数据类型', '数据量', '操作']" :sort="['数据量']" @sortChange="sortChange">
      <template v-slot:body="{ data }">
        <TableColumn>{{ data.name }}</TableColumn>
        <TableColumn>{{ data.length }}</TableColumn>
        <TableColumn width="275px">
          <button class="update cursor-pointer" @click="handleUpdate(data)">更新</button>
          <button class="export cursor-pointer" @click="handleExport(data)">导出</button>
        </TableColumn>
      </template>
    </LibTable>
  </div>
</template>
<script setup lang="ts" name="Data">
import { $typeSort, $deepCopy, $savefiles } from "@/utils/index";
import { onActivated, ref } from "vue";
const keywords: [string, string][] = [
  ["user", "用户"],
  ["herobasic", "英雄基础"],
  ["heroimg", "英雄图片"],
  ["herodata", "英雄信息"],
  ["skill", "技能列表"],
  ["skilltype", "技能类型"],
  ["skilleffect", "技能效果"],
  ["skin", "皮肤"],
  ["skintype", "皮肤类型"],
  ["relationship", "关系"],
  ["relationtype", "关系类型"],
  ["equip", "装备"],
  ["equiptype", "装备类型"],
  ["equipeffect", "装备效果"],
  ["epigraph", "铭文"],
  ["epigraphtype", "铭文类型"],
  ["epigrapheffect", "铭文效果"],
  ["professiontype", "职业"],
  ["locationtype", "定位"],
  ["specialtytype", "特长"],
  ["periodtype", "时期"],
  ["camptype", "阵营"],
];

/* 获取本地数据 */
const getLocalData = (name: string, prefix = "data_") => {
  return JSON.parse(localStorage.getItem(prefix + name) as string);
};

const tableData = ref<any[]>([]);
let cache: any[] = [];

onActivated(() => {
  tableData.value = keywords.map((item) => {
    const v = getLocalData(item[0]);
    return {
      name: item[1],
      key: item[0],
      length: v.length,
      data: v,
    };
  });
  cache = $deepCopy<any[]>(tableData.value);
});

/* 导出 */
const handleExport = (data: any) => {
  $savefiles(JSON.stringify(data.data, null, 2), data.key + ".json");
};

/* 更新 */
const handleUpdate = (data: any) => {
  console.log(data);
};

const sortChange = (v: number[]) => {
  if (v[1] === 1 || v[1] === 2) {
    tableData.value = $typeSort(tableData.value, "length", v[1] === 1 ? true : false);
  } else {
    tableData.value = [...cache];
  }
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
