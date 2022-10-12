<template>
  <div class="SelectHero">
    <FormSelect label="指派英雄" :data="hero_list" v-model="id" :value="hero_name" required @change="selectHero" id />
  </div>
</template>
<script setup>
import { ref, watch, toRefs } from 'vue';
import { getHeroList } from '@/api/main/hero/basis/index.js';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});
const { modelValue } = toRefs(props);

/* 选择的英雄id */
const hero_name = ref('');
const id = ref(0);
watch(modelValue, (v) => {
  id.value = v;
});

/* 英雄基础列表 */
const hero_list = ref([]);
getHeroList().then((res) => {
  hero_list.value = res.data;
  hero_name.value = hero_list.value.find((item) => item.id === modelValue.value)?.name;
});

/* 选择英雄后触发 */
const emit = defineEmits(['update:modelValue']);
const selectHero = (id) => {
  emit('update:modelValue', id);
};
</script>
