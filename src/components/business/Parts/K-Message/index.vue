<template>
  <transition name="fade">
    <div class="K-Message" v-show="messages.length">
      <transition-group name="message">
        <div
          class="message"
          v-for="(item, index) in messages"
          :key="item.id"
          :style="{
            transform:
              'translateX(-50%) translateY(' +
              (index * 100 + index * 25) +
              '%)',
          }"
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
<script setup lang="ts">
interface Props {
  messages: MsgText[];
}

withDefaults(defineProps<Props>(), {
  messages: () => [],
});

const color: Record<string, string> = {
  info: "#84ade2",
  warning: "#e2c484",
  error: "#e28484",
};
const getImg = (src: string) =>
  `https://lengyibai.gitee.io/img-bed/wzry/image/msg_${src}.png`;

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
<style scoped lang="less">
@import url("./index.less");
</style>
