<template>
  <div class="EquipDetail" :style="{ opacity: show ? 1 : 0 }">
    <div class="name">{{ equip.name }}</div>
    <div class="info">
      <div class="effect" :class="abbreviations[item.name]" v-for="(item, index) in equip.info" :key="index">
        +{{ item.num }}{{ item.unit }} {{ item.name }}
      </div>
    </div>
    <div class="details" v-if="equip?.name">
      <div class="motivation" v-for="(item, index) in equip.details" :key="index">
        <div class="title">{{ item.type }}-{{ item.name }}</div>
        <div class="desc">{{ item.desc }}</div>
        <div class="time lq" v-if="item.time">{{ item.time }}秒</div>
        <div class="note">{{ item.note }}</div>
      </div>
    </div>
    <div class="note" v-if="equip?.name">{{ equip.note }}</div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import equipStore from '@/store/equip.js';

const $store = equipStore();
const abbreviations = {
  最大生命: 'zdsm',
  每5秒回血: 'hx',
  移速: 'ys',
  攻击速度: 'gjsd',
  冷却缩减: 'lqsj',
  物理吸血: 'wlxx',
  物理攻击: 'wlgj',
  暴击率: 'bjl',
  物理防御: 'wlfy',
  法术吸血: 'fsxx',
  最大法力: 'zdfl',
  每5秒回蓝: 'hl',
  法术防御: 'fsfy',
  法术攻击: 'fsgj',
};
const equip = ref({});
const show = ref(false);

watch(
  () => $store.active_id,
  (v) => {
    show.value = false;
    setTimeout(() => {
      if (v === 0) {
        equip.value = {};
      } else {
        equip.value = $store.equip_list.find((item) => {
          return item.id === v;
        });
      }
      show.value = true;
    }, 250);
  },
);
</script>
<style scoped lang="less">
.EquipDetail {
  width: 20%;
  min-width: 250px;
  height: 100%;
  padding: 0 35px;
  overflow: auto;
  transition: all 0.25s;
  .name {
    color: var(--theme-color-nine);
    font-size: 26px;
    margin-bottom: 1em;
  }
  .info {
    margin-bottom: 20px;
  }
  .details {
    .motivation {
      margin-bottom: 25px;
      .title {
        color: var(--white);
        font-family: var(--font-f);
      }
      .desc,
      .time {
        color: var(--theme-color-five);
        font-family: var(--font-f);
      }
    }
  }
  .note {
    color: rgba(255, 255, 255, 0.25);
    font-family: var(--font-f);
  }
}
.common,
.zdsm,
.hx,
.ys,
.gjsd,
.lqsj,
.wlxx,
.wlgj,
.bjl,
.wlfy,
.fsxx,
.zdfl,
.hl,
.fsfy,
.fsgj,
.lq {
  @size: 16px;
  height: @size;
  background-repeat: no-repeat;
  background-size: contain;
  padding-left: 22px;
  font-size: 16px;
  font-family: '微软雅黑';
  color: var(--theme-color-nine);
  margin-bottom: 5px;
  line-height: 1;
}
.zdsm {
  background-image: url('./img/最大生命.png');
}
.hx {
  background-image: url('./img/每5秒回血.png');
}
.ys {
  background-image: url('./img/移速.png');
}
.gjsd {
  background-image: url('./img/攻击速度.png');
}
.lqsj {
  background-image: url('./img/冷却缩减.png');
}
.wlxx {
  background-image: url('./img/物理吸血.png');
}
.wlgj {
  background-image: url('./img/物理攻击.png');
}
.bjl {
  background-image: url('./img/暴击率.png');
}
.wlfy {
  background-image: url('./img/物理防御.png');
}
.fsxx {
  background-image: url('./img/法术吸血.png');
}
.zdfl {
  background-image: url('./img/最大法力.png');
}
.hl {
  background-image: url('./img/每5秒回蓝.png');
}
.fsfy {
  background-image: url('./img/法术防御.png');
}
.fsgj {
  background-image: url('./img/法术攻击.png');
}
.lq {
  background-image: url('./img/冷却时间.png');
}
</style>
