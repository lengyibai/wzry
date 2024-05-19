import { KVP_EQUIP, KVP_TYPE, LOCAL_EQUIP } from "@/api";
import { _getBlurImgLink } from "@/utils/concise";

/** @description 获取装备列表 */
export const getEquip = async () => {
  const equip_ids = await LOCAL_EQUIP.getEquipList();
  const equip_desc_kvp = await KVP_EQUIP.getEquipDescKvp();
  const equip_effect_kvp = await KVP_EQUIP.getEquipEffectKvp();
  const equip_image_kvp = await KVP_EQUIP.getEquipImageKvp();
  const equip_level_kvp = await KVP_EQUIP.getEquipLevelKvp();
  const equip_motivation_kvp = await KVP_EQUIP.getEquipMotivationKvp();
  const equip_name_kvp = await KVP_EQUIP.getEquipNameKvp();
  const equip_note_kvp = await KVP_EQUIP.getEquipNoteKvp();
  const equip_price_kvp = await KVP_EQUIP.getEquipPriceKvp();
  const equip_type_kvp = await KVP_EQUIP.getEquipTypeKvp();
  const type_equip_kvp = await KVP_TYPE.getEquipKvp();
  const type_equip_effect_kvp = await KVP_TYPE.getEquipEffectKvp();

  //整合数据
  const equip_list: Game.Equip.Data[] = [];
  for (let i = 0; i < equip_ids.length; i++) {
    const id = equip_ids[i];
    const { icon, iconBlur } = equip_image_kvp[id];

    //获取装备效果中文名称
    const effect = equip_effect_kvp[id].map((item) => {
      return {
        name: type_equip_effect_kvp[item.name],
        num: item.num,
      };
    });
    equip_list[i] = {
      id: id,
      desc: equip_desc_kvp[id],
      effect,
      icon,
      iconBlur: _getBlurImgLink(iconBlur),
      level: equip_level_kvp[id].value,
      motivation: equip_motivation_kvp[id],
      name: equip_name_kvp[id],
      note: equip_note_kvp[id],
      price: equip_price_kvp[id],
      type: type_equip_kvp[equip_type_kvp[id]],
    };
  }

  return equip_list;
};
