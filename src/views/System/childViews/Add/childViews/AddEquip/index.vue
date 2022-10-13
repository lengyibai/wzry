<template>
  <div class="Equip view_add">
    <transition name="fade">
      <div class="content" ref="content" v-if="show">
        <div class="left">
          <!-- 装备名 -->
          <FormInput label="名称" required v-model="form_data.name" />
          <!-- 描述 -->
          <FormInput label="描述" placeholder="装备名下方描述" v-model="form_data.desc" />
          <!-- 装备类型 -->
          <FormSelect label="类型" :data="equip_types" v-model="form_data.type" :value="form_data.type" required />
          <!-- 阶段 -->
          <FormInput label="阶段" placeholder="1-3" required v-model="form_data.level" number />
          <!-- 排名 -->
          <FormInput label="阶段排名" placeholder="当前列第几个" required v-model="form_data.num" number />
          <!-- 价格 -->
          <FormInput label="价格" required v-model="form_data.price" number />
          <!-- 设置图标 -->
          <FormImg
            :getLink="getLink"
            :imgs="[form_data.icon]"
            :keys="['icon']"
            :values="{ icon: '图标' }"
            label="图标"
            required
          />
          <!-- 最底部灰色备注 -->
          <LibRichText width="500px" v-model="form_data.note" placeholder="最底部灰色备注" :key="form_data.note" />

          <!-- 装备效果 -->
          <div class="equip-effect">
            <div class="select-effect">
              <FormSelect
                label="效果类型"
                v-model="equip_effect_type"
                :value="equip_effect_type"
                :data="equip_effects"
              />
              <span class="add cursor-pointer" @click="addEffect">添加</span>
              <span class="del cursor-pointer" @click="delEffect">删除一行</span>
            </div>
            <div class="effect-list">
              <transition-group name="fade">
                <FormInput
                  labelWidth="175px"
                  :label="item.name"
                  v-model="item.num"
                  required
                  v-for="item in form_data.effect"
                  :key="item.name"
                />
              </transition-group>
            </div>
          </div>

          <!-- 被动及主动 -->
          <div class="motivation">
            <!-- 名称 -->
            <FormInput label="主/被动名称" labelWidth="195px" v-model="motivation.name" />
            <FormInput label="冷却时间" labelWidth="195px" v-model="motivation.time" number />
            <K-Checkbox label="主动" labelWidth="195px" v-model="motivation.type" />
            <!-- 主/被动描述 -->
            <LibRichText width="500px" v-model="motivation.desc" placeholder="主/被动描述" :key="motivation.desc" />

            <div class="box">
              <span class="add cursor-pointer" @click="addMotivation">添加</span>
              <span class="del cursor-pointer" @click="delMotivation">删除一行</span>
            </div>
          </div>
        </div>
        <div class="right">
          <EquipDetail :show="true" :equip="form_data" />
        </div>
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
import { getEquipType } from '@/api/main/game/index.js';
import { getEquipEffect } from '@/api/main/game/index.js';
import { addEquip } from '@/api/main/game/index.js';
import switchStore from '@/store/globalSwitch.js';
import equipStore from '@/store/equip.js';
import viewHide from '../../../../hooks/useViewHide.js';
import EquipDetail from '@/views/Equip/childComps/EquipDetail/index.vue';

const emit = defineEmits(['update:modelValue']);
const {
  show, finish, status, form_data, show_ConfirmClose, cancel, close,
} = viewHide(emit, 'add_equip');

const $switchStore = switchStore();
const $equipStore = equipStore();

const equip_effect_type = ref(''); //当前选中的效果类型
const equip_types = ref([]); //装备类型
const motivation = ref({
  type: false,
  name: '',
  desc: '',
  time: '',
});
const equip_effects = ref([]);
getEquipEffect().then((res) => {
  equip_effects.value = res.data;
});

getEquipType().then((res) => {
  equip_types.value = res.data;
});

if (!form_data.value) {
  form_data.value = {
    type: '',
    level: '',
    num: '',
    name: '',
    desc: '',
    price: '',
    icon: '',
    note: '',
    effect: [],
    motivation: [],
  };
}

/* 获取装备图标链接 */
const getLink = (v) => {
  form_data.value.icon = v;
};

/* 添加装备效果 */
const addEffect = () => {
  if (!equip_effect_type.value) return;
  form_data.value.effect.push({
    name: equip_effect_type.value,
    num: '',
  });
  equip_effect_type.value = '';
};

/* 删除装备效果 */
const delEffect = () => {
  equip_effect_type.value = '';
  form_data.value.effect.pop();
};

/* 添加被动 */
const addMotivation = () => {
  if (!motivation.value.name) return;
  form_data.value.motivation.push({
    ...motivation.value,
    type: motivation.value.type ? '主动' : '被动',
    time: Number(motivation.value.time),
  });
  motivation.value = {
    type: false,
    name: '',
    desc: '',
    time: '',
  };
};

/* 删除被动 */
const delMotivation = () => {
  form_data.value.motivation.pop();
};

setTimeout(async () => {
  $switchStore.$loading.show('正在加载');
  $switchStore.$loading.close().then(() => {
    show.value = true;
  });
}, 1000);

const commit = async () => {
  const {
    level, num, price, type, name, icon,
  } = form_data.value;
  if (level && num && price && type && name && icon) {
    form_data.value.id = Number(
      `${equip_types.value.find((item) => form_data.value.type === item.name).id}${level}${num}`,
    );
    const data = {
      ...form_data.value,
      level: Number(level),
      num: Number(num),
      price: Number(price),
    };
    try {
      await addEquip(data);
    } catch (error) {
      $switchStore.$tip('装备位置已被占用，请重新填写阶段排名', 'error');
      status.value = 0;
      return;
    }
    setTimeout(async () => {
      finish.value = true;
      await $equipStore.getEquipList();
      $switchStore.$tip('发布成功', 'info');
      close();
    }, 500);
  } else {
    $switchStore.$tip('请完整填写', 'error');
    status.value = 0;
  }
};
</script>
<style scoped lang="less">
.options {
  .add,
  .del {
    margin-left: 25px;
    font-size: 25px;
    color: var(--theme-color-three);
  }
  .del:hover {
    color: var(--red);
  }
  .add:hover {
    color: var(--theme-color-ten);
  }
}
.Equip {
  .content {
    flex-direction: row;
    .left {
      position: relative;
      min-width: 666px;
      flex: 1;
      padding: 30px;
      height: 100%;
      overflow: auto;
      .equip-effect {
        margin-bottom: 100px;
        .select-effect {
          .options();
          display: flex;
          align-items: center;
        }
      }
      .motivation {
        .box {
          .options();
          display: flex;
          align-items: center;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      overflow: auto;
      padding: 30px;
    }
  }
}
</style>
