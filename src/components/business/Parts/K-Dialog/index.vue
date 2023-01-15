<template>
  <LibMask>
    <transition name="confirm">
      <div
        class="k-dialog"
        :style="{ width: width, height: 'calc(' + width + ' * 0.5989)' }"
        v-show="show"
      >
        <div class="title">{{ title }}</div>
        <img
          class="close cursor-pointer"
          v-show="showClose"
          :src="IMGBED + '/image/close.png'"
          @dragstart.prevent
          @click="handleClose"
        />
        <img class="bg" :src="IMGBED + '/image/dialog.png'" />
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </LibMask>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import switchStore from "@/store/globalSwitch";

interface Props {
  modelValue: boolean; //是否显示
  showClose?: boolean; //是否显示右上角关闭按钮
  title?: string; //左上角描述文字
  width?: string; //弹窗宽度
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
  (e: "close"): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: true,
  showClose: true,
  title: "",
  width: "720px",
});
const emit = defineEmits<Emits>();

const $switchStore = switchStore();

const IMGBED = window.IMGBED; //全局图床链接

const show = ref(false); //是否显示弹窗

onMounted(() => {
  show.value = true;
});

/* 关闭 */
const handleClose = () => {
  $switchStore.$clickAudio("关闭");
  emit("update:modelValue", false);
  emit("close");
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
