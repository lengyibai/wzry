<script setup lang="ts">
import { ref, computed } from "vue";
import LoginBox from "./childComps/LoginBox/index.vue"; //登录盒子
import RegBox from "./childComps/RegBox/index.vue"; //注册盒子
import SelectInto from "./childComps/SelectInto/index.vue"; //选择进入方式

//注册及登录状态下要显示的输入框及按钮
const is_reg = ref("");

const component = computed(() => {
  return is_reg.value === "登录"
    ? LoginBox
    : is_reg.value === "注册"
    ? RegBox
    : SelectInto;
});

/* 进入方式 */
const EmitIntoType = (v: string) => {
  console.log(v);

  is_reg.value = v;
};

/* 切换为登录 */
const EmitToggleLog = () => {
  is_reg.value = "登录";
};
</script>

<template>
  <div class="login-box">
    <div
      class="back cursor-pointer lib-click"
      v-show="is_reg"
      @click="is_reg = ''"
    >
      <i class="iconfont wzry-fanhui"></i>
      <span>重新选择</span>
    </div>
    <div
      class="logo"
      v-particle="{ down: true, filter: false, color: '#f3dea4' }"
    >
      <img
        src="https://lengyibai.gitee.io/wzry-material/image/login_logo.png"
        alt="logo"
      />
    </div>
    <div class="title">
      {{ is_reg === "" ? "注册 | 登录" : "欢迎" + is_reg }}
    </div>
    <div class="select-into" v-if="!is_reg"></div>
    <component :is="component" @into="EmitIntoType" @success="EmitToggleLog" />
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
