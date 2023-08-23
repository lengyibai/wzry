<template>
  <table class="LibTable">
    <thead>
      <th
        v-for="(item, index) in head"
        :key="index"
        :class="{ 'cursor-pointer': sort.includes(item) }"
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
          <TableSort v-if="sort.includes(item)" :is-show="sort_id[index]" />
        </div>
      </th>
    </thead>

    <tbody>
      <tr v-for="(item, index) in data" :key="index" :style="{ backgroundColor: item.bgColor }">
        <slot :data="item" name="body">
          <td v-for="(_item, _index) in Object.values(item)" :key="_index">
            {{ _item }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { ref } from "vue";

import TableSort from "./childComps/table-sort/index.vue";
interface Props {
  head: string[]; //表头名
  data: any[]; //表格数据
  sort: string[]; //规定哪些列进行排序，从0开始
}
const props = defineProps<Props>();

const head_key = ref<any[]>([]);
const sort_id = ref<any[]>([]);

head_key.value = props.data.map((item, index) => {
  return Object.keys(item)[index];
});

sort_id.value = props.head.map(() => {
  return 0;
});

interface Emits {
  (e: "sort-change", v: [any, any]): void;
}
const emit = defineEmits<Emits>();
const sortChange = ({ key, index, id, item }: any) => {
  if (!props.sort.includes(item)) return;
  let status = id;
  if (status === 2) {
    sort_id.value[index] = 0;
    status = -1;
  }
  status += 1;
  sort_id.value[index] = status;
  emit("sort-change", [key, status]);
  sort_id.value = sort_id.value.map((item: any, i: any) => {
    return index === i ? item : 0;
  });
};
</script>
<style scoped lang="less">
.LibTable {
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);

    th {
      .head {
        display: flex;
        align-items: center;
        height: 3.125rem;
        border: var(--subline);
        color: #fff;
      }
    }
  }

  th,
  tr {
    padding: 0.5em 1em;
    color: #fff;
    text-align: left;
    word-break: break-all;
    font-size: 1.5rem;

    :deep(td) {
      border-right: var(--subline) !important;
    }
  }

  tr {
    &:nth-child(even) {
      background-color: rgb(255 255 255 / 5%);
    }
  }
}
</style>
