<template>
  <div v-if="show" class="PhoneTip">
    <svg
      class="phone"
      t="1662996968845"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6434"
    >
      <path
        d="M734.608696 1024 289.391304 1024c-49.174261 0-89.043478-39.869217-89.043478-89.043478L200.347826 89.043478c0-49.174261 39.869217-89.043478 89.043478-89.043478l445.217391 0c49.174261 0 89.043478 39.869217 89.043478 89.043478l0 845.913043C823.652174 984.130783 783.782957 1024 734.608696 1024zM779.130435 89.043478c0-24.598261-19.923478-44.521739-44.521739-44.521739L289.391304 44.521739C264.793043 44.521739 244.869565 64.445217 244.869565 89.043478l0 22.26087 534.26087 0L779.130435 89.043478zM779.130435 155.826087 244.869565 155.826087l0 712.347826 534.26087 0L779.130435 155.826087zM779.130435 912.695652 244.869565 912.695652l0 22.26087c0 24.598261 19.923478 44.521739 44.521739 44.521739l445.217391 0c24.598261 0 44.521739-19.923478 44.521739-44.521739L779.130435 912.695652z"
        p-id="6435"
        fill="#ffffff"
      ></path>
    </svg>
    <div class="message">
      <span>虽然作者简单地对竖屏进行了适配</span>
      <span>但横屏(电脑)查看更佳</span>
      <span>下拉手机状态栏并设置自动旋屏</span>
      <span>部分软件内置的浏览器无法横屏</span>
      <span>点击软件右上角使用手机自带浏览器打开</span>
    </div>

    <K-Button type="error" @click="show = false">我想看看竖屏效果</K-Button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const show = ref(false);

const tip = () => {
  show.value = window.innerWidth < window.innerHeight;
};

onMounted(() => {
  tip();
  window.addEventListener("resize", () => {
    tip();
  });
});
</script>
<style scoped lang="less">
.PhoneTip {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 998;
  transform: scale(2);
  .phone {
    width: 200px;
    margin-bottom: 50px;
    animation: rotate 2s infinite ease-out;
    @keyframes rotate {
      50% {
        transform: rotate(-90deg);
      }
      75% {
        transform: rotate(-90deg);
      }
    }
  }
  .message {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 25px;
    span {
      margin-bottom: 0.5em;
    }
  }
}
</style>
