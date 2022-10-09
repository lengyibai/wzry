<template>
  <div class="Voice view_add">
    <transition name="fade">
      <div class="content" v-if="show">
        <transition-group name="fade">
          <SelectHero v-model="hero_id" key="SelectHero" />

          <!--//%%%%%··········添加完毕的语音列表··········%%%%%//-->
          <div class="voiceList" v-show="voice_list.length" key="b">
            <div
              class="voice"
              v-for="(item, index) in voice_list"
              @mouseleave="voiceEnter(null)"
              @mouseenter="voiceEnter(index)"
              :key="item.desc"
            >
              <span v-show="currentIndex !== index"> {{ item.desc }}</span>
              <div class="voiceBox" v-show="currentIndex === index">
                <LibSvg
                  size="35px"
                  enter-color="var(--theme-color-four)"
                  color="var(--theme-color-seven)"
                  @click="play(item.voice)"
                  :svg="icon.VOICEPRINT"
                />
                <LibSvg size="35px" color="var(--red)" @click="del(index)" :svg="icon.TRASH" />
              </div>
            </div>
          </div>

          <!--//%%%%%··········正在添加语音的输入框盒子··········%%%%%//-->
          <div class="addBox" v-if="show_box" key="c">
            <transition-group v-if="show_box" name="fade" key="c">
              <FormInput v-model="voice_text" required placeholder="请输入语音文字" label="语音文字" key="a" autoSize />

              <!--//%%%%%··········设置/播放语音··········%%%%%//-->
              <LibSvg
                v-show="voice_text"
                size="50px"
                key="b"
                enter-color="var(--theme-color-four)"
                color="var(--theme-color-seven)"
                @click="setVoice"
                :svg="icon[voice_link ? 'VOICEPRINT' : 'MIC']"
              />

              <!--//%%%%%··········重置语音链接··········%%%%%//-->
              <LibSvg
                v-show="voice_link"
                size="50px"
                key="c"
                enter-color="var(--theme-color-four)"
                color="var(--theme-color-seven)"
                @click="resetVoice"
                :svg="icon.RESET"
              />
            </transition-group>
          </div>

          <!--//%%%%%··········添加/删除/保存按钮··········%%%%%//-->
          <LibSvg
            size="50px"
            key="d"
            enter-color="var(--theme-color-four)"
            color="var(--theme-color-seven)"
            @click="addVoice(add_status)"
            :svg="icon[voice_link ? 'FINISH' : add_status]"
          />
        </transition-group>
      </div>
    </transition>

    <!--//%%%%%··········播放语音··········%%%%%//-->
    <PlayVoice @ended="play_link = ''" v-if="play_link" :link="play_link" />

    <!--//%%%%%··········设置语音链接··········%%%%%//-->
    <AddLink v-model="show_AddLink" title="设置语音" placeholder="请输入语音链接" @get-link="getLink" />

    <!--//%%%%%··········发布按钮··········%%%%%//-->
    <LibCommitBtn v-model="status"  title="发布" size="50px" class="LibCommitBtn" @commit="commit" :finish="finish" />

    <!--//%%%%%··········取消发布··········%%%%%//-->
    <LibCancelBtn class="LibCancelBtn" size="50px" @close="close" title="取消" />
  </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { updateHero } from '@/api/main/hero/self/index.js';
import icon from '@/assets/icon/svg/icon.js';
import viewHide from '../../../../hooks/useViewHide.js';
import switchStore from '@/store/globalSwitch.js';

const emit = defineEmits(['update:modelValue']);
const {
  show, finish, status, close,
} = viewHide(emit);

const voice_link = ref(''); //语音链接
const voice_text = ref(''); //语音文字
const play_link = ref(''); //用于播放
const add_status = ref('ADDC'); //添加&&删除&&保存状态
const hero_id = ref(0); //英雄id
const currentIndex = ref(null); //点击的语音
const show_AddLink = ref(false); //显示设置语音链接弹窗
const show_box = ref(false); //是否显示填写盒子
const voice_list = reactive([]); //用于发布

const $switchStore = switchStore();
setTimeout(async () => {
  $switchStore.$loading.show('正在加载皮肤类型表');
  $switchStore.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

/* 添加一项 */
const addVoice = (s) => {
  if (voice_link.value) {
    voice_list.push({
      desc: voice_text.value,
      voice: voice_link.value,
    });
    voice_text.value = '';
    voice_link.value = '';
    add_status.value = 'ADDC';
    show_box.value = false;
    return;
  }
  if (s === 'ADDC') {
    show_box.value = true;
    add_status.value = 'DELC';
  }
  if (s === 'DELC') {
    add_status.value = 'ADDC';
    voice_text.value = '';
    show_box.value = false;
  }
};

/* 设置语音 */
const setVoice = () => {
  if (voice_link.value) {
    play_link.value = voice_link.value;
  } else {
    show_AddLink.value = true;
  }
};

/* 重置语音 */
const resetVoice = () => {
  voice_link.value = '';
};
/* 获取语音链接 */
const getLink = (link) => {
  voice_link.value = link;
  currentIndex.value = null;
};
/* 点击语音列表 */
const voiceEnter = (i) => {
  currentIndex.value = i;
};
/* 播放语音 */
const play = (link) => {
  play_link.value = link;
};
/* 删除语音 */
const del = (i) => {
  voice_list.splice(i, 1);
};

watch(
  voice_list,
  (v) => {
    console.log(v);
  },
  {
    deep: true,
  },
);
/* 发布 */
const commit = async () => {
  if (voice_list.length !== 0) {
    await updateHero(hero_id.value, { voices: voice_list });
    setTimeout(() => {
      finish.value = true;
      close();
      $switchStore.$tip('发布成功', 'info');
    }, 500);
  } else {
    $switchStore.$tip('你还没有添加语音', 'error');
    status.value = 0;
  }
};
</script>
<style scoped lang="less">
.Voice {
  .content {
    justify-content: center;
    .voiceList {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 10px;
      .voice {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 20px;
        width: 100vw;
        height: 35px;
        > span {
          position: absolute;
          color: var(--theme-color-four);
          font-size: 35px;
        }
        .voiceBox {
          position: absolute;
          width: 100%;
          text-align: center;
        }
      }
    }
    .addBox {
      position: relative;
      bottom: 0;
      display: flex;
      width: 50%;
    }
  }
}

.voiceBox-enter,
.voiceBox-leave-active {
  opacity: 0;
}

.voiceBox-enter-active,
.voiceBox-leave-active {
  transition: all 0.5s;
}
</style>
