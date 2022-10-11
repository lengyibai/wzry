<template>
  <div class="K-SkillTypeTag">
    <div class="skill-type" :class="name">{{ type }}</div>
  </div>
</template>
<script setup>
import { $pinyin } from '@/utils/index.js';

const props = defineProps({
  type: {
    type: String,
    default: '金币',
  },
});

const name = $pinyin(props.type)[2];
</script>
<style scoped lang="less">
.K-SkillTypeTag {
  display: flex;
  .skill-type {
    width: fit-content;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 20px;
    padding: 0 0.75em;
    margin-right: 10px;
    box-shadow: var(--b-shadow);
  }
  .kz,
  .js {
    color: #2dc4fb;
    border: 2px solid rgba(45, 196, 251, 0.25);
    background-color: rgba(45, 196, 251, 0.25);
  }
  .jb,
  .fh,
  .wz,
  .sy {
    color: #e5b14b;
    background-color: rgba(229, 178, 75, 0.25);
    border: 2px solid rgba(229, 178, 75, 0.25);
  }
  .sh {
    color: #e65ff7;
    background-color: rgba(229, 95, 247, 0.25);
    border: 2px solid rgba(229, 95, 247, 0.25);
  }
  .qh,
  .hd,
  .lq,
  .hf {
    color: #69c570;
    background-color: rgba(105, 197, 113, 0.25);
    border: 2px solid rgba(105, 197, 113, 0.25);
  }
}
</style>
