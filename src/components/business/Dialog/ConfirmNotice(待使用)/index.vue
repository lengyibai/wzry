<template>
  <LibMask>
    <transition name="confirm">
      <div class="ConfirmNotice" :style="{ width: width }">
        <div class="title">{{ title }}</div>
        <img
          class="close cursor-pointer"
          v-show="showClose"
          src="https://lengyibai.gitee.io/wzry-material/image/close.png"
          @dragstart.prevent
          @click="close"
        />
        <img
          class="bg"
          src="https://lengyibai.gitee.io/wzry-material/image/dialog.png"
        />
        <div class="content">
          <div class="desc">
            <div class="title">
              <div class="label">标题</div>
              <div class="text">即将关闭添加页</div>
            </div>
            <div class="content">
              <div class="label">内容</div>
              <div class="text">即将关闭添加页，是否保存为草稿</div>
            </div>
          </div>
          <div class="button">
            <K-Button type="info" @click="confirm(false)">取消</K-Button>
            <K-Button class="last" type="warning" @click="confirm(true)"
              >确定</K-Button
            >
          </div>
        </div>
      </div>
    </transition>
  </LibMask>
</template>
<script setup lang="ts">
import switchStore from "@/store/globalSwitch";

interface Props {
  modelValue: boolean;
  width?: string;
  showClose?: boolean;
  title?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: true,
  width: "60%",
  showClose: true,
  title: "",
});

const emit = defineEmits(["update:modelValue", "close"]);
const store = switchStore();
const close = () => {
  store.$clickAudio("关闭");
  emit("update:modelValue", false);
};
const confirm = (status: boolean) => {
  emit("close", status);
  close();
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>
