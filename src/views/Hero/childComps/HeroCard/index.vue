<template>
  <div
    class="HeroCard cursor-pointer"
    v-maskGradient
    v-sweepLight="false"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <div class="id">No.{{ data.id }}</div>
    <transition name="fade">
      <div class="select-mask" v-if="show">
        <img :src="data.headImg" class="head" />
        <h1
          class="view cursor-pointer"
          @click="viewClick"
          @mouseenter="lineActive = true"
          @mouseleave="lineActive = false"
          v-textHoverColor
        >
          查看详情
        </h1>
        <div class="line" :class="{ lineActive: lineActive }" ref="line"></div></div
    ></transition>

    <img
      class="bg"
      :src="data.cover"
      :style="{
        top: data.offset.top + '%',
        left: data.offset.left + '%',
        transform: data.offset.transform,
      }"
    />
    <div class="bottom">
      <div class="name" v-typewriter="data.name"></div>
      <div class="mark">{{ data.mark }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

defineProps({
  data: {
    type: Object,
    default() {
      return {};
    },
  },
});

const show = ref(false);
const lineActive = ref(false);

/* 查看详情 */
const emit = defineEmits(['view']);
const viewClick = () => {
  emit('view');
};
</script>
<style scoped lang="less">
.HeroCard {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.25);
  transition: all 0.35s cubic-bezier(0, 0.88, 0.52, 1.67);
  box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.75);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.75);
    .bottom {
      @keyframes springbackL {
        33% {
          transform: translateY(-10px);
        }
        75% {
          transform: translateY(5px);
        }
        0%,
        100% {
          transform: translateY(0px);
        }
      }
      .name {
        animation: springbackL 0.5s 0.1s;
      }
      .mark {
        animation: springbackL 0.5s 0.025s;
      }
    }
    .id {
      animation: springbackS 0.5s 0.025s;
      @keyframes springbackS {
        33% {
          transform: translateY(-5px);
        }
        75% {
          transform: translateY(5px);
        }
        0%,
        100% {
          transform: translateY(0px);
        }
      }
    }
  }
  .id {
    z-index: 1;
    font-size: 16px;
    color: var(--white);
    margin: 15px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  .select-mask {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
    z-index: 2;
    transition: all 0.5s;
    .head {
      border-radius: 50%;
      width: 50%;
      margin-bottom: 15px;
    }
    .view {
      color: var(--blue);
      transition: all 0.5s;
      animation: scale 0.25s 0.25s forwards;
      transform: scale(0);
      font-size: 30px;
      @keyframes scale {
        100% {
          transform: scale(1);
        }
      }
    }

    .line {
      width: 0%;
      height: 3px;
      transition: all 0.25s;
      background-color: var(--blue);
    }
    .lineActive {
      width: 7.5em !important;
    }
  }
  .bg {
    position: absolute;
    min-width: 100%;
    max-height: 100%;
    pointer-events: none;
  }
  .bottom {
    display: flex;
    z-index: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    pointer-events: none;
    .name {
      width: fit-content;
      color: var(--white);
      font-size: 34px;
      line-height: 1;
      margin-bottom: 5px;
    }
    .mark {
      color: var(--gray);
      font-size: 16px;
    }
  }
  @media screen and (max-width: 1655px) {
    .bottom {
      .name {
        font-size: 28px;
      }
    }
  }
  @media screen and (max-width: 1655px) {
    .bottom {
      .name {
        font-size: 24px;
      }
    }
  }
  @media screen and (max-width: 1129px) {
    .bottom {
      .name {
        font-size: 26px;
      }
    }
  }
  @media screen and (max-width: 1010px) {
    .bottom {
      .name {
        font-size: 24px;
      }
    }
  }
  @media screen and (max-width: 960px) {
    .bottom {
      .name {
        font-size: 28px;
      }
    }
  }
  @media screen and (max-width: 845px) {
    .bottom {
      .name {
        font-size: 22px;
      }
    }
  }
  @media screen and (max-width: 800px) {
    .id {
      font-size: 16px;
    }
    .bottom {
      .name {
        font-size: 50px;
      }
      .mark {
        color: var(--gray);
        font-size: 24px;
      }
    }
  }
  @media screen and (max-width: 765px) {
    .id {
      font-size: 16px;
    }
    .bottom {
      .name {
        font-size: 40px;
      }
      .mark {
        color: var(--gray);
        font-size: 20px;
      }
    }
  }
  @media screen and (max-width: 725px) {
    .bottom {
      .name {
        font-size: 30px;
      }
      .mark {
        color: var(--gray);
        font-size: 16px;
      }
    }
  }
  @media screen and (max-width: 680px) {
    .bottom {
      .name {
        font-size: 24px;
      }
      .mark {
        color: var(--gray);
        font-size: 14px;
      }
    }
  }
}
</style>
