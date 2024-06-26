import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { AuthStore } from "./auth";

import type { YiBaoStoreType } from "@/store/interface";
import { YIBAO_PART } from "@/config";
import {
  yiBaoPartConfigDefault,
  yiBaoPartTextureConfigDefault,
  yiBaoSelectTabConfigDefault,
} from "@/config/modules/default";
import { smallYiBaoBody } from "@/components/business/YiBao/helper/yiBaoSmall";
import { _getMinecraftLink } from "@/utils/concise";
import { _cloneDeep } from "@/utils/tool";

/** @description 乂宝装饰 */
const YibaoStore = defineStore("yibao", () => {
  const $authStore = AuthStore();

  /** 乂宝身体 */
  const body = document.body;

  const ExposeData = {
    /** 是否处于跳跃可收益状态 */
    jump_reward: ref(false),
    /** 乂宝当前跳跃次数 */
    jump_count: ref(0),
    /** 当前可领取跳跳币 */
    receive_coin: ref(0),
    /** 当前部件风格 */
    part_style_type: ref<Game.YiBao.StyleType>("COLOR"),
    /** 当前部件类型 */
    part_type: ref<Game.YiBao.PartType>("annulus"),
    /** 已拥有的部件ID */
    owned_part_id: ref<string[]>([]),
    /** 当前选中的需要付费购买的部件 */
    pay_part: ref<YiBaoStoreType.PayPartInfoList>({
      annulus: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
      antenna: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
      blush: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
      eye: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
      mouth: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
      side: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
      wing: {
        id: "",
        price: "",
        type: "COLOR",
        name: "",
      },
    }),
    /** 临时部件，保存时应用 */
    temp_part_detail: ref<YiBaoStoreType.SuitDetail>(yiBaoPartConfigDefault()),
    /** 当前套装详情 */
    part_detail: ref<YiBaoStoreType.SuitDetail>(yiBaoPartConfigDefault()),
    /** 当前套装对应颜色，用于乂宝页底部栏应用 */
    part_color: ref<YiBaoStoreType.PartColor>(yiBaoSelectTabConfigDefault()),
    /** 当前套装对应贴图 */
    part_texture: ref<YiBaoStoreType.PartTexture>(yiBaoPartTextureConfigDefault()),
  };
  const {
    part_type,
    part_texture,
    part_style_type,
    part_detail,
    temp_part_detail,
    part_color,
    pay_part,
    owned_part_id,
    jump_count,
    receive_coin,
    jump_reward,
  } = ExposeData;

  const ExposeComputed = {
    /** 是否更换了部件 */
    is_change_part: computed(() => {
      return JSON.stringify(part_detail.value) !== JSON.stringify(temp_part_detail.value);
    }),
    /** 当前选中的部件信息 */
    part_selected: computed(() => {
      const id = temp_part_detail.value[part_type.value].id;
      const type = temp_part_detail.value[part_type.value].type;
      const price = YIBAO_PART.PART_KEY_INFO[id].price;
      const owned = owned_part_id.value.includes(id);

      return { id, type, price, owned };
    }),
    /** 当前订单列表 */
    pay_order: computed(() => {
      const order_list = Object.entries(pay_part.value)
        .map(([key, value]) => {
          return {
            id: value.id,
            partName: key as Game.YiBao.PartType,
            partStyle: value.type,
            partPrice: value.price,
          };
        })
        .filter((item) => {
          return item.partPrice !== "";
        });

      return order_list;
    }),
  };
  const { part_selected } = ExposeComputed;

  /** @description 保存乂宝数据 */
  const saveYiBaoData = () => {
    $authStore.updateUserData({
      yibao: {
        jumpCoinReceive: receive_coin.value,
        ownedPartIds: owned_part_id.value,
        partDetail: part_detail.value,
      },
    });
  };

  const ExposeMethods = {
    /** @description 使用用户乂宝信息
     * @param v 用户乂宝数据信息
     */
    useUserYiBao(v: User.Data["yibao"]) {
      receive_coin.value = v.jumpCoinReceive;
      owned_part_id.value = v.ownedPartIds;
      part_detail.value = _cloneDeep(v.partDetail);
      temp_part_detail.value = _cloneDeep(v.partDetail);
      this.initYibaoBodyPartStyle();
      jump_reward.value = true;
    },

    /** @description 初始化乂宝部件样式 */
    initYibaoBodyPartStyle() {
      const v = temp_part_detail.value;

      this.setAnnulusId(v.annulus.id, v.annulus.type);
      this.setAntennaId(v.antenna.id, v.antenna.type);
      this.setBlushId(v.blush.id, v.blush.type);
      this.setEyeId(v.eye.id, v.eye.type);
      this.setMouthId(v.mouth.id, v.mouth.type);
      this.setSideId(v.side.id, v.side.type);
      this.setWingId(v.wing.id, v.wing.type);
    },

    /** @description 设置当前展示部件类型
     * @param type 部件类型
     */
    setPartType(type: Game.YiBao.PartType) {
      part_type.value = type;

      //通过当前部件的类型，设置当前部件风格
      const key = part_type.value;
      part_style_type.value = temp_part_detail.value[key].type;
    },

    /** @description 设置当前展示部件类型
     * @param status 部件风格
     */
    setPartStyle(status: Game.YiBao.StyleType) {
      part_style_type.value = status;
    },

    /** @description 设置圆环部件ID并应用
     * @param id 部件ID
     */
    setAnnulusId(
      id = temp_part_detail.value.annulus.id,
      type = temp_part_detail.value.annulus.type,
    ) {
      temp_part_detail.value.annulus.id = id;
      temp_part_detail.value.annulus.type = type;

      if (type === "COLOR") {
        const data = YIBAO_PART.ANNULUS_COLOR.find((item) => item.id === id);
        body.style.setProperty("--annulus-border-color", data!.color);
        part_color.value.annulus = data!.color;
      } else {
        const data = YIBAO_PART.ANNULUS_IMG.find((item) => item.id === id);
        body.style.setProperty(`--annulus-bg`, `url(${_getMinecraftLink(data!.img)})`);
        part_texture.value.annulus = _getMinecraftLink(data!.img);
      }

      this.setPayPart("annulus");
    },

    /** @description 设置天线部件ID并应用
     * @param id 部件ID
     * @param type 部件类型
     */
    setAntennaId(
      id = temp_part_detail.value.antenna.id,
      type = temp_part_detail.value.antenna.type,
    ) {
      temp_part_detail.value.antenna.id = id;
      temp_part_detail.value.antenna.type = type;

      if (type === "COLOR") {
        const data = YIBAO_PART.ANTENNA_COLOR.find((item) => item.id === id);
        body.style.setProperty("--antenna-bg-color", data!.colors[0]);
        body.style.setProperty("--antenna-border-color", data!.colors[1]);
        part_color.value.antenna = data!.colors;
      } else {
        const data = YIBAO_PART.ANTENNA_IMG.find((item) => item.id === id);
        body.style.setProperty(`--antenna-bg-img`, `url(${_getMinecraftLink(data!.img)})`);
        part_texture.value.antenna = _getMinecraftLink(data!.img);
      }

      this.setPayPart("antenna");
    },

    /** @description 设置腮红部件ID并应用
     * @param id 部件ID
     * @param type 部件类型
     */
    setBlushId(id = temp_part_detail.value.blush.id, type = temp_part_detail.value.blush.type) {
      temp_part_detail.value.blush.id = id;

      if (type === "COLOR") {
        const data = YIBAO_PART.BLUSH_COLOR.find((item) => item.id === id);
        body.style.setProperty("--blush-bg-color", data!.color);
        part_color.value.blush = data!.color;
      }

      this.setPayPart("blush");
    },

    /** @description 设置眼睛部件ID并应用
     * @param id 部件ID
     * @param type 部件类型
     */
    setEyeId(id = temp_part_detail.value.eye.id, type = temp_part_detail.value.eye.type) {
      temp_part_detail.value.eye.id = id;

      if (type === "COLOR") {
        const data = YIBAO_PART.EYE_COLOR.find((item) => item.id === id);
        body.style.setProperty("--eye-bg-color-one", data!.colors[0]);
        body.style.setProperty("--eye-bg-color-two", data!.colors[1]);
        part_color.value.eye = data!.colors;
      }

      this.setPayPart("eye");
    },

    /** @description 设置嘴巴部件ID并应用
     * @param id 部件ID
     * @param type 部件类型
     */
    setMouthId(id = temp_part_detail.value.mouth.id, type = temp_part_detail.value.mouth.type) {
      temp_part_detail.value.mouth.id = id;

      if (type === "COLOR") {
        const data = YIBAO_PART.MOUTH_COLOR.find((item) => item.id === id);
        body.style.setProperty("--mouth-bg-color-one", data!.colors[0]);
        body.style.setProperty("--mouth-bg-color-two", data!.colors[1]);
        part_color.value.mouth = data!.colors;
      }

      this.setPayPart("mouth");
    },

    /** @description 设置六面部件ID并应用
     * @param id 部件ID
     * @param type 部件类型
     */
    setSideId(id = temp_part_detail.value.side.id, type = temp_part_detail.value.side.type) {
      temp_part_detail.value.side.id = id;
      temp_part_detail.value.side.type = type;

      if (type === "COLOR") {
        const data = YIBAO_PART.SIDE_COLOR.find((item) => item.id === id);
        body.style.setProperty("--side-bg-color", data!.colors[0]);
        body.style.setProperty("--side-border-color", data!.colors[1]);
        part_color.value.side = data!.colors;
      } else {
        const data = YIBAO_PART.SIDE_IMG.find((item) => item.id === id);
        for (const key in data) {
          if (key !== "id") {
            body.style.setProperty(
              `--side-${key}-bg`,
              `url(${_getMinecraftLink(data[key].replace("_small", ""))})`,
            );
            part_texture.value.side = data as unknown as YiBaoStoreType.PartTexture["side"];
          }
        }
      }

      this.setPayPart("side");
    },

    /** @description 设置羽翅部件ID并应用
     * @param id 部件ID
     * @param type 部件类型
     */
    setWingId(id = temp_part_detail.value.wing.id, type = temp_part_detail.value.wing.type) {
      temp_part_detail.value.wing.id = id;
      temp_part_detail.value.wing.type = type;

      if (type === "COLOR") {
        const data = YIBAO_PART.WING_COLOR.find((item) => item.id === id);
        body.style.setProperty("--wing-bg-color", data!.color);
        part_color.value.wing = data!.color;
      } else {
        const data = YIBAO_PART.WING_IMG.find((item) => item.id === id);

        body.style.setProperty(`--wing-bg-img`, `url(${_getMinecraftLink(data!.img)})`);
        part_texture.value.wing = _getMinecraftLink(data!.img);
      }

      this.setPayPart("wing");
    },

    /** @description 设置付费商品
     * @param partType 部件类型
     * @param clear 是否清空
     */
    setPayPart(partType: Game.YiBao.PartType, clear = false) {
      //当前选中的部件ID
      const id = temp_part_detail.value[partType].id;
      const part_info = YIBAO_PART.PART_KEY_INFO[id];
      const price = part_info.price;
      const type = part_info.type;
      const name = part_info.name;

      //是否拥有部件
      const is_owned = owned_part_id.value.includes(id);

      if (is_owned || clear) {
        //如果已拥有，则重置
        pay_part.value[partType] = {
          id,
          price: "",
          type: "COLOR",
          name: "",
        };
      } else {
        //如果未拥有，则替换付费列表中的同类型部件
        pay_part.value[partType] = {
          id,
          price,
          type,
          name,
        };
      }
    },

    /** @description 保存已拥有的部件 */
    saveOwnedPart() {
      part_detail.value = _cloneDeep(temp_part_detail.value);
      saveYiBaoData();
    },

    /** @description 单个购买 */
    buyAlonePart() {
      const id = part_selected.value.id;
      owned_part_id.value.push(id);
      temp_part_detail.value[part_type.value].id = id;
      temp_part_detail.value[part_type.value].type = part_selected.value.type;

      //删除已购买的订单
      this.setPayPart(part_type.value);

      this.saveOwnedPart();
    },

    /** @description 全部购买 */
    buyAllPart() {
      //添加已拥有
      for (const key in pay_part.value) {
        const id = pay_part.value[key as Game.YiBao.PartType].id;
        id && owned_part_id.value.push(id);
      }

      //重置订单列表
      YIBAO_PART.PART_KEY_LIST.forEach((key) => {
        this.setPayPart(key);
      });

      this.saveOwnedPart();
    },

    /** @description 清空购物车 */
    resetPayPart() {
      YIBAO_PART.PART_KEY_LIST.forEach((key) => {
        this.setPayPart(key, true);
        this.resetCurrentPartStyle(key);
      });
    },

    /** @description 重置跳跳币领取 */
    resetJumpCoinReceive() {
      receive_coin.value = 0;
    },

    /** @description 还原当前部件
     * @param partType 部件类型
     */
    resetCurrentPartStyle(partType = part_type.value) {
      part_style_type.value = part_detail.value[partType].type;
      temp_part_detail.value[partType] = { ...part_detail.value[partType] };

      const set_id_fns = {
        annulus: this.setAnnulusId,
        antenna: this.setAntennaId,
        blush: this.setBlushId,
        eye: this.setEyeId,
        mouth: this.setMouthId,
        side: this.setSideId,
        wing: this.setWingId,
      };

      //应用重置后的部件
      set_id_fns[partType]();
    },

    /** @description 还原所有部件 */
    resetAllPartStyle() {
      temp_part_detail.value = _cloneDeep(part_detail.value);
      part_style_type.value = part_detail.value[part_type.value].type;

      //重置订单列表
      YIBAO_PART.PART_KEY_LIST.forEach((key) => {
        this.setPayPart(key);
      });

      this.initYibaoBodyPartStyle();
    },

    /** @description 恢复出厂配置 */
    resetDefaultPart() {
      jump_reward.value = false;
      part_style_type.value = "COLOR";
      part_type.value = "annulus";

      //重置订单列表
      YIBAO_PART.PART_KEY_LIST.forEach((key) => {
        this.setPayPart(key, true);
      });
    },
  };

  smallYiBaoBody.setJumpCallback(() => {
    if (!jump_reward.value) return;

    jump_count.value++;
    if (jump_count.value >= 5) {
      receive_coin.value += 20;
      jump_count.value = 0;
      saveYiBaoData();
    }
  });

  return {
    ...ExposeData,
    ...ExposeComputed,
    ...ExposeMethods,
  };
});

export { YibaoStore };
