<script setup lang="ts">
import switchStore from "@/store/globalSwitch";

interface Props {
  modelValue: boolean;
}
interface Emits {
  (e: "update:modelValue", v: boolean): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: true,
});

const emit = defineEmits<Emits>();

/* 关闭弹窗 */
const handleClose = () => {
  emit("update:modelValue", false);
  switchStore().$clickAudio("关闭");
};
</script>

<template>
  <transition name="fade">
    <div class="notice" v-show="modelValue">
      <div class="box">
        <!-- 右上角关闭 -->
        <img
          class="close cursor-pointer"
          src="https://lengyibai.gitee.io/wzry-material/image/close.png"
          @click="handleClose"
        />
        <div class="title">王者荣耀后台管理系统公告</div>
        <div class="content">
          <p class="dear">亲爱的用户：</p>
          <p style="text-indent: 2em">欢迎加入QQ群：1062077391</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
