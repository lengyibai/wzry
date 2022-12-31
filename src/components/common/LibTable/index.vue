<template>
  <table class="LibTable">
    <thead>
      <th
        v-for="(item, index) in head"
        :key="index"
        :class="{ cursor: sort.includes(item) }"
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
          <TableSort :isShow="sort_id[index]" v-if="sort.includes(item)" />
        </div>
      </th>
    </thead>

    <tbody>
      <tr
        v-for="(item, index) in data"
        :style="{ backgroundColor: item.bgColor }"
        :key="index"
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
<script setup lang="ts">
import { ref } from "vue";
import TableSort from "./childComps/table-sort/index.vue";
interface Props {
  head: string[]; //表头名
  data: any[]; //表格数据
  sort: string[]; //规定哪些列进行排序，从0开始
}
const props = withDefaults(defineProps<Props>(), {
  head: () => [],
  data: () => [],
  sort: () => [],
});

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
        height: 50px;
        display: flex;
        align-items: center;
        color: #fff;
      }
    }
  }

  th,
  tr {
    text-align: left;
    color: #fff;
    word-break: break-all;
    font-size: 24px;
    padding: 0.5em 1em;
  }

  tr {
    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
}

.cursor {
  cursor: pointer;
}
</style>
