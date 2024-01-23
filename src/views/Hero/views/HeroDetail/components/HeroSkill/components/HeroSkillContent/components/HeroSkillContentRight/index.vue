<script setup lang="ts">
interface Props {
  /** 选中的技能 */
  activeSkill: Remote.Skill.Info;
}

defineProps<Props>();
</script>

<template>
  <div class="hero-skill-content-right">
    <table class="table">
      <tr>
        <td></td>
        <td v-for="(item, index) in activeSkill.effect![0].phase.length" :key="index" class="lv">
          LV{{ item }}
        </td>
      </tr>
      <tr v-for="(item, index) in activeSkill.effect" :key="index">
        <td class="effect">
          {{ item.name }}
        </td>
        <td v-for="(_item, index) in item.phase" :key="index" class="num">
          {{ _item }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
