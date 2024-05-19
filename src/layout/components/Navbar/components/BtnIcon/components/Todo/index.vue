<script setup lang="ts">
import { ref } from "vue";

import { KDialog } from "@/components/business";
import { API_DATA } from "@/api";
import { vScrollVirtualization } from "@/directives";
import { _retryRequest } from "@/utils/tool";
import { $message } from "@/utils/busTransfer";
import { $msgTipText } from "@/config";

const loading = ref(true);
const todo = ref<Global.Todo>({
  surface: [],
  substrate: [],
});

_retryRequest({
  promiseFn: API_DATA.Todo,
})
  .then((res) => {
    todo.value = res.data;
  })
  .catch(() => {
    $message($msgTipText("rc53", { v: "网站计划清单" }), "error");
  })
  .finally(() => {
    loading.value = false;
  });
</script>

<template>
  <KDialog
    :loading="loading"
    v-bind="$attrs"
    width="57.5rem"
    header="网站计划清单"
    up
    @close="loading = true"
  >
    <div class="todo-dialog">
      <div v-scroll-virtualization class="todo">
        <div class="content">
          <h1>页面层</h1>
          <template v-if="todo.surface.length">
            <div v-for="(item, index) in todo.surface" :key="index">
              <h2>{{ item.label }}</h2>
              <div v-for="(todo, index) in item.value" :key="index" class="todo">
                <h3>{{ index + 1 }}、{{ todo.title }}</h3>
                <p v-for="(item, index) in todo.todo" :key="index">-{{ item }}</p>
              </div>
            </div>
          </template>
          <p v-else>暂无</p>

          <h1>代码层</h1>
          <template v-if="todo.substrate.length">
            <p v-for="(item, index) in todo.substrate" :key="index">-{{ item }}</p>
          </template>
          <p v-else>暂无更多</p>
        </div>
      </div>
    </div>
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
