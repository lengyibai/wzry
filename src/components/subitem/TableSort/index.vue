<script setup lang="ts">
interface Props {
  status: number;
}

defineProps<Props>();
</script>

<template>
  <div class="TableSort">
    <svg
      t="1649070813166"
      :class="{ active: status === 1 }"
      viewBox="0 0 1085 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2192"
    >
      <path
        d="M545.20232799 240.601164L1087.99999999 783.398836l-1085.595343 0z"
        p-id="2193"
        fill="currentColor"
      ></path>
    </svg>
    <svg
      t="1649070986670"
      :class="{ active: status === 2 }"
      viewBox="0 0 1085 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2438"
    >
      <path d="M542.797672 783.398836L0 240.601164h1085.595343z" p-id="2439" fill="currentColor"></path>
    </svg>
  </div>
</template>

<style scoped lang="less">
.TableSort {
  display: flex;
  flex-direction: column;
  margin-left: 0.625rem;
  width: 0.625rem;
  color: #c0c4cc;
  cursor: pointer;
}

.active {
  color: #409eff;
}
</style>
