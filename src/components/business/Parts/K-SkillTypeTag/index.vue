<template>
  <div class="K-SkillTypeTag">
    <div class="skill-type skill-type-zs flex" v-if="type === '真实'">真实</div>
    <div class="skill-type skill-type-wl flex" v-else-if="type === '物理'">物理</div>
    <div class="skill-type skill-type-fs flex" v-else-if="type === '法术'">法术</div>
    <div class="skill-type skill-type-kz flex" v-else-if="type === '控制'">控制</div>
  </div>
</template>
<script setup>
defineProps({
  type: {
    type: String,
    default: '真实',
    validator: (value) => {
      return ['真实', '物理', '法术', '控制'].includes(value);
    },
  },
});
</script>
<style scoped lang="less">
.K-SkillTypeTag {
  display: flex;
  .skill-type {
    height: 35px;
    font-size: 20px;
    border-radius: 5px;
    padding: 0 25px;
    margin-right: 5px;
    box-shadow: var(--b-shadow);
  }
  .skill-type-zs {
    color: #e5b14b;
    background-color: #8a7138;
  }
  .skill-type-wl {
    color: #e08b88;
    background-color: #762728;
  }
  .skill-type-fs {
    color: #8b8ef7;
    background-color: #4c4c96;
  }
  .skill-type-kz {
    color: #6cd9b0;
    border: 1px solid #6cd9b0;
    background-color: #114433;
  }
}
</style>
