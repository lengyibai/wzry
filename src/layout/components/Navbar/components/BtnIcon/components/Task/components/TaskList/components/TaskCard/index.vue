<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, inject } from "vue";

import type { TaskType } from "@/config/interface";
import { TaskStore } from "@/store";
import { _getMiniHeroLink } from "@/utils/concise";
import { KHelp, KHoverDesc, KProp } from "@/components/business";
import { _accumulate, _decimal } from "@/utils/tool";
import { vMouseTip } from "@/directives";

interface Props {
  /** 任务信息 */
  data: TaskType;
  /** 任务封面索引 */
  index: number;
}
const $props = defineProps<Props>();

const $router = useRouter();

const $taskStore = TaskStore();

/** 关闭任务页 */
const closeTask = inject("close-task", () => {});

//解除响应式
const i = $props.index;

/** 计算百分比 */
const percent = computed(() => {
  //使用 reduce 计算 total 和 value 的总和
  const total_sum = _accumulate($props.data.schedule, "total");
  const value_sum = _accumulate($props.data.schedule, "value");

  //计算百分比
  return value_sum === 0 ? 0 : _decimal([value_sum, total_sum, 100], ["/", "*"], 0);
});

/* 点击任务按钮 */
const handleClickTask = (data: TaskType) => {
  if (data.schedule.every((item) => item.value >= item.total)) {
    $taskStore.receiveTaskReward(data.id);
  } else {
    closeTask();
    $router.push(data.path!);
  }
};
</script>

<template>
  <div
    class="task-card"
    :class="{
      active: !data.receive && percent >= 100,
    }"
  >
    <!-- 左边 -->
    <div class="left">
      <div
        class="icon"
        :style="{
          animationDelay: `-${i * 0.37}s`,
          backgroundImage: `url(${_getMiniHeroLink('mini_hero_' + i)})`,
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
        <KProp
          v-for="(item, index) in data.props"
          :key="index"
          :prop-key="item.key"
          :num="item.num"
        />
      </div>

      <div class="schedule-status">
        <!-- 按钮 -->
        <div v-if="data.receive" class="received">
          <i class="iconfont wzry-finish" />
          <span>已领取</span>
        </div>

        <div v-else class="schedule-btn">
          <div class="schedule-box">
            <div class="label">进度：</div>
            <div class="content">
              <div class="percentage">
                <span class="value">{{ percent }}</span>
                <span>%</span>
              </div>

              <!-- 进度详情 -->
              <KHoverDesc>
                <template #btn>
                  <KHelp top="-0.2rem" size="1.25rem" margin-left="1rem">!</KHelp>
                </template>

                <template #tip>
                  <div class="schedule-list">
                    <div v-for="(item, index) in data.schedule" :key="index" class="box">
                      <span>{{ item.label }}{{ item.unit }}：</span>
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
            v-if="data.path || percent >= 100"
            v-mouse-tip
            :class="{
              receive: percent >= 100,
            }"
            class="btn"
            @click="handleClickTask(data)"
          >
            {{ percent < 100 ? "前往" : "领取" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
