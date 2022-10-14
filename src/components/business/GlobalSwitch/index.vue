<template>
  <div class="GlobalSwitch">
    <!-- loading -->
    <LibLoading :show="show_loading" :text="loading_text" />
    <!-- 消息提醒 -->
    <K-Message :messages="messages" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Sound, MsgText, Message } from './interface/index';
import $bus from '@/utils/eventBus'; //事件总线

import switchStore from '@/store/globalSwitch'; //全局开关
const $switchStore = switchStore();

//#####··········loading··········#####//
const show_loading = ref(false); //是否显示
const loading_text = ref(''); //加载描述
/* 设置方法 */
const loading = {
  show(text: string) {
    loading_text.value = text;
    show_loading.value = true;
  },
  close() {
    return new Promise((resolve) => {
      setTimeout(() => {
        show_loading.value = false;
        setTimeout(() => {
          resolve(null);
        }, 250);
      }, 500);
    });
  },
};
/* 挂载全局 */
$switchStore.$patch({
  $loading: loading,
});

//#####··········sound··········#####//
const sound_name = ref('default'); //音效名
/* 音效类型 */
const sound_type: Sound = {
  default: ['默认'],
  tab: ['tab'],
  login: ['login'],
  模式选择: ['/home'],
  查看详情: ['/system/hero'],
  皮肤相关: ['/system/skin'],
  装备相关: ['/system/equip', '/equip', '/system/epigraph'],
  英雄列表: ['/hero'],
  查看: ['查看'],
  确定: ['确定'],
  关闭: ['关闭'],
  取消: ['取消'],
  消息提示: ['消息提示'],
  警告提示: ['警告提示'],
  错误提示: ['错误提示'],
  确认弹窗: ['确认弹窗'],
  关闭抽屉: ['收起侧边栏'],
  项目组件: ['/system/components'],
};
/* 获取音效路径 */
const getAudio = (src: string) => {
  return new URL(`../../../../assets/audios/${src}.mp3`, import.meta.url).href;
};
/* 设置方法 */
const clickAudio = (name: string) => {
  //获取点击触发的音效名
  sound_name.value =
    (typeof name === 'string' &&
      Object.keys(sound_type).find((item) => sound_type[item].find((item: string) => name.includes(item)))) ||
    'default';

  new Audio(getAudio(sound_name.value)).play().catch(() => {
    // console.error('音频播放失败，用户未与页面交互');
  });
};
//挂载全局
$switchStore.$patch({
  $clickAudio: clickAudio, //全局点击音效
});

//#####··········tip··········#####//
const messages = reactive<MsgText[]>([]); //消息队列
const tip = (text: string = '未设置提示', type: string = 'info') => {
  const text_length = text.split('').length / 3; //获取文字长度
  const time = text_length > 3 ? text_length : text_length + 1; //通过文字长度，设置显示时长
  // 延迟提醒，避免与点击操作同时播放
  setTimeout(() => {
    const msgName: Message = {
      info: '消息提示',
      warning: '警告提示',
      error: '错误提示',
    };
    $switchStore.$clickAudio(msgName[type]); //播放指定名称的音效

    // 创建消息内容
    const msgText: MsgText = {
      id: new Date().getTime(),
      text,
      type,
    };
    // 将消息内容添加进消息队列
    messages.unshift(msgText);
    setTimeout(() => {
      messages.pop();
    }, time * 1000);
  });
};
/* 挂载全局 */
$switchStore.$patch({
  $tip: tip,
});

//#####··········全局监听事件··········#####//
onMounted(() => {
  const events = ['resize', 'click', 'mousedown', 'mouseup'];
  for (const v of events) {
    window.addEventListener(v, (e) => {
      $bus.emit(v, e);
    });
  }
});
</script>
