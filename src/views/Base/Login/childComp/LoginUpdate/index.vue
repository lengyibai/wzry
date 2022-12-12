<template>
  <transition name="default">
    <div class="login-update-dialog" v-show="modelValue">
      <div class="box">
        <div class="title">王者荣耀后台管理系统公告</div>
        <div class="content">
          <p class="dear">亲爱的用户：</p>
          <p style="text-indent: 2em">欢迎加入QQ群：1062077391</p>
        </div>
      </div>
      <div class="btns">
        <KButton class="btn" type="info" @click="$clickAudio('关闭'), close()">暂时跳过</KButton>
        <KButton type="warning" @click="$clickAudio('确定'), close()">此次不再弹出</KButton>
      </div>
      <div class="desc">
        <span>
          新版本已发布，请前往项目内拉取进行更新，或前往当前项目的
          <a href="https://github.com/lengyibai/wzry" target="_blank" class="link">Github仓库</a>
          了解更多！
        </span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import switchStore from "@/store/globalSwitch";
import KButton from "@/components/business/Parts/K-Button/index.vue"; //按钮

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

/* 播放点击关闭音效 */
const $clickAudio = (name: string) => {
  switchStore().$clickAudio(name);
};

/* 关闭弹窗 */
const close = () => {
  emit("update:modelValue", false);
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
