<template>
  <transition name="mask-close">
    <div v-show="show" class="mask-close">
      <transition name="mask-move">
        <div v-show="show" class="close" @click="close">
          <img src="./img/close.svg" alt="" @dragstart.prevent />
        </div>
      </transition>
    </div>
  </transition>
</template>
<script setup>
import { onMounted, ref } from "vue";

const show = ref(false);
const event = ref(null);

const $throttle = () => {
  if (event.value.clientY <= 100) {
    show.value = true;
  } else {
    show.value = false;
  }
};

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

onMounted(() => {
  window.addEventListener("mousemove", (e) => {
    event.value = e;
    $throttle();
  });
});
</script>
<style scoped lang="less">
.mask-close {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-image: linear-gradient(0deg, transparent 0%, var(--black-50) 100%);

  .close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: var(--white);
    font-size: 25px;
    background-color: rgb(0 0 0 / 65%);
    cursor: pointer;

    img {
      width: 50%;
      height: 50%;
    }
  }
}

/* 进入前状态 */
.mask-close-enter-from,
.mask-close-leave-active {
  opacity: 0;
}

/* 进入和离开动画属性 */
.mask-close-leave-active,
.mask-close-enter-active {
  transition: all var(--time-250);
}

/* 进入前状态 */
.mask-move-enter-from,
.mask-move-leave-active {
  transform: translateY(-100%);
}

/* 进入和离开动画属性 */
.mask-move-leave-active,
.mask-move-enter-active {
  transition: all var(--time-250);
}
</style>
