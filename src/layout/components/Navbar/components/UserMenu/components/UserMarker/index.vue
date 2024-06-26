<script setup lang="ts">
import { storeToRefs } from "pinia";

import { MOUSE_TIP } from "@/config";
import { vMouseTip } from "@/directives";
import { MarkerStore } from "@/store";
import type { MarkerStoreType } from "@/store/interface";
import { _getMiniHeroLink } from "@/utils/concise";
import { _formatSecondsToChinese, _random } from "@/utils/tool";

/** 是否显示 */
const show_marker = defineModel<boolean>({ required: true });

const $markerStore = MarkerStore();
const { marker_num_list } = storeToRefs($markerStore);

const card_list: {
  title: string;
  marker_list: { label: string; key: MarkerStoreType.MarkerKey }[];
}[] = [
  {
    title: "访问时间",
    marker_list: [
      {
        label: "登录天数",
        key: "tg73",
      },
      {
        label: "在线时长",
        key: "mc93",
      },
    ],
  },
  {
    title: "夺宝消耗",
    marker_list: [
      {
        label: "英雄夺宝石",
        key: "ku27",
      },
      {
        label: "皮肤夺宝石",
        key: "i87h",
      },
      {
        label: "英雄夺宝币",
        key: "g45c",
      },
      {
        label: "皮肤夺宝币",
        key: "al38",
      },
      {
        label: "英雄夺宝次数",
        key: "d24r",
      },
      {
        label: "皮肤夺宝次数",
        key: "y8b2",
      },
    ],
  },
  {
    title: "秘宝消耗",
    marker_list: [
      {
        label: "英雄夺宝",
        key: "d24r",
      },
      {
        label: "皮肤夺宝",
        key: "y8b2",
      },
      {
        label: "英雄秘宝",
        key: "kj05",
      },
      {
        label: "勇者皮肤秘宝",
        key: "aw51",
      },
      {
        label: "史诗皮肤秘宝",
        key: "ez16",
      },
      {
        label: "传说皮肤秘宝",
        key: "cz62",
      },
      {
        label: "限定皮肤秘宝",
        key: "cs01",
      },
    ],
  },
  {
    title: "宝箱消耗",
    marker_list: [
      {
        label: "随机英雄",
        key: "er08",
      },
      {
        label: "自选英雄",
        key: "q65b",
      },
      {
        label: "自选勇者皮肤",
        key: "k4f6",
      },
      {
        label: "自选史诗皮肤",
        key: "yq53",
      },
      {
        label: "自选传说皮肤",
        key: "ag35",
      },
      {
        label: "自选限定皮肤",
        key: "cj13",
      },
    ],
  },
  {
    title: "竞猜消耗",
    marker_list: [
      {
        label: "竞猜币",
        key: "pa16",
      },
      {
        label: "竞猜券",
        key: "j7m4",
      },
      {
        label: "海报竞猜次数",
        key: "ks52",
      },
      {
        label: "海报竞猜答错次数",
        key: "v87u",
      },
      {
        label: "技能竞猜次数",
        key: "ht88",
      },
      {
        label: "技能竞猜答错次数",
        key: "ff88",
      },
    ],
  },
  {
    title: "道具消耗",
    marker_list: [
      {
        label: "金币",
        key: "h3t4",
      },
      {
        label: "钻石",
        key: "cq65",
      },
      {
        label: "英雄碎片",
        key: "vu33",
      },
      {
        label: "皮肤碎片",
        key: "i0k4",
      },
      {
        label: "王者水晶",
        key: "rj89",
      },
      {
        label: "荣耀水晶",
        key: "q9y1",
      },
      {
        label: "一级经验宝箱",
        key: "iu48",
      },
      {
        label: "二级经验宝箱",
        key: "nn05",
      },
      {
        label: "英雄夺宝周卡",
        key: "er27",
      },
      {
        label: "皮肤夺宝周卡",
        key: "ml55",
      },
      {
        label: "双倍经验卡",
        key: "e13s",
      },
      {
        label: "双倍金币卡",
        key: "c8k7",
      },
      {
        label: "伴生皮肤卡",
        key: "mh01",
      },
    ],
  },
];
</script>

<template>
  <teleport to="body">
    <transition name="to-top-opacity" appear>
      <div v-if="show_marker" class="user-marker">
        <div
          v-mouse-tip="{
            text: MOUSE_TIP.mk66,
          }"
          class="close"
          @click="show_marker = false"
        ></div>

        <div class="marker-list">
          <template v-for="(v, k) in card_list" :key="k">
            <div class="title">{{ v.title }}</div>
            <div class="card-list">
              <div v-for="(item, index) in v.marker_list" :key="index" class="card-item">
                <img :src="_getMiniHeroLink(`mini_hero_${_random(1, 50)}`)" alt="" class="bg" />
                <div class="label">{{ item.label }}</div>
                <div class="value">
                  {{
                    item.key === "mc93"
                      ? _formatSecondsToChinese(marker_num_list[item.key]?.value || 0)
                      : marker_num_list[item.key]?.value
                  }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
