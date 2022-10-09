<template>
  <div class="K-SkillTypeTag">
    <div class="skill-type" :class="name">{{type}}</div>
  </div>
</template>
<script setup>
import { $pinyin } from '@/utils/index.js';

const props = defineProps({
  type: {
    type: String,
    default: '真实',
    validator: (value) => {
      return ['真实', '物理', '法术', '控制'].includes(value);
    },
  },
});

const name = $pinyin(props.type)[2];
</script>
<style scoped lang="less">
.K-SkillTypeTag {
  display: flex;
  .skill-type {
    width: 4.75em;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 20px;
    border-radius: 5px;
    padding: 0 25px;
    margin-right: 5px;
    box-shadow: var(--b-shadow);
  }
  .zs {
    color: #e5b14b;
    background-color: #8a7138;
  }
  .wl {
    color: #e08b88;
    background-color: #762728;
  }
  .fs {
    color: #8b8ef7;
    background-color: #4c4c96;
  }
  .kz {
    color: #6cd9b0;
    border: 1px solid #6cd9b0;
    background-color: #114433;
  }
}
</style>
