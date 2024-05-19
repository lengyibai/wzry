<script setup lang="ts">
import { useMessage } from "./hooks/useMessage";

import { _getImgLink } from "@/utils/concise";

const { messages } = useMessage();

/** 字体颜色 */
const color: Record<Global.Message.Status, string> = {
  info: "#84ade2",
  warning: "#e2c484",
  error: "#e28484",
};
const getImg = (src: string) => _getImgLink(`msg_${src}`);

/** 消息类型提醒左中右图标 */
const imgs: Record<Global.Message.Status, Record<"left" | "center" | "right", string>> = {
  info: {
    left: getImg("left_default"),
    center: getImg("center_default"),
    right: getImg("right_default"),
  },
  warning: {
    left: getImg("left_warning"),
    center: getImg("center_warning"),
    right: getImg("right_warning"),
  },
  error: {
    left: getImg("left_danger"),
    center: getImg("center_danger"),
    right: getImg("right_danger"),
  },
};
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-show="messages.length" class="k-message">
        <transition-group name="message">
          <div
            v-for="(item, index) in messages"
            :key="item.id"
            class="message"
            :class="item.type"
            :style="{
              transform: `translateX(-50%) translateY(${index * 100 + index * 25}%)`,
            }"
          >
            <span :style="{ color: color[item.type] }" v-html="item.text"></span>
            <div
              class="line"
              :style="{
                animationDuration: item.duration + 's',
              }"
            ></div>
            <div class="bg">
              <img :src="imgs[item.type].left" />
              <img :src="imgs[item.type].center" />
              <img :src="imgs[item.type].right" />
            </div>
          </div>
        </transition-group>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
