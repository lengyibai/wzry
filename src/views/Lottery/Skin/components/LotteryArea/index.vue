<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

import { LotteryStore, SettingStore } from "@/store";
import { GAME_PROP, MOUSE_TIP } from "@/config";
import { KButton } from "@/components/business";
import { vMouseTip } from "@/directives";
import { _promiseTimeout } from "@/utils/tool";
import { useLotteryPlay } from "@/views/Lottery/common/hooks/useLotteryPlay";
import { LOTTERY_AWARD } from "@/config/modules/game-config";
import { _getPropLink } from "@/utils/concise";
import { usePlayAudio } from "@/hooks";

const $lotteryStore = LotteryStore();
const $settingStore = SettingStore();

const { skin_lucky } = storeToRefs($lotteryStore);

const { playAudio } = usePlayAudio();
const {
  getLotteryIndex,
  gift_index,
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
} = useLotteryPlay("SKIN");

/** 当前旋转索引 */
const active_index = ref(-1);

/** @description 是否开启夺宝动画 */
const lottery_animation = computed(() => $settingStore.config.lotteryAnimation);

/** @description 开始夺宝 */
const handlePlay = () => {
  if (checkAloneNotCount()) return;
  getLotteryIndex();

  /** 当前旋转圈数 */
  let round_count = 0;
  /** 用于减缓转速 */
  let delay = 0;

  const play = () => {
    setTimeout(
      () => {
        playAudio("o7r6");
        active_index.value++;

        //转满一圈重置索引
        if (active_index.value === 12) {
          active_index.value = 0;
        }

        //当前转动索引经过上一次中奖索引时，圈数+1
        if (active_index.value === last_reward_position.value) {
          round_count++;
        }

        //圈数达到两圈减缓转速
        if (round_count === 2) {
          delay += 35;
        }

        //当圈数为两圈，且奖品索引等于当前索引，则间隔半秒结算奖励
        if (round_count === 2 && gift_index.value === active_index.value) {
          setTimeout(() => {
            setLastPosition(gift_index.value);
            $lotteryStore.setLuckValue("SKIN");
            calcAloneReward();
          }, 250);

          return;
        }

        play();
      },
      50 + [0, 25, 50, 75][round_count] + delay,
    );
  };
  play();
};

/** @description 开始夺宝
 * @param type 抽奖模式类型
 */
const handlePlayFive = (type: "FREE" | "DEDUCTION") => {
  if (checkMultipleNotCount(type, handlePlay)) return;

  /** 存储五次转到的奖品 */
  const awards_index: number[] = [];
  //循环转圈
  const play = () => {
    setTimeout(
      async () => {
        active_index.value++;

        if (lottery_animation.value) playAudio("o7r6");

        //转满一圈重置索引
        if (active_index.value === 12) {
          active_index.value = 0;
        }

        //转到奖品后，并且低于五个，停留半秒继续旋转
        if (gift_index.value === active_index.value && awards_index.length < 5) {
          //增加幸运值的时候顺便扣除了夺宝币，只有夺宝石为0的时候会扣除
          $lotteryStore.setLuckValue("SKIN");

          //如果抽到了荣耀水晶，则重置状态
          if (LOTTERY_AWARD.SKIN[gift_index.value].type === "HONOR_CRYSTAL") {
            $lotteryStore.resetSkinLuck();
          }

          awards_index.push(gift_index.value);
          await _promiseTimeout(lottery_animation.value ? 500 : 0, getLotteryIndex);

          //当奖品达到5个时，停止夺宝并结算奖励
          if (awards_index.length >= 5) {
            calcMultipleReward(awards_index);
            return;
          }
        }
        play();
      },
      lottery_animation.value ? 50 : 0,
    );
  };
  play();
};
</script>

<template>
  <div class="lottery-area">
    <div
      v-for="(item, index) in LOTTERY_AWARD.SKIN"
      :key="index"
      :class="{
        active: active_index === index,
      }"
      class="area-box"
    >
      <div v-if="item.num" class="tag">{{ item.num }}</div>
      <img :src="_getPropLink(GAME_PROP.ICON[item.type])" alt="" class="icon" />
      <div class="text">{{ GAME_PROP.NAME[item.type] }}</div>
    </div>

    <div class="tool">
      <div class="content">
        <div class="luck">
          <div class="luck-value">
            <div class="value" :data-text="skin_lucky">{{ skin_lucky }}</div>
          </div>
          <div class="luck-label" data-text="幸运值">幸运值</div>
        </div>

        <div class="btns">
          <!-- 夺宝币夺宝 -->
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
              <img :src="_getPropLink(GAME_PROP.ICON['SKIN_LOTTERY_COIN'])" alt="" class="icon" />
              <span class="num">×1</span>
              <div class="text">夺宝一次</div>
            </KButton>

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
              <img :src="_getPropLink(GAME_PROP.ICON['SKIN_LOTTERY_COIN'])" alt="" class="icon" />
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
              class="k-button"
              type="warning"
              :disabled="!have_alone_discount"
              @click="handlePlay"
            >
              <img :src="_getPropLink(GAME_PROP.ICON['SKIN_LOTTERY_STONE'])" alt="" class="icon" />
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
              <img :src="_getPropLink(GAME_PROP.ICON['SKIN_LOTTERY_STONE'])" alt="" class="icon" />
              <span class="num">×5</span>
              <div class="text">夺宝五次</div>
            </KButton>
          </template>
        </div>
      </div>
      <div class="waves" :style="`--height:${skin_lucky / 2}%`">
        <div
          v-for="(item, index) in 50"
          :key="index"
          :style="{
            animationDelay: index * 0.05 + 's',
          }"
          class="wave"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
