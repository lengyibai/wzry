<script setup lang="ts">
import { GAME_PROP } from "@/config";
import { TaskType } from "@/config/interface";
import { _getImgLink } from "@/utils/concise";

interface Props {
  /** 任务信息 */
  data: TaskType;
  /** 任务封面索引 */
  index: number;
}
defineProps<Props>();

/* 点击任务按钮 */
const handleClickTask = (id: string) => {};
</script>

<template>
  <div class="task-card">
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
    <div class="right">
      <div class="props">
        <div v-for="(item, index) in data.props" :key="index" class="prop">
          <img :src="_getImgLink(GAME_PROP[item.type].iconName)" alt="" class="icon" />
          <div class="num" :data-text="item.num">{{ item.num }}</div>
        </div>
      </div>
      <div v-if="!data.receive" class="btn-box">
        <div class="schedule">
          <span>完成进度：</span>
          <span class="index">{{ data.schedule }}</span>
          <span>/{{ data.total }}</span>
        </div>
        <div
          class="btn"
          :class="{
            receive: data.total < data.total,
          }"
          @click="handleClickTask(data.id)"
        >
          {{ data.schedule < data.total ? "前往" : "领取" }}
        </div>
      </div>
      <div v-else class="finish-status">
        <i class="iconfont wzry-finish"></i>
        <span>已领取</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
