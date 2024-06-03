<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";

import Annulus from "../../../../common/PartLibrary/Annulus/index.vue";
import Antenna from "../../../../common/PartLibrary/Antenna/index.vue";
import Blush from "../../../../common/PartLibrary/Blush/index.vue";
import Eye from "../../../../common/PartLibrary/Eye/index.vue";
import Mouth from "../../../../common/PartLibrary/Mouth/index.vue";
import Side from "../../../../common/PartLibrary/Side/index.vue";
import Wing from "../../../../common/PartLibrary/Wing/index.vue";

import ShopWindow from "./components/ShopWindow/index.vue";

import { YibaoStore } from "@/store";
import { YIBAO_PART } from "@/config";
import { vScrollVirtualization } from "@/directives";
import { _getMinecraftLink } from "@/utils/concise";
import { _cloneDeep } from "@/utils/tool";

const $yibaoStore = YibaoStore();
const { owned_part_id, temp_part_detail, part_style_type, part_type } = storeToRefs($yibaoStore);
const { setAnnulusId, setAntennaId, setBlushId, setEyeId, setMouthId, setSideId, setWingId } =
  $yibaoStore;

/** @description 将已拥有的部件置顶 */
const ownedSort = () => {
  return <T extends Record<string, any>>(data: T[]) => {
    const _data = _cloneDeep(data);
    _data.sort((a, b) => {
      if (owned_part_id.value.includes(a.id)) {
        return -1;
      } else if (owned_part_id.value.includes(b.id)) {
        return 1;
      } else {
        return 0;
      }
    });

    return _data;
  };
};

//当前选中的ID
const current_id = computed(() => temp_part_detail.value[part_type.value].id);
</script>

<template>
  <div v-scroll-virtualization class="colors-textures">
    <!-- 圆环 -->
    <template v-if="part_type === 'annulus'">
      <template v-if="part_style_type === 'COLOR'">
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.ANNULUS_COLOR)"
          :key="index"
          :active="current_id === item.id"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          @click="setAnnulusId(item.id, 'COLOR')"
        >
          <Annulus mode="COLOR" :animate="false" :border-color="item.color" />
        </ShopWindow>
      </template>
      <template v-else>
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.ANNULUS_IMG)"
          :key="index"
          :active="current_id === item.id"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          @click="setAnnulusId(item.id, 'IMG')"
        >
          <Annulus :bg-img="_getMinecraftLink(item.img)" :animate="false" mode="IMG" />
        </ShopWindow>
      </template>
    </template>

    <!-- 天线 -->
    <template v-if="part_type === 'antenna'">
      <template v-if="part_style_type === 'COLOR'">
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.ANTENNA_COLOR)"
          :key="index"
          :active="current_id === item.id"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          @click="setAntennaId(item.id, 'COLOR')"
        >
          <Antenna
            :animate="false"
            mode="COLOR"
            :bg-color="item.colors[0]"
            :border-color="item.colors[1]"
          />
        </ShopWindow>
      </template>
      <template v-else>
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.ANTENNA_IMG)"
          :key="index"
          :active="current_id === item.id"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          @click="setAntennaId(item.id, 'IMG')"
        >
          <Antenna :animate="false" mode="IMG" :bg-img="_getMinecraftLink(item.img)" />
        </ShopWindow>
      </template>
    </template>

    <!-- 腮红 -->
    <template v-if="part_type === 'blush'">
      <ShopWindow
        v-for="(item, index) in ownedSort()(YIBAO_PART.BLUSH_COLOR)"
        :key="index"
        :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
        :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
        :owned="owned_part_id.includes(item.id)"
        :active="current_id === item.id"
        @click="setBlushId(item.id, 'COLOR')"
      >
        <Blush :animate="false" :bg-color="item.color" />
      </ShopWindow>
    </template>

    <!-- 眼睛 -->
    <template v-if="part_type === 'eye'">
      <ShopWindow
        v-for="(item, index) in ownedSort()(YIBAO_PART.EYE_COLOR)"
        :key="index"
        :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
        :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
        :owned="owned_part_id.includes(item.id)"
        :active="current_id === item.id"
        @click="setEyeId(item.id, 'COLOR')"
      >
        <Eye :animate="false" :colors="item.colors" />
      </ShopWindow>
    </template>

    <!-- 嘴巴 -->
    <template v-if="part_type === 'mouth'">
      <ShopWindow
        v-for="(item, index) in ownedSort()(YIBAO_PART.MOUTH_COLOR)"
        :key="index"
        :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
        :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
        :owned="owned_part_id.includes(item.id)"
        :active="current_id === item.id"
        @click="setMouthId(item.id, 'COLOR')"
      >
        <Mouth :animate="false" :inner-color="item.colors[0]" :tongue-color="item.colors[1]" />
      </ShopWindow>
    </template>

    <!-- 六面 -->
    <template v-if="part_type === 'side'">
      <template v-if="part_style_type === 'COLOR'">
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.SIDE_COLOR)"
          :key="index"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          :active="current_id === item.id"
          @click="setSideId(item.id, 'COLOR')"
        >
          <Side :animate="false" :bg-color="item.colors[0]" :border-color="item.colors[1]" />
        </ShopWindow>
      </template>
      <template v-else>
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.SIDE_IMG)"
          :key="index"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          :active="current_id === item.id"
          @click="setSideId(item.id, 'IMG')"
        >
          <Side :animate="false" :sides="item" mode="IMG" />
        </ShopWindow>
      </template>
    </template>

    <!-- 羽翅 -->
    <template v-if="part_type === 'wing'">
      <template v-if="part_style_type === 'COLOR'">
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.WING_COLOR)"
          :key="index"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          :active="current_id === item.id"
          @click="setWingId(item.id, 'COLOR')"
        >
          <Wing :animate="false" mode="COLOR" :bg-color="item.color" />
        </ShopWindow>
      </template>
      <template v-else>
        <ShopWindow
          v-for="(item, index) in ownedSort()(YIBAO_PART.WING_IMG)"
          :key="index"
          :name="YIBAO_PART.PART_KEY_INFO[item.id].name"
          :price="YIBAO_PART.PART_KEY_INFO[item.id].price"
          :owned="owned_part_id.includes(item.id)"
          :active="current_id === item.id"
          @click="setWingId(item.id, 'IMG')"
        >
          <Wing :animate="false" mode="IMG" :bg-img="_getMinecraftLink(item.img)" />
        </ShopWindow>
      </template>
    </template>

    <div v-if="part_style_type === 'IMG'" class="tip">想要更多贴图可在群内发送贴图名称</div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
