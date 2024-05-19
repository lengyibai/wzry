<script setup lang="ts">
import { inject, onMounted, ref } from "vue";

import { bigYiBaoEyes, bigYiBaoIris } from "../../helper/yiBaoBig";
import { smallYiBaoEyes, smallYiBaoIris } from "../../helper/yiBaoSmall";

/** 乂宝大小类型 */
const yibao_type = inject<"small" | "big">("yibao-type");

const eyeRefs = ref<HTMLElement[]>();
const irisRefs = ref<HTMLElement[]>();

onMounted(() => {
  const left_eye = eyeRefs.value![0];
  const right_eye = eyeRefs.value![1];
  const left_iris = irisRefs.value![0];
  const right_iris = irisRefs.value![1];

  if (yibao_type === "small") {
    smallYiBaoEyes.init(left_eye, right_eye);
    smallYiBaoIris.init(left_iris, right_iris);
  } else {
    bigYiBaoEyes.init(left_eye, right_eye);
    bigYiBaoIris.init(left_iris, right_iris);
  }
});
</script>

<template>
  <!-- 眼睛 -->
  <div class="eyes" :class="yibao_type">
    <div
      v-for="(item, index) in 2"
      :key="index"
      ref="eyeRefs"
      :class="yibao_type"
      class="eye iris-narrow"
    >
      <!-- 虹膜 -->
      <div ref="irisRefs" class="iris">
        <!-- 瞳孔 -->
        <div class="pupil"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
