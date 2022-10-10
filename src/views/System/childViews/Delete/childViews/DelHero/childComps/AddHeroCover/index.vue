<template>
  <div class="delHeroCover">
    <span class="text-gradient-one">英雄封面：</span>

    <!--选择封面-->
    <delHeroCoverImg :p="p" />

    <!--偏移量-->
    <delHeroCoverOffset @direction="direction" />

    <!--缩放量-->
    <delHeroCoverScale @scale="scale" />
  </div>
</template>
<script setup>
//#####··········子组件··········#####//
import { inject, reactive, ref } from 'vue';
import switchStore from '@/store/globalSwitch.js';
import delHeroCoverImg from './childComps/delHeroCoverImg/index.vue';
import delHeroCoverOffset from './childComps/delHeroCoverOffset/index.vue'; //调整偏移量
import delHeroCoverScale from './childComps/delHeroCoverScale/index.vue';
//调整缩放量

const size = ref(1); //缩放量
const p = reactive({
  top: 0,
  left: 0,
  transform: 'scale(1)',
});

const hero_data = inject('hero_data', {});
const setKeyV = inject('setKeyV', '');

const emit = () => {
  setKeyV('offset', p);
};

/* 设置偏移量 */
const $store = switchStore();
const direction = (d) => {
  if (!hero_data.cover) {
    $store.$tip('请选择图片后再试', 'error');
    return;
  }
  if (d === 'left') {
    p.left -= 1;
  } else if (d === 'right') {
    p.left += 1;
  } else if (d === 'top') {
    p.top -= 1;
  } else if (d === 'bottom') {
    p.top += 1;
  }
  emit();
};

/* 设置缩放 */
const scale = (s) => {
  if (!hero_data.cover) {
    $store.$tip('请选择图片后再试', 'error');
    return;
  }
  if (s === 'left') {
    p.transform = `scale(${(size.value += 0.1).toFixed(1)})`;
  } else if (s === 'right') {
    p.transform = `scale(${(size.value -= 0.1).toFixed(1)})`;
  }
  emit();
};
</script>
<style scoped lang="less">
.delHeroCover {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 35px;
  width: 100%;
  span {
    font-size: 30px;
  }
}
</style>
