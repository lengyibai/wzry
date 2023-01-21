<script setup lang="ts" name="Data">
import { ref } from "vue";

import { $typeSort, $savefiles, $deepCopy } from "@/utils";
import skinStore from "@/store/skin";
import heroStore from "@/store/hero";
import switchStore from "@/store/switch";
import {
  HeroBasic,
  HeroImg,
  Herodata,
  Skill,
  Skilltype,
  Skilleffect,
  Skin,
  Skintype,
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
const $switchStore = switchStore();

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
let replace_data: any = {}; //替换的数据

const table_data = ref<any[]>([]); //表格数据
const show_ConfirmClose = ref(false); //显示确认关闭弹窗

$switchStore.$clickAudio("bq69");

/* 获取本地数据 */
const getLocalData = (name: string, prefix = "data_") => {
  return JSON.parse(localStorage.getItem(prefix + name) as string);
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

/* 比对远程数据设置状态 */
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

/* 音效触发 */
const play = () => $switchStore.$clickAudio();

/* 更新数据 */
const updateData = (key: string, data: any) => {
  localStorage.setItem("data_" + key, JSON.stringify(data));

  if (key.includes("skin")) {
    $skinStore.getSkin();
  } else if (key.includes("hero")) {
    $heroStore.getHeroList();
  }
};

/* 检查更新 */
const handleCheck = async (data: any) => {
  data.status = "正在检查...";
  const v = (await requests[data.key]()).data;

  setTimeout(() => {
    setStatus(data, v);
  }, 1000);
};

/* 更新指定 */
const handleUpdate = async (data: any) => {
  const v = (await requests[data.key]()).data;
  updateData(data.key, v);
  data.data = v;
  handleCheck(data);
};

/* 强制覆盖 */
const handleReplace = (data: any) => {
  replace_data = data;
  show_ConfirmClose.value = true;
};

/* 导出 */
const handleExport = (data: any) => {
  $savefiles(JSON.stringify({ data: data.data }, null, 2), data.key + ".json");
};

/* 确认覆盖 */
const EmitConfirmReset = async () => {
  const v = (await requests[replace_data.key]()).data;
  updateData(replace_data.key, v);
  handleCheck(replace_data);
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

  play();
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
        <TableColumn min-width="175px">{{ data.name }}</TableColumn>
        <TableColumn min-width="100px">{{ data.data.length }}</TableColumn>
        <TableColumn min-width="200px">{{ data.status }}</TableColumn>
        <TableColumn width="500px" min-width="425px">
          <button class="check lib-click" @click="handleCheck(data), play()">
            检查更新
          </button>
          <button
            v-if="data.status === '本地已更改'"
            class="export lib-click"
            @click="handleExport(data), play()"
          >
            导出
          </button>
          <button
            v-if="data.status === '待更新'"
            class="update lib-click"
            @click="handleUpdate(data), play()"
          >
            更新
          </button>
          <button
            v-if="!['最新', '待更新', '正在检查...'].includes(data.status)"
            class="replace lib-click"
            @click="handleReplace(data), play()"
          >
            重置
          </button>
        </TableColumn>
      </template>
    </LibTable>

    <!-- 确认弹窗 -->
    <transition name="fade">
      <ConfirmClose
        v-if="show_ConfirmClose"
        v-model="show_ConfirmClose"
        text="即将从远程下载当前数据进行覆盖"
        title="确认重置"
        @confirm="EmitConfirmReset"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
