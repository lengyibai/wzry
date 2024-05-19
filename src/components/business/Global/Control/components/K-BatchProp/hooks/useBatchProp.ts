import { ref } from "vue";

const ExposeData = {
  /** 是否显示 */
  show: ref(false),
  /** 接收的配置 */
  prop_key: ref<Game.PropKey>("BLESSING_BAG"),
};
const { show, prop_key } = ExposeData;

/** @description 批量使用道具 */
const useBatchProp = () => {
  const ExposeMethods = {
    /**
     * @description 显示道具批量使用弹窗
     * @param 需要批量使用的道具
     */
    openBatchProp(key: Game.PropKey) {
      show.value = true;
      prop_key.value = key;
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useBatchProp };
