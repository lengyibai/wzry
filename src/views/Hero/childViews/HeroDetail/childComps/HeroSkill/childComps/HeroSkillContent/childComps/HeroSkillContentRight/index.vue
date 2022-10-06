<template>
  <div class="HeroSkillContentRight">
    <table class="table">
      <tr>
        <td></td>
        <td class="lv" v-for="(item, index) in activeSkill.effect[0].phase.length" :key="index">LV{{ item }}</td>
      </tr>
      <tr v-for="(item, index) in activeSkill.effect" :key="index">
        <td class="effect">
          {{ item.type }}
        </td>
        <td class="num" v-for="(item, index) in item.phase" :key="index">
          {{ item }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup>
defineProps({
  activeSkill: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>
<style scoped lang="less">
.HeroSkillContentRight {
  width: 45%;
  display: flex;
  justify-content: flex-end;
  .table {
    width: 100%;
    border-collapse: collapse;
    height: fit-content;
    .lv {
      position: relative;
      font-size: 26px;
      text-shadow: var(--t-shadow);
      font-weight: bold;
    }
    .effect {
      font-size: 30px;
      text-shadow: var(--t-shadow);
      font-weight: bold;
    }
    .num {
      font-size: 26px;
      text-shadow: var(--t-shadow);
    }
    td {
      word-break: break-all;
      text-align: center;
      padding: 20px 5px;
    }
  }
}
</style>
