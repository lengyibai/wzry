<script setup lang="ts">
import { KText } from "@/components/business";
import { _getMiscLink } from "@/utils/concise";

interface Props {
  /** 装备 */
  equip: Game.Equip.Data | undefined;
  /** 是否显示 */
  show: boolean;
}

defineProps<Props>();

/** css类名值 */
const abbreviations: Record<string, string> = {
  最大生命: "zdsm",
  每5秒回血: "hx",
  移速: "ys",
  攻击速度: "gjsd",
  冷却缩减: "lqsj",
  物理吸血: "wlxx",
  物理攻击: "wlgj",
  暴击率: "bjl",
  物理防御: "wlfy",
  法术吸血: "fsxx",
  最大法力: "zdfl",
  每5秒回蓝: "hl",
  法术防御: "fsfy",
  法术攻击: "fsgj",
};
</script>

<template>
  <div class="equip-detail" :class="{ show: show }">
    <template v-if="equip">
      <!-- 名称 -->
      <div class="name">{{ equip.name }}</div>

      <!-- 数值信息 -->
      <div class="info">
        <div v-for="(item, index) in equip.effect" :key="index" class="effect">
          <div
            class="icon"
            :style="{
              backgroundImage: `url(${_getMiscLink('equip_effect')})`,
            }"
            :class="abbreviations[item.name]"
          ></div>
          <span class="num">+{{ item.num }} <KText :text="item.name" /></span>
        </div>
      </div>

      <!-- 被动/主动 -->
      <div class="details">
        <div v-for="(item, index) in equip.motivation" :key="index" class="motivation">
          <div class="title">{{ item.type }}-{{ item.name }}</div>
          <div class="desc">{{ item.desc }}</div>
          <div v-if="item.time" class="time lq">{{ item.time }}秒</div>
          <div v-if="item.note" class="note" v-html="item.note"></div>
        </div>
      </div>
      <div v-if="equip.note" class="note">
        {{ equip.note }}
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
