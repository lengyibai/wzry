<script setup lang="ts">
interface Props {
  messages: MsgText[]; //消息队列
}
defineProps<Props>();

//字体颜色
const color: Record<string, string> = {
  info: "#84ade2",
  warning: "#e2c484",
  error: "#e28484",
};
const getImg = (src: string) => `${IMGBED}/image/msg_${src}.png`;

//消息类型提醒左中右图标
const imgs: Record<string, Record<string, string>> = {
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
  <transition name="fade">
    <div v-show="messages.length" class="k-message">
      <transition-group name="message">
        <div
          v-for="(item, index) in messages"
          class="message"
          :class="item.type"
          :style="{
            transform: 'translateX(-50%) translateY(' + (index * 100 + index * 25) + '%)',
          }"
          :key="item.id"
        >
          <span :style="{ color: color[item.type] }" v-html="item.text"></span>
          <div class="bg">
            <img :src="imgs[item.type].left" />
            <img :src="imgs[item.type].center" />
            <img :src="imgs[item.type].right" />
          </div>
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
