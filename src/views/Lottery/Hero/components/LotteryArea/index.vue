<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { useLotteryPlay } from "@/views/Lottery/common/hooks/useLotteryPlay";
import { AuthStore, LotteryStore, SettingStore } from "@/store";
import { GAME_PROP, MOUSE_TIP } from "@/config";
import { KButton } from "@/components/business";
import { vMouseTip } from "@/directives";
import { _getPropLink, _getMiscLink } from "@/utils/concise";
import { LOTTERY_AWARD, LOTTERY_CRYSTAL_INTERVAL } from "@/config/modules/game-config";
import { _promiseTimeout } from "@/utils/tool";

const $lotteryStore = LotteryStore();
const $authStore = AuthStore();
const $settingStore = SettingStore();

const { setLuckValue, resetHeroLuck } = $lotteryStore;

const { hero_lucky } = storeToRefs($lotteryStore);
const { user_data } = storeToRefs($authStore);

const {
  gift_index,
  getLotteryIndex,
  last_reward_position,
  checkAloneNotCount,
  setLastPosition,
  have_alone_free,
  have_multiple_free,
  have_alone_discount,
  have_multiple_discount,
  calcAloneReward,
  calcMultipleReward,
  checkMultipleNotCount,
} = useLotteryPlay("HERO");

/** 旋转角度 */
const deg = ref();
/** 旋转时间 */
const duration = ref(0);

/** @description 是否开启夺宝动画 */
const lottery_animation = computed(() => $settingStore.config.lotteryAnimation);

/** @description 开始夺宝 */
const handlePlay = async () => {
  if (checkAloneNotCount()) return;
  getLotteryIndex();

  await _promiseTimeout();

  duration.value = 2;

  await _promiseTimeout();
  //计算目标角度
  deg.value =
    last_reward_position.value -
    (last_reward_position.value % 360) +
    gift_index.value * 36 +
    360 * 2;

  await _promiseTimeout(2000);
  setLastPosition(deg.value);
  setLuckValue("HERO");
  calcAloneReward();
};

/** @description 开始夺宝
 * @param type 抽奖模式类型
 */
const handlePlayFive = (type: "FREE" | "DEDUCTION") => {
  if (checkMultipleNotCount(type, handlePlay)) return;

  /** 存储五次转到的奖品 */
  const awards_index: number[] = [];
  //循环转圈
  const play = async () => {
    await _promiseTimeout();
    duration.value = 1;

    await _promiseTimeout();
    //计算目标角度
    deg.value =
      last_reward_position.value -
      (last_reward_position.value % 360) +
      gift_index.value * 36 +
      360 * 1;

    await _promiseTimeout(lottery_animation.value ? 1000 : 0);
    setLuckValue("HERO");

    //如果抽到了王者水晶，则重置状态
    if (LOTTERY_AWARD.HERO[gift_index.value].type === "KING_CRYSTAL") {
      resetHeroLuck();
    }

    last_reward_position.value = deg.value;
    awards_index.push(gift_index.value);
    getLotteryIndex();

    //如果奖品低于5个，则继续
    if (awards_index.length < 5) {
      setTimeout(play, lottery_animation.value ? 250 : 0);
      return;
    }

    calcMultipleReward(awards_index);
  };
  play();
};
</script>

<template>
  <div class="play-area">
    <!-- 是否为双倍状态 -->
    <div class="double-status">
      <div v-if="user_data.doubleGoldCardExpireTime !== 0" class="status">
        <img :src="_getMiscLink('double_gold_status')" alt="" class="icon" />
        <span class="text">×2倍</span>
      </div>
      <div v-if="user_data.doubleExpCardExpireTime !== 0" class="status">
        <img :src="_getMiscLink('double_exp_status')" alt="" class="icon" />
        <span class="text">×2倍</span>
      </div>
    </div>

    <!-- 转盘 -->
    <div class="fix-position">
      <div
        class="turntable"
        :style="{
          transform: `rotate(${-deg}deg)`,
          transitionDuration: duration + 's',
        }"
      >
        <div class="award">
          <div
            v-for="(item, index) in LOTTERY_AWARD.HERO"
            :key="index"
            class="award-item"
            :style="`--i:${index}`"
          >
            <div v-if="item.num" class="tag">{{ item.num }}</div>
            <img :src="_getPropLink(GAME_PROP.ICON[item.type])" alt="" class="icon" />
            <div class="text">{{ GAME_PROP.NAME[item.type] }}</div>
          </div>
        </div>
      </div>
      <div class="turntable-mask"></div>

      <!-- 转盘中心 -->
      <div class="spin">
        <div class="content">
          <div class="luck">
            <div class="luck-value">
              <div class="value" :data-text="hero_lucky">{{ hero_lucky }}</div>
            </div>
            <div class="luck-label" data-text="幸运值">幸运值</div>
          </div>
        </div>

        <!-- 转盘波浪 -->
        <div
          class="waves"
          :style="`--height:${(hero_lucky / LOTTERY_CRYSTAL_INTERVAL.hero[1]) * 100}%`"
        >
          <div
            v-for="(_, index) in 50"
            :key="index"
            :style="{
              animationDelay: index * 0.05 + 's',
            }"
            class="wave"
          ></div>
        </div>
      </div>
    </div>

    <!-- 底座 -->
    <div class="base">
      <!-- 夺宝一次 -->
      <template v-if="have_alone_free">
        <KButton
          v-mouse-tip="{
            disabled: !have_alone_free,
            text: !have_alone_free ? MOUSE_TIP.zk84 : '',
          }"
          :disabled="!have_alone_free"
          class="k-button"
          type="warning"
          @click="handlePlay"
        >
          <img :src="_getPropLink(GAME_PROP.ICON['HERO_LOTTERY_COIN'])" alt="" class="icon" />
          <span class="num">×1</span>
          <div class="text">夺宝一次</div>
        </KButton>

        <!-- 夺宝五次 -->
        <KButton
          v-mouse-tip="{
            disabled: !have_multiple_free,
            text: !have_multiple_free ? MOUSE_TIP.c2y9 : '',
          }"
          :disabled="!have_multiple_free"
          class="k-button"
          type="warning"
          @click="handlePlayFive('FREE')"
        >
          <img :src="_getPropLink(GAME_PROP.ICON['HERO_LOTTERY_COIN'])" alt="" class="icon" />
          <span class="num">×5</span>
          <div class="text">夺宝五次</div>
        </KButton>
      </template>

      <!-- 夺宝石夺宝 -->
      <template v-else>
        <KButton
          v-mouse-tip="{
            disabled: !have_alone_discount,
            text: !have_alone_discount ? MOUSE_TIP.zk84 : '',
          }"
          :disabled="!have_alone_discount"
          class="k-button"
          type="warning"
          @click="handlePlay"
        >
          <img :src="_getPropLink(GAME_PROP.ICON['HERO_LOTTERY_STONE'])" alt="" class="icon" />
          <span class="num">×1</span>
          <div class="text">夺宝一次</div>
        </KButton>

        <KButton
          v-mouse-tip="{
            disabled: !have_multiple_discount,
            text: !have_multiple_discount ? MOUSE_TIP.c2y9 : '',
          }"
          :disabled="!have_multiple_discount"
          class="k-button"
          type="warning"
          @click="handlePlayFive('DEDUCTION')"
        >
          <img :src="_getPropLink(GAME_PROP.ICON['HERO_LOTTERY_STONE'])" alt="" class="icon" />
          <span class="num">×5</span>
          <div class="text">夺宝五次</div>
        </KButton>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
