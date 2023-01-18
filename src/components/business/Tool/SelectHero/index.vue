<template>
  <div class="SelectHero">
    <FormSelect
      id
      v-model="id"
      label="指派英雄"
      :data="hero_list"
      :value="hero_name"
      :disabled="disabled"
      required
      @update:model-value="selectHero"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";

import { getHeroBasic } from "@/api/main/games/hero";

interface Props {
  modelValue: number; //英雄id
  disabled?: boolean; //是否禁用
}
interface Emits {
  (e: "update:modelValue", v: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  disabled: false,
});

const emit = defineEmits<Emits>();

const hero_name = ref(""); //英雄名称
const id = ref(0); //英雄id

watch(
  () => props.modelValue,
  (v) => {
    id.value = v;
  }
);

/* 获取英雄基础列表 */
const hero_list = ref<Hero.General[]>([]);
getHeroBasic().then((res) => {
  hero_list.value = res;
  hero_name.value =
    hero_list.value.find((item) => item.id === props.modelValue)?.name || "";
});

/* 选择英雄后触发 */
const selectHero = (id: string | number | any[]) => {
  emit("update:modelValue", id as number);
};
</script>
