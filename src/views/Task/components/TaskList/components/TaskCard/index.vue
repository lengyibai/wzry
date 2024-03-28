<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";

import { GAME_PROP } from "@/config";
import { TaskType } from "@/config/interface";
import { TaskStore } from "@/store";
import { _getImgLink } from "@/utils/concise";
import { KHelp, KHoverDesc } from "@/components/business";
import { vMouseTip } from "@/directives";

interface Props {
  /** 任务信息 */
  data: TaskType;
  /** 任务封面索引 */
  index: number;
}
defineProps<Props>();

const $router = useRouter();

const $taskStore = TaskStore();

/** 计算百分比 */
const percent = computed(() => {
  return (data: TaskType) => {
    // 使用 reduce 计算 total 和 value 的总和
    const totalSum = data.schedule.reduce((acc, item) => acc + item.total, 0);
    const valueSum = data.schedule.reduce((acc, item) => acc + item.value, 0);

    // 计算百分比
    return valueSum === 0 ? "0" : `${(valueSum / totalSum) * 100}`;
  };
});

/* 点击任务按钮 */
const handleClickTask = (data: TaskType) => {
  if (data.schedule.every((item) => item.value >= item.total)) {
    $taskStore.receiveTaskReward(data.id);
  } else {
    $router.push(data.path!);
  }
};
</script>

<template>
  <div class="task-card">
    <!-- 左边 -->
    <div class="left">
      <div
        class="icon"
        :style="{
          backgroundImage: `url(${_getImgLink('task_' + index)})`,
        }"
      ></div>
      <div class="info">
        <div class="title">{{ data.label }}</div>
        <div class="desc">{{ data.desc }}</div>
      </div>
    </div>

    <!-- 右边 -->
    <div class="right">
      <!-- 奖励列表 -->
      <div class="props">
        <div v-for="(item, index) in data.props" :key="index" class="prop">
          <img :src="_getImgLink(GAME_PROP[item.type].iconName)" alt="" class="icon" />
          <div class="num" :data-text="item.num">{{ item.num }}</div>
        </div>
      </div>

      <!-- 按钮 -->
      <div v-if="!data.receive" class="schedule-btn">
        <div class="schedule-box">
          <div class="label">进度：</div>
          <div class="content">
            <div class="percentage">
              <span class="value">{{ percent(data) }}</span>
              <span>%</span>
            </div>

            <!-- 进度详情 -->
            <KHoverDesc>
              <template #btn>
                <KHelp v-mouse-tip top="-0.2rem" size="1.25rem" margin-left="1rem">!</KHelp>
              </template>

              <template #tip>
                <div class="schedule-list">
                  <div v-for="(item, index) in data.schedule" :key="index" class="box">
                    <span>{{ item.label }}：</span>
                    <span class="index">{{ item.value }}</span>
                    <span>/{{ item.total }}</span>
                  </div>
                </div>
              </template>
            </KHoverDesc>
          </div>
        </div>

        <!-- 前往及领取按钮 -->
        <div
          v-if="data.path"
          class="btn"
          :class="{
            receive: data.schedule.every((item) => item.value >= item.total),
          }"
          @click="handleClickTask(data)"
        >
          {{ data.schedule.every((item) => item.value < item.total) ? "前往" : "领取" }}
        </div>
      </div>
      <div v-else class="finish-status">
        <i class="iconfont wzry-finish" />
        <span>已领取</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
