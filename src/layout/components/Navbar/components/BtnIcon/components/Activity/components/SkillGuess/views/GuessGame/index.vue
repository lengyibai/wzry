<script setup lang="ts">
import { inject, nextTick, ref } from "vue";

import { useHideSkillGuess } from "../../hooks/useHideSkillGuess";
import { useCloseToStore } from "../../../../common/hooks/useCloseToStore";
import { useIntoGame } from "../../../../hooks/useHideActivity";

import { useGuessSkill } from "./hooks/useGuessSkill";

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
import { _getPropLink, _getMiscLink } from "@/utils/concise";

const modelValue = defineModel<boolean>({ required: true });

const { setHideSkillGuessPart } = useHideSkillGuess();
const { setHideActivityPart } = useIntoGame();

/** 关闭活动 */
const closeActivity = inject<() => void>("close-activity")!;
const {
  answer_status,
  answer,
  countdown,
  guess_coin,
  guessing,
  hero_name,
  loading,
  randomSkill,
  receiveGuessCoin,
  reveal,
  right_skill_index_list,
  running,
  selectSkillIndex,
  setShowStatus,
  show_question,
  show_receive,
  show_skill_list,
  show_status,
  skill_index,
  skill,
  status_text,
  submitAnswer,
  setIsExit,
} = useGuessSkill(closeActivity, handleClose);

/** 技能索引格式化 */
const format_num = ["被动", "一", "二", "三", "四"];

const answerRef = ref<HTMLElement>();

/** 是否显示 */
const show = ref(true);
/** 是否显示按钮 */
const show_btn = ref(false);

/* 提交答案 */
const handleSubmitAnswer = () => {
  submitAnswer();
  nextTick(() => {
    //通过获取滚动高度，设置技能描述高度实现动画
    const height = answerRef.value!.scrollHeight;
    answerRef.value!.style.height = height + "px";
  });
};

/** @description 打字结束后触发 */
const typewriterCallback = () => {
  show_btn.value = true;
};

/** @description 关闭游戏 */
async function handleClose() {
  show.value = false;

  await _promiseTimeout(500);
  setHideSkillGuessPart(false);
  setHideActivityPart(false);
  modelValue.value = false;
}

/** @description 是否进入下一题 */
const handleNext = () => {
  if (useCloseToStore(closeActivity, handleClose)) return;
  if (!show_btn.value) return;
  show_btn.value = false;
  show_question.value = false;
  show_skill_list.value = [];

  setTimeout(() => {
    randomSkill();

    setTimeout(() => {
      setShowStatus(false);
    }, 250);
  }, 500);
};

/** @description 退出竞猜 */
const exitGuess = () => {
  if (guessing.value) {
    $message(MESSAGE_TIP.da62, "error");
    return;
  }

  setIsExit();

  //退出自动领取奖励
  if (show_receive.value) {
    receiveGuessCoin();
  }
  handleClose();
};
</script>

<template>
  <teleport to="body">
    <transition name="fade" appear>
      <div v-show="show" class="guess-game">
        <!-- 剩余道具 -->
        <div class="guess-prop">
          <KPropNum
            prop-key="GUESS_CARD"
            height="3rem"
            font-size="2rem"
            gap="1rem"
            margin-right="1.5rem"
            shine
          />
          <KPropNum prop-key="GUESS_COIN" height="3rem" font-size="2rem" gap="1rem" shine />
        </div>

        <!-- 出题区 -->
        <div class="guess-skill">
          <transition-group name="fade-a">
            <div
              v-for="(skill, index) in show_skill_list"
              :key="skill.name"
              class="skill"
              @click="selectSkillIndex(index)"
            >
              <div
                class="icon-box"
                :class="{
                  guessing: show_question,
                  effective: !right_skill_index_list.includes(index),
                }"
              >
                <transition name="fade">
                  <KLoadingIcon v-if="loading" key="a" white width="5rem" />
                </transition>
                <img
                  :src="_getMiscLink('unknown')"
                  class="unknown"
                  :class="{
                    disabled: right_skill_index_list.includes(index),
                    'move-bottom ': show_question,
                  }"
                  alt=""
                />
                <img v-if="show_question" :src="skill.img" alt="" class="icon" />
              </div>
            </div>
          </transition-group>
        </div>

        <!-- 答案区 -->
        <transition name="hide-answer">
          <div v-if="reveal" ref="answerRef" class="answer">
            <div class="hero-name">{{ hero_name }}</div>
            <div class="skill-name">{{ format_num[skill_index] }}技能——{{ skill?.name }}</div>
            <div class="desc" v-html="skill?.desc"></div>
          </div>
        </transition>

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
            @click="handleSubmitAnswer"
          >
            提交答案
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

        <transition name="to-top">
          <KButton v-if="!guessing" type="error" class="exit-guess" @click="exitGuess">
            退出竞猜
          </KButton>
        </transition>

        <!-- Tip -->
        <transition name="to-top" appear>
          <div class="tips">
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
