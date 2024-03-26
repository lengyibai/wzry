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
      <div class="btn-box">
        <div v-if="data.total" class="schedule">
          <span>完成进度：</span>
          <span class="index">{{ data.schedule }}</span>
          <span>/{{ data.total }}</span>
        </div>
        <div class="btn">前往</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
