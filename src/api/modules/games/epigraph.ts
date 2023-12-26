import { KVP_EPIGRAPH, KVP_TYPE, LOCAL_EPIGRAPH } from "@/api";

/** @description 获取铭文列表 */
export const getEpigraph = () => {
  const epigraph_ids = LOCAL_EPIGRAPH.getEpigraphList();
  const epigraph_effect_kvp = KVP_EPIGRAPH.getEpigraphEffectKvp();
  const epigraph_image_kvp = KVP_EPIGRAPH.getEpigraphImageKvp();
  const epigraph_name_kvp = KVP_EPIGRAPH.getEpigraphNameKvp();
  const epigraph_type_kvp = KVP_EPIGRAPH.getEpigraphTypeKvp();
  const type_epigraph_kvp = KVP_TYPE.getEpigraphKvp();
  const type_epigraph_effect_kvp = KVP_TYPE.getEpigraphEffectKvp();

  //整合数据
  const epigraph_list: Epigraph.Data[] = [];
  for (let i = 0; i < epigraph_ids.length; i++) {
    const id = epigraph_ids[i];
    const { img, imgBlur } = epigraph_image_kvp[id];

    //获取类型中文名称
    const type = epigraph_type_kvp[id].map((item) => type_epigraph_kvp[item]);
    //获取效果中文名称
    const effect = epigraph_effect_kvp[id].map((item) => {
      return {
        num: item.num,
        type: type_epigraph_effect_kvp[item.type],
      };
    });

    epigraph_list[i] = {
      id,
      type,
      effect,
      img,
      imgBlur,
      name: epigraph_name_kvp[id],
    };
  }

  return epigraph_list;
};
