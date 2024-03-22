<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useLotteryPlay } from "@/views/Lottery/common/hooks/useLotteryPlay";
import { AuthStore, LotteryStore, MarkerStore } from "@/store";
import { GAME_PROP, MOUSE_TIP } from "@/config";
import { KButton } from "@/components/business";
import { vMouseTip } from "@/directives";
import { _getImgLink } from "@/utils/concise";
import { LOTTERY_AWARD } from "@/config/modules/game-config";

const $lotteryStore = LotteryStore();
const $markerStore = MarkerStore();
const $authStore = AuthStore();

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

/* 开始夺宝 */
const handlePlay = () => {
  if (checkAloneNotCount()) return;
  getLotteryIndex();

  setTimeout(() => {
    duration.value = 2;

    setTimeout(() => {
      //计算目标角度
      deg.value =
        last_reward_position.value -
        (last_reward_position.value % 360) +
        gift_index.value * 36 +
        360 * 2;

      setTimeout(() => {
        setLastPosition(deg.value);
        setLuckValue("HERO");
        calcAloneReward();
      }, 2000);
    });
  });
};

/* 开始夺宝 */
const handlePlayFive = (type: "FREE" | "DEDUCTION") => {
  if (checkMultipleNotCount(type, handlePlay)) return;

  /** 存储五次转到的奖品 */
  const awards_index: number[] = [];
  /* 循环转圈 */
  const play = () => {
    setTimeout(() => {
      duration.value = 1;

      setTimeout(() => {
        //计算目标角度
        deg.value =
          last_reward_position.value -
          (last_reward_position.value % 360) +
          gift_index.value * 36 +
          360 * 1;

        setTimeout(() => {
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
            setTimeout(play, 250);
            return;
          }

          calcMultipleReward(awards_index);
          $markerStore.addMarkerNum("d1f9", 5);
        }, 1000);
      });
    });
  };
  play();
};
</script>

<template>
  <div class="play-area">
    <div class="double-status">
      <div v-if="user_data.doubleGoldCardExpireTime !== 0" class="status">
        <img :src="_getImgLink('double_gold')" alt="" class="icon" />
        <span class="text">×2倍</span>
      </div>
      <div v-if="user_data.doubleExpCardExpireTime !== 0" class="status">
        <img :src="_getImgLink('double_exp')" alt="" class="icon" />
        <span class="text">×2倍</span>
      </div>
    </div>

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
            <img :src="_getImgLink(GAME_PROP[item.type].iconName)" alt="" class="icon" />
            <div class="text">{{ GAME_PROP[item.type].label }}</div>
          </div>
        </div>
      </div>
      <div class="turntable-mask"></div>

      <div class="spin">
        <div class="content">
          <div class="luck">
            <div class="luck-value">
              <div class="value" :data-text="hero_lucky">{{ hero_lucky }}</div>
            </div>
            <div class="luck-label" data-text="幸运值">幸运值</div>
          </div>
        </div>
        <div class="waves" :style="`--height:${hero_lucky}%`">
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

    <div class="base">
      <template v-if="have_alone_discount">
        <KButton class="k-button" type="warning" @click="handlePlay">
          <img :src="_getImgLink(GAME_PROP.HERO_LOTTERY_STONE.iconName)" alt="" class="icon" />
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
          <img :src="_getImgLink(GAME_PROP.HERO_LOTTERY_STONE.iconName)" alt="" class="icon" />
          <span class="num">×5</span>
          <div class="text">夺宝五次</div>
        </KButton>
      </template>
      <template v-else>
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
          <img :src="_getImgLink(GAME_PROP.HERO_LOTTERY_COIN.iconName)" alt="" class="icon" />
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
          <img :src="_getImgLink(GAME_PROP.HERO_LOTTERY_COIN.iconName)" alt="" class="icon" />
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
