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
            sort_id: sort_id[index],
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
      <tr v-for="(item, index) in data" :style="{ backgroundColor: item.bgColor }" :key="index">
        <slot :data="item" name="body">
          <td v-for="(_item, _index) in Object.values(item)" :key="_index">
            {{ _item }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
import TableSort from "./childComps/table-sort/index.vue";
export default {
  props: {
    /* 表头名 */
    head: {
      type: Array,
      default() {
        return [];
      },
    },
    /* 表格数据 */
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    /* 规定哪些列进行排序，从0开始 */
    sort: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  name: "LibTable",
  data() {
    return {
      head_key: [],
      sort_id: [],
    };
  },
  created() {
    this.head_key = this.data.map((item, index) => {
      return Object.keys(item)[index];
    });
    this.sort_id = this.head.map(() => {
      return 0;
    });
  },
  methods: {
    sortChange({ key, index, sort_id, item }) {
      if (!this.sort.includes(item)) return;
      let status = sort_id;
      if (status === 2) {
        this.$set(this.sort_id, index, 0);
        status = -1;
      }
      status += 1;
      this.$set(this.sort_id, index, status);
      this.$emit("sort-change", [key, status]);
      this.sort_id = this.sort_id.map((item, i) => {
        return index === i ? item : 0;
      });
    },
  },
  components: { TableSort },
};
</script>
<style scoped lang="less">
.LibTable {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  thead {
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);
    th {
      .head {
        height: 50px;
        display: flex;
        align-items: center;
        color: var(--white);
      }
      &:first-child {
        padding-left: 35px;
      }
    }
  }
  th,
  td {
    text-align: left;
    padding: 5px;
    color: var(--gray);
    border-bottom: 1px solid var(--theme-color-two);
    word-break: break-all;
    font-size: 20px;
  }
  tr {
    &:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.01);
    }
  }
  @media screen and (max-width: 960px) {
    thead {
      th {
        .head {
          height: 35px;
        }
        &:first-child {
          padding-left: 25px;
        }
      }
    }
    th,
    td {
      font-size: 14px;
    }
  }
}

.cursor {
  cursor: pointer;
}
</style>
