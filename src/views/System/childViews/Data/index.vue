<script setup lang="ts">
import { ref, onActivated } from "vue";

import { API_DATA } from "@/api";
import { SkinStore, HeroStore, AudioStore } from "@/store";
import { $message, $tool } from "@/utils";

defineOptions({
  name: "database",
});

const $skinStore = SkinStore();
const $heroStore = HeroStore();
const $audioStore = AudioStore();

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
  herobasic: API_DATA.HeroBasic,
  heroimg: API_DATA.HeroImg,
  herodata: API_DATA.Herodata,
  skill: API_DATA.Skill,
  skilltype: API_DATA.Skilltype,
  skilleffect: API_DATA.Skilleffect,
  skin: API_DATA.Skin,
  skintype: API_DATA.Skintype,
  relationship: API_DATA.Relationship,
  equip: API_DATA.Equip,
  equipSynthetic: API_DATA.EquipSynthetic,
  equiptype: API_DATA.Equiptype,
  equipeffect: API_DATA.Equipeffect,
  epigraph: API_DATA.Epigraph,
  epigraphtype: API_DATA.Epigraphtype,
  epigrapheffect: API_DATA.Epigrapheffect,
  professiontype: API_DATA.Professiontype,
  locationtype: API_DATA.Locationtype,
  specialtytype: API_DATA.Specialtytype,
  periodtype: API_DATA.Periodtype,
  camptype: API_DATA.Camptype,
  racetype: API_DATA.RaceType,
};

/** 更新限制 */
let update_status = true;
/** 数据缓存 */
let data_cache: any[] = [];
/** 替换的数据 */
let replace_data: any = {};

/** 显示确认关闭弹窗 */
const show_ConfirmClose = ref(false);
/** 表格数据 */
const table_data = ref<any[]>([]);

/* 获取本地数据 */
const getLocalData = (name: string, prefix = "data_") => {
  return JSON.parse(localStorage.getItem(prefix + name) as string);
};

/* 加载数据 */
const load = async () => {
  table_data.value = keywords.map((item) => {
    const v = getLocalData(item[0]) || [];
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

  data_cache = $tool.deepCopy<any[]>(table_data.value);
};
load();

/* 比对远程数据设置状态 */
const setStatus = (data: any, v: any) => {
  data.data = JSON.parse(localStorage.getItem("data_" + data.key) as string) || [];

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
const updateData = (key: string, data: any) => {
  localStorage.setItem("data_" + key, JSON.stringify(data));

  //如果为皮肤/英雄，则重新获取皮肤/英雄列表
  if (key.includes("skin")) {
    $skinStore.getSkin();
  } else if (key.includes("hero")) {
    $heroStore.getHeroList();
  }
};

/* 检查更新 */
const handleCheck = async (data: any) => {
  if (update_status) {
    data.status = "正在检查...";
    const v = (await requests[data.key]()).data;

    setTimeout(() => {
      setStatus(data, v);
    }, 1000);

    update_status = false;
    setTimeout(() => {
      update_status = true;
    }, 3000);
  } else {
    $message("更新太频繁，更新间隔为3秒", "warning");
  }
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
  $tool.savefiles(JSON.stringify({ data: data.data }, null, 2), data.key + ".json");
};

/* 确认覆盖 */
const onConfirmReset = async () => {
  const v = (await requests[replace_data.key]()).data;
  updateData(replace_data.key, v);
  handleCheck(replace_data);
};

/* 排序触发 */
const onsSortChange = (v: number[]) => {
  if (v[1] === 1 || v[1] === 2) {
    table_data.value = $tool.typeSort(table_data.value, "length", v[1] === 1 ? true : false);
  } else {
    table_data.value = $tool.deepCopy(data_cache);
  }

  play();
};

onActivated(() => {
  $audioStore.play("bq69");
});
</script>

<template>
  <div class="data">
    <!-- 表格 -->
    <LibTable
      :data="table_data"
      :head="['数据类型', '数据量', '状态', '操作']"
      :sort="['数据量']"
      @sortChange="onsSortChange"
    >
      <template v-slot:body="{ data }">
        <TableColumn min-width="10.9375rem">{{ data.name }}</TableColumn>
        <TableColumn min-width="10rem">{{ data.data.length }}</TableColumn>
        <TableColumn min-width="12.5rem">{{ data.status }}</TableColumn>
        <TableColumn min-width="20.5rem">
          <button v-if="data.status !== '本地已更改'" class="check" @click="handleCheck(data), play()">检查更新</button>
          <button class="export" @click="handleExport(data), play()">导出</button>
          <button v-if="data.status === '待更新'" class="update" @click="handleUpdate(data), play()">更新</button>
          <button
            v-if="!['最新', '待更新', '正在检查...'].includes(data.status)"
            class="replace"
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
        @confirm="onConfirmReset"
      />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
