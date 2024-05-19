<script setup lang="ts">
import { vBlurLoad, vMaskGradient, vMouseTip } from "@/directives";
import { KButton } from "@/components/business";

interface Props {
  /** 皮肤数据 */
  data: Game.Hero.Skin;
}

defineProps<Props>();
const $emit = defineEmits<{
  exchange: [e: Event, v: Game.Hero.Skin];
}>();

/** @description 兑换
 * @param e 事件对象
 * @param data 皮肤数据
 */
const handleExchange = (e: Event, data: Game.Hero.Skin) => {
  $emit("exchange", e, data);
};
</script>

<template>
  <div v-mask-gradient class="skin-card">
    <img
      v-blur-load="{
        img: data.cover,
      }"
      class="bg"
      :src="data.posterBlur"
    />
    <img v-if="data.link" class="type" :src="data.link" />

    <!-- 名字、代号 -->
    <div class="bottom">
      <div class="name" v-html="data.name"></div>
      <div class="mark" v-html="`——${data.heroName}`"></div>
    </div>

    <div class="tool">
      <KButton v-mouse-tip type="warning" class="k-button" @click="handleExchange($event, data)">
        点击兑换
      </KButton>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
