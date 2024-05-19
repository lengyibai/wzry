<script setup lang="ts">
import { storeToRefs } from "pinia";

import Antenna from "../../common/PartLibrary/Antenna/index.vue";
import Side from "../../common/PartLibrary/Side/index.vue";
import Eye from "../../common/PartLibrary/Eye/index.vue";
import Mouth from "../../common/PartLibrary/Mouth/index.vue";
import Annulus from "../../common/PartLibrary/Annulus/index.vue";
import Wing from "../../common/PartLibrary/Wing/index.vue";
import Blush from "../../common/PartLibrary/Blush/index.vue";

import { YibaoStore } from "@/store";

interface Props {
  /** 部件键名 */
  partKey: Game.YiBao.PartType;
  /** 大小倍率 */
  rate?: number;
}
withDefaults(defineProps<Props>(), {
  rate: 1,
});

const $yibaoStore = YibaoStore();
const { part_color, part_texture, temp_part_detail } = storeToRefs($yibaoStore);
</script>

<template>
  <!-- 圆环 -->
  <Annulus
    v-if="partKey === 'annulus'"
    :mode="temp_part_detail.annulus.type"
    :bg-img="part_texture.annulus"
    :border-color="part_color.annulus"
    :rate="rate"
  />

  <!-- 天线 -->
  <Antenna
    v-if="partKey === 'antenna'"
    :bg-color="part_color.antenna[0]"
    :mode="temp_part_detail.antenna.type"
    :bg-img="part_texture.antenna"
    :border-color="part_color.antenna[1]"
    :rate="rate"
  />

  <!-- 六面 -->
  <Side
    v-if="partKey === 'side'"
    :bg-color="part_color.side[0]"
    :mode="temp_part_detail.side.type"
    :sides="part_texture.side"
    :border-color="part_color.side[1]"
    :rate="rate"
  />

  <!-- 眼睛 -->
  <Eye v-if="partKey === 'eye'" :colors="part_color.eye" :rate="rate" />

  <!-- 嘴巴 -->
  <Mouth
    v-if="partKey === 'mouth'"
    :inner-color="part_color.mouth[0]"
    :rate="rate"
    :tongue-color="part_color.mouth[1]"
  />

  <!-- 羽翅 -->
  <Wing
    v-if="partKey === 'wing'"
    :mode="temp_part_detail.wing.type"
    :rate="rate"
    :bg-img="part_texture.wing"
    :bg-color="part_color.wing"
  />

  <!-- 腮红 -->
  <Blush v-if="partKey === 'blush'" :bg-color="part_color.blush" :rate="rate" />
</template>
