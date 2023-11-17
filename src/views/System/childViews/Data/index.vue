<script setup lang="ts">
import { ref, onActivated } from "vue";
import _debounce from "lodash/debounce";

import { API_DATA } from "@/api";
import { AudioStore } from "@/store";
import { $bus, $message, $tool } from "@/utils";
import { CONFIG } from "@/config";
import { ResultData } from "@/api/interface";
import { LibTable, TableColumn } from "@/components/common";

interface TableData {
  /** 数据名 */
  name: string;
  /** 数据键名 */
  key: string;
  /** 数据 */
  data: unknown[];
  /** 检查状态 */
  status: string;
  /** 数据量 */
  length: number;
  /** 占用大小 */
  size: number;
}

defineOptions({
  name: "Database",
});

const $audioStore = AudioStore();

const keywords: [string, string][] = [
  [CONFIG.LOCAL_KEY.HERO_BASIC, "英雄基础"],
  [CONFIG.LOCAL_KEY.HERO_IMG, "英雄图片"],
  [CONFIG.LOCAL_KEY.HERO_ATLAS, "英雄图集"],
  [CONFIG.LOCAL_KEY.HERO_DATA, "英雄信息"],
  [CONFIG.LOCAL_KEY.SKILL, "技能列表"],
  [CONFIG.LOCAL_KEY.SKILL_TYPE, "技能类型"],
  [CONFIG.LOCAL_KEY.SKILL_EFFECT, "技能效果"],
  [CONFIG.LOCAL_KEY.SKIN, "皮肤"],
  [CONFIG.LOCAL_KEY.SKIN_TYPE, "皮肤类型"],
  [CONFIG.LOCAL_KEY.RELATIONSHIP, "关系"],
  [CONFIG.LOCAL_KEY.EQUIP, "装备"],
  [CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC, "装备合成"],
  [CONFIG.LOCAL_KEY.EQUIP_TYPE, "装备类型"],
  [CONFIG.LOCAL_KEY.EQUIP_EFFECT, "装备效果"],
  [CONFIG.LOCAL_KEY.EPIGRAPH, "铭文"],
  [CONFIG.LOCAL_KEY.EPIGRAPH_TYPE, "铭文类型"],
  [CONFIG.LOCAL_KEY.EPIGRAPH_EFFECT, "铭文效果"],
  [CONFIG.LOCAL_KEY.PROFESSION_TYPE, "职业"],
  [CONFIG.LOCAL_KEY.LOCATION_TYPE, "定位"],
  [CONFIG.LOCAL_KEY.SPECIALTY_TYPE, "特长"],
  [CONFIG.LOCAL_KEY.PERIOD_TYPE, "时期"],
  [CONFIG.LOCAL_KEY.CAMP_TYPE, "阵营"],
  [CONFIG.LOCAL_KEY.RACE_TYPE, "种族"],
];

const requests: Record<string, () => Promise<ResultData<unknown[]>>> = {
  [CONFIG.LOCAL_KEY.HERO_BASIC]: API_DATA.HeroBasic,
  [CONFIG.LOCAL_KEY.HERO_IMG]: API_DATA.HeroImg,
  [CONFIG.LOCAL_KEY.HERO_ATLAS]: API_DATA.HeroAtlas,
  [CONFIG.LOCAL_KEY.HERO_DATA]: API_DATA.Herodata,
  [CONFIG.LOCAL_KEY.SKILL]: API_DATA.Skill,
  [CONFIG.LOCAL_KEY.SKILL_TYPE]: API_DATA.Skilltype,
  [CONFIG.LOCAL_KEY.SKILL_EFFECT]: API_DATA.Skilleffect,
  [CONFIG.LOCAL_KEY.SKIN]: API_DATA.Skin,
  [CONFIG.LOCAL_KEY.SKIN_TYPE]: API_DATA.Skintype,
  [CONFIG.LOCAL_KEY.RELATIONSHIP]: API_DATA.Relationship,
  [CONFIG.LOCAL_KEY.EQUIP]: API_DATA.Equip,
  [CONFIG.LOCAL_KEY.EQUIP_SYNTHETIC]: API_DATA.EquipSynthetic,
  [CONFIG.LOCAL_KEY.EQUIP_TYPE]: API_DATA.Equiptype,
  [CONFIG.LOCAL_KEY.EQUIP_EFFECT]: API_DATA.Equipeffect,
  [CONFIG.LOCAL_KEY.EPIGRAPH]: API_DATA.Epigraph,
  [CONFIG.LOCAL_KEY.EPIGRAPH_TYPE]: API_DATA.Epigraphtype,
  [CONFIG.LOCAL_KEY.EPIGRAPH_EFFECT]: API_DATA.Epigrapheffect,
  [CONFIG.LOCAL_KEY.PROFESSION_TYPE]: API_DATA.Professiontype,
  [CONFIG.LOCAL_KEY.LOCATION_TYPE]: API_DATA.Locationtype,
  [CONFIG.LOCAL_KEY.SPECIALTY_TYPE]: API_DATA.Specialtytype,
  [CONFIG.LOCAL_KEY.PERIOD_TYPE]: API_DATA.Periodtype,
  [CONFIG.LOCAL_KEY.CAMP_TYPE]: API_DATA.Camptype,
  [CONFIG.LOCAL_KEY.RACE_TYPE]: API_DATA.RaceType,
};

/** 更新限制 */
let update_status = true;
/** 替换的数据 */
let replace_data: TableData;

/** 表格数据 */
const table_data = ref<TableData[]>([]);

/* 加载数据 */
const load = async () => {
  table_data.value = keywords.map((item) => {
    const v = JSON.parse(localStorage.getItem(item[0]) as string) || [];

    return {
      name: item[1],
      key: item[0],
      data: v,
      status: "正在检查...",
      length: v.length,
      size: $tool.getFileSizeInKB(v),
    };
  });

  for (let i = 0; i < table_data.value.length; i++) {
    const data = table_data.value[i];
    const v = (await requests[data.key]()).data;
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
  location.reload();
};

/* 检查更新 */
const handleCheck = _debounce(
  async (data: TableData) => {
    if (update_status) {
      update_status = false;
      data.status = "正在检查...";
      const v = (await requests[data.key]()).data;
      update_status = true;
      setTimeout(() => {
        setStatus(data, v);
      }, 1000);
    } else {
      $message("正在检查更新", "warning");
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
  const v = (await requests[data.key]()).data;
  updateData(data.key, v);
};

/* 强制覆盖 */
const handleReplace = (data: TableData) => {
  replace_data = data;
  $bus.emit("confirm", {
    text: "即将从远程下载当前数据进行覆盖",
    confirm: onConfirmReset,
  });
};

/* 导出 */
const handleExport = (data: TableData) => {
  $tool.savefiles(JSON.stringify({ data: data.data }, null, 2), data.key + ".json");
};

/* 确认覆盖 */
const onConfirmReset = async () => {
  const v = (await requests[replace_data.key]()).data;
  updateData(replace_data.key, v);
};

onActivated(() => {
  $audioStore.play("bq69");
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
            class="check"
            @click="handleCheck(data), play()"
          >
            检查更新
          </button>
          <button class="export" @click="handleExport(data), play()">导出</button>
          <button
            v-if="data.status === '待更新'"
            class="update"
            @click="handleUpdate(data), play()"
          >
            更新
          </button>
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
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
