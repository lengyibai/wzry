<script setup lang="ts">
import { computed, ref } from "vue";

import { HeroUpgradeInfo } from "../../interface";

import { upgradeGift } from "./helper";

import { vBlurLoad, vMouseTip } from "@/directives";
import { KButton, KHeroExp, KRange, KText } from "@/components/business";
import { $msgTipText, GAME_CONFIG, GAME_PROP, MESSAGE_TIP, MOUSE_TIP } from "@/config";
import { KnapsackStore } from "@/store";
import { useSetMarker } from "@/hooks";
import { $obtain, $message } from "@/utils/busTransfer";
import { _calcLevelPercentage } from "@/utils/tool";
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** 英雄升级信息 */
  hero: HeroUpgradeInfo;
  /** 道具类型 */
  propType: "HERO_EXP_ONE" | "HERO_EXP_TWO";
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  back: [];
}>();

const $knapsackStore = KnapsackStore();

const $useSetMarker = useSetMarker();

/** 经验包使用数量 */
const count = ref(1);
/** 当前等级 */
const level = ref(1);

/** 目标经验 */
const target_exp = computed(
  () => $props.hero.exp + count.value * GAME_CONFIG.UPGRADE_EXP[$props.propType],
);
/** 当前经验百分比 */
const level_info = computed(() =>
  _calcLevelPercentage(target_exp.value, GAME_CONFIG.UPGRADE_RANGE),
);

/* 返回选择英雄 */
const handleBack = () => {
  $emit("back");
};

/* 确定升级 */
const handleUpgrade = () => {
  const currentExp = $knapsackStore.hero_list[$props.hero.id].exp;
  const awards = upgradeGift(currentExp, target_exp.value);

  //升级赠送
  if (awards.length > 0) {
    const obtain = awards.map((item) => {
      const prop = GAME_PROP[item.key as Game.PropKey];
      $knapsackStore.setGamePropNum(prop.key, item.count, "ADD");
      $useSetMarker.add(prop.key, item.count, "UPGRADE");

      return {
        icon: _getImgLink(prop.iconName),
        name: prop.label,
        num: item.count,
      };
    });

    $obtain(obtain);
  }

  //扣除道具
  $knapsackStore
    .setGamePropNum($props.propType, count.value, "SUB")
    .then(() => {
      //升级英雄
      $knapsackStore.upgradeHero(
        $props.hero.id,
        count.value * GAME_CONFIG.UPGRADE_EXP[$props.propType],
      );
      $message(MESSAGE_TIP.pt07);
      $emit("back");
    })
    .catch(() => {
      $message($msgTipText("wa83", { v: GAME_PROP[$props.propType].label }), "error");
    });
};
</script>

<template>
  <!-- 顶部关闭 -->
  <div v-mouse-tip class="back" @click="handleBack"></div>
  <div class="hero-info">
    <img v-blur-load="hero.cover" :src="hero.coverBlur" alt="" class="cover" />
    <div class="info">
      <div class="name">{{ hero.name }}</div>

      <!-- 熟练度图标 -->
      <div class="exp-icon">
        <KHeroExp v-model="level" class="k-hero-exp" size="3.5rem" :exp="target_exp" />

        <div class="exp-name">
          <KText :text="GAME_CONFIG.EXP_NAME[hero.profession[0]][level_info.index]" />
        </div>
      </div>

      <!-- 熟练度条 -->
      <div class="exp-bar">
        <div
          class="bar-content"
          :style="{
            width: `${level_info.percentage * 100}%`,
          }"
        >
          <div class="bar"></div>
        </div>
      </div>

      <!-- 数字熟练度 -->
      <div class="schedule">{{ level_info.exp }}/{{ level_info.maxExp }}</div>
    </div>
  </div>

  <!-- 奖励领取进度 -->
  <div class="reward">
    <div class="gifts">
      <div class="gift"></div>
      <div
        v-for="(v, k) in GAME_CONFIG.UPGRADE_GIFT"
        :key="k"
        v-mouse-tip="{
          text: MOUSE_TIP.lq42,
          disabled: true,
        }"
        :class="{
          receive: hero.exp < k && target_exp >= k,
          received: hero.exp >= k,
        }"
        class="gift"
      >
        <div
          class="icon"
          :class="{
            blur: hero.exp < k && target_exp >= k,
          }"
          :style="{
            backgroundImage: `url(${_getImgLink(GAME_PROP[v.key].iconName)})`,
          }"
        ></div>
        <div class="num" :data-text="v.count">{{ v.count }}</div>
      </div>
    </div>
    <div class="progress">
      <div
        class="bar"
        :style="{
          width: `${((level - 1) / 4) * 100}%`,
        }"
      ></div>
    </div>
  </div>

  <div class="range">
    <div class="desc">
      <span class="text">
        {{ GAME_CONFIG.UPGRADE_EXP[propType] }}
        经验使用数量
      </span>
      <span class="num">{{ count }}</span>
    </div>
    <KRange
      v-model="count"
      :min="1"
      :max="$knapsackStore.articles[propType]"
      :show-num="false"
      width="20rem"
    />
  </div>
  <KButton type="warning" class="k-button" @click="handleUpgrade">确定</KButton>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
