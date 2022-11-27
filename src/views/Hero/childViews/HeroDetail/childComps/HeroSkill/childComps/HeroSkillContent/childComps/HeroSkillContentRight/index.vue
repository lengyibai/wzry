<template>
  <div class="hero-skill-content-right">
    <table class="table">
      <tr>
        <td></td>
        <td class="lv" v-for="(item, index) in activeSkill.effect![0].phase.length" :key="index">LV{{ item }}</td>
      </tr>
      <tr v-for="(item, index) in activeSkill.effect" :key="index">
        <td class="effect">
          {{ item.type }}
        </td>
        <td class="num" v-for="(_item, index) in item.phase" :key="index">
          {{ _item }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
import { skillDefault } from "@/defaultValue/defaults";
interface Props {
  activeSkill: typeof skillDefault;
}
withDefaults(defineProps<Props>(), {
  activeSkill: () => skillDefault,
});
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
