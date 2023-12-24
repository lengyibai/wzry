import { KVP_EQUIP, KVP_TYPE, LOCAL_EQUIP } from "@/api";

/** @description 获取装备列表 */
export const getEquip = () => {
  const equip_ids = LOCAL_EQUIP.getEquipList();
  const equip_desc_kvp = KVP_EQUIP.getEquipDescKvp();
  const equip_effect_kvp = KVP_EQUIP.getEquipEffectKvp();
  const equip_image_kvp = KVP_EQUIP.getEquipImageKvp();
  const equip_level_kvp = KVP_EQUIP.getEquipLevelKvp();
  const equip_motivation_kvp = KVP_EQUIP.getEquipMotivationKvp();
  const equip_name_kvp = KVP_EQUIP.getEquipNamelKvp();
  const equip_note_kvp = KVP_EQUIP.getEquipNotelKvp();
  const equip_price_kvp = KVP_EQUIP.getEquipPriceKvp();
  const equip_type_kvp = KVP_EQUIP.getEquipTypeKvp();
  const type_equip_kvp = KVP_TYPE.getEquipKvp();

  //整合数据
  const equip_list: Equip.Data[] = [];
  for (let i = 0; i < equip_ids.length; i++) {
    const id = equip_ids[i];
    const { icon, iconBlur } = equip_image_kvp[id];
    equip_list[i] = {
      id: id,
      desc: equip_desc_kvp[id],
      effect: equip_effect_kvp[id],
      icon,
      iconBlur,
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
