<script setup lang="ts" name="Data">
import { ref } from "vue";
import { $typeSort, $savefiles, $deepCopy } from "@/utils";
import skinStore from "@/store/skin";
import heroStore from "@/store/hero";

import {
  HeroBasic,
  HeroImg,
  Herodata,
  Skill,
  Skilltype,
  Skilleffect,
  Skin,
  Skintype,
  Relationtype,
  Relationship,
  Equip,
  EquipSynthetic,
  Equiptype,
  Equipeffect,
  Epigraph,
  Epigraphtype,
  Epigrapheffect,
  Professiontype,
  Locationtype,
  Specialtytype,
  Periodtype,
  Camptype,
  RaceType,
} from "@/api/main/data";

const $skinStore = skinStore();
const $heroStore = heroStore();

const keywords: [string, string][] = [
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
  ["equipSynthetic", "装备合成"],
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
  ["racetype", "种族"],
];

const requests: Record<string, () => Promise<any>> = {
  herobasic: HeroBasic,
  heroimg: HeroImg,
  herodata: Herodata,
  skill: Skill,
  skilltype: Skilltype,
  skilleffect: Skilleffect,
  skin: Skin,
  skintype: Skintype,
  relationship: Relationship,
  relationtype: Relationtype,
  equip: Equip,
  equipSynthetic: EquipSynthetic,
  equiptype: Equiptype,
  equipeffect: Equipeffect,
  epigraph: Epigraph,
  epigraphtype: Epigraphtype,
  epigrapheffect: Epigrapheffect,
  professiontype: Professiontype,
  locationtype: Locationtype,
  specialtytype: Specialtytype,
  periodtype: Periodtype,
  camptype: Camptype,
  racetype: RaceType,
};

let data_cache: any[] = []; //数据缓存

const table_data = ref<any[]>([]); //表格数据

/* 获取本地数据 */
const getLocalData = (name: string, prefix = "data_") => {
  return JSON.parse(localStorage.getItem(prefix + name) as string);
};

/* 设置状态 */
const setStatus = (data: any, v: any) => {
  data.data = JSON.parse(localStorage.getItem("data_" + data.key) as string);
  if (JSON.stringify(v) === JSON.stringify(data.data)) {
    data.status = "最新";
  } else if (data.data.length > v.length) {
    data.status = "本地已更改";
  } else {
    data.status = "待更新";
  }
};

/* 更新数据 */
const updateData = (key: string, data: any) => {
  localStorage.setItem("data_" + key, JSON.stringify(data));
  if (key.includes("skin")) {
    $skinStore.getSkin();
  } else if (key.includes("hero")) {
    $heroStore.getHeroList();
  }
};

/* 加载数据 */
const load = async () => {
  table_data.value = keywords.map((item) => {
    const v = getLocalData(item[0]);
    return {
      name: item[1],
      key: item[0],
      data: v,
      status: "正在检查...",
      length: v.length,
    };
  });
  for (let i = 0; i < table_data.value.length; i++) {
    const data = table_data.value[i];
    const v = (await requests[data.key]()).data;
    setStatus(data, v);
  }

  data_cache = $deepCopy<any[]>(table_data.value);
};
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
    table_data.value = $typeSort(
      table_data.value,
      "length",
      v[1] === 1 ? true : false
    );
  } else {
    table_data.value = $deepCopy(data_cache);
  }
};
</script>

<template>
  <div class="data">
    <LibTable
      :data="table_data"
      :head="['数据类型', '数据量', '状态', '操作']"
      :sort="['数据量']"
      @sortChange="EmitsSortChange"
    >
      <template v-slot:body="{ data }">
        <TableColumn minWidth="175px">{{ data.name }}</TableColumn>
        <TableColumn minWidth="100px">{{ data.data.length }}</TableColumn>
        <TableColumn minWidth="200px">{{ data.status }}</TableColumn>
        <TableColumn width="500px" minWidth="425px">
          <button class="check lib-click" @click="handleCheck(data)">
            检查更新
          </button>
          <button
            class="export lib-click"
            @click="handleExport(data)"
            v-if="data.status === '本地已更改'"
          >
            导出
          </button>
          <button
            class="update lib-click"
            v-if="data.status === '待更新'"
            @click="handleUpdate(data)"
          >
            更新
          </button>
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
    <transition name="fade">
      <ConfirmClose
        v-model="show_ConfirmClose"
        v-model:v-if="show_ConfirmClose"
        v-if="show_ConfirmClose"
        @confirm="EmitConfirmReset"
        text="即将从远程下载当前数据进行覆盖"
        title="确认重置"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
