<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";

import TableSort from "@/components/subitem/TableSort/index.vue";

interface Props {
  /** 表头名 */
  head: string[];
  /** 表格数据 */
  data: T[];
  /** 规定哪些列进行排序，从0开始 */
  sort: string[];
}

const $props = defineProps<Props>();
const $emit = defineEmits<{
  "sort-change": [v: [string, number]];
}>();

const head_key = ref<string[]>([]);
const sort_id = ref<number[]>([]);

head_key.value = $props.data.map((item, index) => {
  return Object.keys(item)[index];
});

sort_id.value = $props.head.map(() => {
  return 0;
});

const sortChange = ({
  key,
  index,
  id,
  item,
}: {
  key: string;
  index: number;
  id: number;
  item: string;
}) => {
  if (!$props.sort.includes(item)) return;
  let status = id;
  if (status === 2) {
    sort_id.value[index] = 0;
    status = -1;
  }
  status += 1;
  sort_id.value[index] = status;

  $emit("sort-change", [key, status]);
  sort_id.value = sort_id.value.map((item, i) => {
    return index === i ? item : 0;
  });
};
</script>

<template>
  <table class="lib-table">
    <thead>
      <th
        v-for="(item, index) in head"
        :key="index"
        :class="{ 'global_cursor-pointer': sort.includes(item) }"
        @click="
          sortChange({
            key: head_key[index],
            item,
            index,
            id: sort_id[index],
          })
        "
      >
        <div class="head">
          <slot :data="head" :name="head_key[index]">{{ item }}</slot>
          <TableSort v-if="sort.includes(item)" :status="sort_id[index]" />
        </div>
      </th>
    </thead>

    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="index"
        :style="{ backgroundColor: item.bgColor }"
      >
        <slot :data="item" name="body">
          <td v-for="(_item, _index) in Object.values(item)" :key="_index">
            {{ _item }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
