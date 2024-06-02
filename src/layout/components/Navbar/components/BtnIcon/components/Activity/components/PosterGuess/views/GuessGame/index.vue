<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { useMagicKeys } from "@vueuse/core";

import { useHidePosterGuess } from "../../hooks/useHidePosterGuess";
import { useCloseToStore } from "../../../../common/hooks/useCloseToStore";
import { useIntoGame } from "../../../../hooks/useHideActivity";

import { useGuessPoster } from "./hooks/useGuessPoster";

import {
  KButton,
  KLoadingIcon,
  KPropNum,
  KScrollCountdown,
  SelectHeroAndSkin,
} from "@/components/business";
import { vMouseTip, vTypewriterSingle } from "@/directives";
import { _promiseTimeout } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { GAME_PROP, MESSAGE_TIP } from "@/config";
import { _getPropLink } from "@/utils/concise";

const modelValue = defineModel<boolean>({ required: true });

const { escape } = useMagicKeys();
const { setHidePosterGuessPart } = useHidePosterGuess();
const { setHideActivityPart } = useIntoGame();

/** 关闭活动 */
const closeActivity = inject<() => void>("close-activity")!;
const {
  answer_status,
  answer,
  countdown,
  guess_coin,
  guessing,
  loading,
  poster,
  randomPoster,
  receiveGuessCoin,
  reveal,
  right_answer,
  running,
  setShowStatus,
  show_receive,
  show_status,
  status_text,
  submitAnswer,
} = useGuessPoster(closeActivity, handleClose);

/** 是否显示 */
const show = ref(true);
/** 是否显示按钮 */
const show_btn = ref(false);

/* 打字结束后触发 */
const typewriterCallback = () => {
  show_btn.value = true;
};

/* 关闭游戏 */
async function handleClose() {
  show.value = false;

  await _promiseTimeout(500);
  modelValue.value = false;
  setHidePosterGuessPart(false);
  setHideActivityPart(false);
}

/* 是否进入下一题 */
const handleNext = () => {
  if (useCloseToStore(closeActivity, handleClose)) return;
  if (!show_btn.value) return;
  show_btn.value = false;
  randomPoster();

  setTimeout(() => {
    setShowStatus(false);
  }, 250);
};

/* 退出竞猜 */
const exitGuess = () => {
  //退出自动领取奖励
  if (show_receive.value) {
    receiveGuessCoin();
  }
  handleClose();
};

watch(escape, (v) => {
  if (!v) return;
  if (guessing.value) {
    $message(MESSAGE_TIP.da62, "error");
    return;
  }

  exitGuess();
});
</script>

<template>
  <teleport to="body">
    <transition name="fade" appear>
      <div v-show="show" class="guess-game">
        <!-- 剩余道具 -->
        <div class="guess-prop">
          <KPropNum
            prop-key="GUESS_CARD"
            font-size="3rem"
            height="3.5rem"
            margin-right="2rem"
            gap="1rem"
            shine
          />
          <KPropNum prop-key="GUESS_COIN" gap="1rem" font-size="3rem" height="3.5rem" shine />
        </div>

        <!-- 出题区 -->
        <div
          class="guess-poster"
          :class="{
            green: answer_status === 1,
            red: answer_status === 2,
          }"
        >
          <transition-group name="fade">
            <div v-show="show_status" key="c" class="answer">{{ right_answer }}</div>
            <KLoadingIcon v-if="loading" key="a" white width="6.25rem" />
            <div
              v-else
              key="b"
              class="topic"
              :style="{
                backgroundImage: `url(${poster})`,
              }"
              :class="{
                reveal,
              }"
            ></div>
          </transition-group>
        </div>

        <!-- 提交区域 -->
        <div class="submit">
          <SelectHeroAndSkin
            v-model="answer"
            :empty="false"
            :disabled="!running"
            black
            type="HERO"
            placeholder="英雄名称"
          />
          <div
            v-mouse-tip="{
              disabled: !running,
            }"
            class="commit"
            :class="{
              disabled: !running,
            }"
            @click="submitAnswer"
          >
            {{ answer === "" ? "放弃作答" : "提交答案" }}
          </div>
        </div>

        <!-- 领取奖励 -->
        <transition v-if="show_receive" name="fade" appear>
          <div class="receive-guess-coin">
            <div class="prop">
              <div
                class="icon"
                :style="{
                  backgroundImage: `url(${_getPropLink(GAME_PROP.ICON['GUESS_COIN'])})`,
                }"
              ></div>
              <div class="count">×{{ guess_coin }}</div>
            </div>
            <KButton type="warning" @click="receiveGuessCoin">领取竞猜币</KButton>
          </div>
        </transition>

        <!-- 回答状态 -->
        <transition v-else name="to-top">
          <div
            v-if="show_status"
            v-typewriter-single="{
              callback: typewriterCallback,
              delay: 250,
              speed: 100,
            }"
            class="answer-status"
            :class="{
              green: answer_status === 1,
              red: answer_status === 2,
            }"
            v-html="status_text"
          ></div>
        </transition>

        <!-- 是否进入下一题 -->
        <transition name="to-top">
          <div v-show="show_btn" class="btns">
            <div class="close" @click="handleClose">
              <i class="iconfont wzry-guanbi"></i>
            </div>
            <div class="next" @click="handleNext">
              <i
                class="iconfont wzry-dui"
                :class="answer_status === 1 ? 'wzry-you' : 'wzry-dui'"
              ></i>
            </div>
          </div>
        </transition>

        <!-- 倒计时 -->
        <transition name="to-top">
          <div v-show="running" class="countdown">
            <div class="text">剩余填写时间：</div>
            <transition name="fade">
              <KScrollCountdown :rate="0.45" :running="running" unit="SEC" :nums="countdown" />
            </transition>
          </div>
        </transition>

        <!-- Tip -->
        <transition name="to-top" appear>
          <div class="tips">
            <div class="tip">按键盘ESC键(退出键)可退出竞猜</div>
            <div class="tip">在竞猜过程中关闭或刷新浏览器，下次竞猜将自动扣除竞猜券</div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
