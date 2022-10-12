<template>
  <div class="Skin view_add">
    <transition name="fade">
      <div class="content" ref="scrollBox" v-if="show">
        <transition-group name="fade">
          <!--左上角新增-->
          <LibSvg
            :svg="icon.ADDC"
            @click="addOne"
            class="addOne"
            color="var(--theme-color-seven)"
            enter-color="var(--theme-color-four)"
            key="LibSvg"
            size="50px"
          />

          <!--指派英雄-->
          <SelectHero class="SelectHero" v-model="hero_id" key="SelectHero" />

          <!--皮肤盒子列表-->
          <div
            class="skin"
            @mouseenter="currentIndex = index"
            @mouseleave="currentIndex = null"
            v-for="(item, index) in form_data"
            :key="item.id"
          >
            <!--//%%%%········皮肤名········%%%%//-->
            <FormInput label="皮肤编号" required v-model="item.num" placeholder="第几款皮肤" />
            <FormInput label="皮肤名" required v-model="item.name" />
            <FormInput label="价格" v-model="item.price" placeholder="请输入" number />

            <!-- 在输入框内部限制数字 -->

            <!--//%%%%········皮肤类型········%%%%//-->
            <FormSelect label="皮肤类型" required :data="skin_types" v-model="item.type" />

            <!--//%%%%········皮肤头像、海报········%%%%//-->
            <FormImg
              label="皮肤头像&海报"
              :getLink="getLink"
              :imgs="[item.head, item.img]"
              :keys="['head', 'img']"
              :values="{ head: '头像', img: '海报' }"
            />

            <!--//%%%%········右上角删除········%%%%//-->
            <transition name="fade">
              <LibSvg
                class="del"
                @click="delOne(index)"
                :svg="icon.X"
                color="var(--theme-color-seven)"
                enter-color="var(--theme-color-four)"
                size="25px"
                right="25px"
                top="25px"
              />
            </transition>
          </div>
        </transition-group>
      </div>
    </transition>

    <!-- 发布按钮 -->
    <LibCommitBtn class="LibCommitBtn" size="50px" @commit="commit" :finish="finish" v-model="status" title="发布" />

    <!-- 取消发布 -->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="cancel" title="取消" />

    <!-- 确认关闭 -->
    <ConfirmClose v-model="show_ConfirmClose" @close="close" />
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { getSkinType } from '@/api/main/tree/skinType/index.js';
import { addSkin } from '@/api/main/hero/skin/index.js';
import icon from '@/assets/icon/svg/icon.js';
import viewHide from '../../../../hooks/useViewHide.js';
import switchStore from '@/store/globalSwitch.js';

const $switchStore = switchStore();
const emit = defineEmits(['update:modelValue']);
const {
  hero_id, show, finish, status, form_data, show_ConfirmClose, cancel, close,
} = viewHide(emit, 'add_skin_list');

if (!form_data.value) {
  form_data.value = []; //添加的皮肤
}

const skin_types = ref([]); //皮肤类型表
const currentIndex = ref(null); //根据悬浮的位置显示垃圾桶

/* 获取皮肤类型表 */
setTimeout(async () => {
  $switchStore.$loading.show('正在加载皮肤类型表');
  skin_types.value = (await getSkinType()).data;
  await $switchStore.$loading.close();
  show.value = true;
}, 1000);

/* 获取链接 */
const getLink = (link, key) => {
  const last_index = form_data.value.length === 0 ? 0 : form_data.value.length - 1;
  form_data.value[last_index] = {
    ...form_data.value.slice(-1)[0],
    [key]: link,
  };
};

/* 增加一项 */
const scrollBox = ref();
const addOne = () => {
  form_data.value.push({
    id: Date.now(),
    num: '',
    hero: hero_id.value,
    name: '',
    img: '',
    head: '',
    type: 0,
    price: '',
  });
  // 滚动到底部
  setTimeout(() => {
    scrollBox.value.scroll({
      top: scrollBox.value.scrollHeight,
      behavior: 'smooth',
    });
  });
};

/* 删除一项 */
const delOne = (i) => {
  form_data.value.splice(i, 1);
  currentIndex.value = null;
};

/* 发布 */
const commit = async () => {
  const flag = form_data.value.every((item) => {
    return item.hero !== 0;
  });

  if (flag) {
    for (let i = 0; i < form_data.value.length; i++) {
      const item = form_data.value[i];
      await addSkin(item);
      finish.value = true;
      setTimeout(() => {
        close();
        $switchStore.$tip('发布成功', 'info');
      }, 500);
    }
  } else {
    $switchStore.$tip('请完整填写', 'error');
    status.value = 0;
  }
};
</script>
<style scoped lang="less">
.Skin {
  .content {
    .SelectHero {
      display: flex;
      z-index: 1;
      position: sticky;
      top: 0;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding-top: 25px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }
    .skin {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 35px;
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      .del {
        position: absolute;
        top: 0;
        right: 0;
      }
      .head-poster {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 25px;
        width: 100%;
        span {
          font-size: 30px;
        }
      }
    }
    .addOne {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2;
    }
  }
}
</style>
