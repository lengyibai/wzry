<script setup lang="ts">
import { ref } from "vue";

import { AudioStore } from "@/store";
import { KDialog } from "@/components/business";
import { API_DATA } from "@/api";

const $audioStore = AudioStore();

const todo = ref<Global.Todo>({
  surface: [],
  substrate: [],
});

API_DATA.Todo().then((res) => {
  todo.value = res.data;
});

$audioStore.play("kj62");
</script>

<template>
  <KDialog :audio="false" v-bind="$attrs" width="56.25rem" header="网站计划清单" up>
    <div class="todo">
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
  </KDialog>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
