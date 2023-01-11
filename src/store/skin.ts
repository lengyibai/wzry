import { ref } from "vue";
import { defineStore } from "pinia";
import { getSkin } from "@/api/main/games/skin";
import { getSkinType } from "@/api/main/games/skinType";
import { $debounce, $search } from "@/utils";

export default defineStore("skin", () => {
  const profession = ref(""); //职业类型
  const sort_type = ref(0); // 当前价格排序类型
  const gender_type = ref(0); // 当前性别排序类型
  const skin_list = ref<Hero.Skin[]>([]); //皮肤列表
  const filter_list = ref<Hero.Skin[]>([]); //筛选后的列表
  const type_logo = ref<
    {
      id: number;
      name: string;
      link: string;
    }[]
  >([]); //类型logo列表

  /** @description: 获取皮肤列表 */
  const getSkinList = (profession?: string) => {
    getSkin().then((skinList) => {
      getSkinType().then((skinType) => {
        skinType.forEach((type) => {
          skinList.forEach((skin) => {
            if (type.id === skin.type) {
              skin.type = type.link;
              skin.category = type.name;
            }
          });
        });
        setSkinList(skinList, profession);
      });
    });
  };

  /** @description: 设置皮肤列表 */
  const setSkinList = (data: Hero.Skin[], profession = "全部") => {
    skin_list.value = data;
    setProfessional(profession);
  };

  /** @description: 设置职业 */
  const setProfessional = (p: string) => {
    if (profession.value === p) return;
    profession.value = p;
    sortAll();
  };

  /** @description: 价格排序 */
  const sortPrice = (type: number) => {
    if (sort_type.value === type) return;
    sort_type.value = type;
    sortAll();
  };

  /** @description: 性别排序 */
  const sortGender = (type: number) => {
    if (gender_type.value === type) return;
    gender_type.value = type;
    sortAll();
  };

  /** @description: 一键排序 */
  const sortAll = () => {
    // 职业排序
    if (profession.value === "全部") {
      filter_list.value = skin_list.value;
    } else {
      filter_list.value = skin_list.value.filter((item: Hero.Skin) => {
        return item.profession.includes(profession.value);
      });
    }

    // 性别排序
    const boy: Hero.Skin[] = [];
    const girl: Hero.Skin[] = [];
    filter_list.value.forEach((item) => {
      if (item.gender === "男") {
        boy.push(item);
      } else {
        girl.push(item);
      }
    });

    if (gender_type.value === 1) {
      filter_list.value = boy;
    } else if (gender_type.value === 2) {
      filter_list.value = girl;
    }

    // 价格排序
    if (sort_type.value === 1) {
      const isNum: Hero.Skin[] = [];
      const noNum: Hero.Skin[] = [];
      filter_list.value.forEach((item) => {
        if (!isNaN(Number(item.price))) {
          isNum.push(item);
        } else {
          noNum.push(item);
        }
      });
      isNum.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
      filter_list.value = [...isNum, ...noNum];
    } else if (sort_type.value === 2) {
      const isNum: Hero.Skin[] = [];
      const strange: Hero.Skin[] = [];
      const noNum: Hero.Skin[] = [];
      filter_list.value.forEach((item) => {
        if (!isNaN(Number(item.price))) {
          isNum.push(item);
        } else {
          if (item.type.toString().indexOf("26.png") !== -1) {
            strange.push(item);
          } else {
            noNum.push(item);
          }
        }
      });
      isNum.sort((a, b) => {
        return Number(b.price) - Number(a.price);
      });
      filter_list.value = [...strange, ...isNum, ...noNum];
    }
  };

  /** @description: 搜索皮肤 */
  const searchSkin = (name: string) => {
    $debounce(() => {
      if (name) {
        filter_list.value = $search(skin_list.value, name, [
          "name",
          "heroName",
          "category",
        ]);
      } else {
        sortAll();
      }
    }, 500);
  };

  return {
    profession,
    skin_list,
    filter_list,
    type_logo,
    sort_type,
    gender_type,
    getSkin: getSkinList,
    setSkinList,
    setProfessional,
    sortPrice,
    sortGender,
    sortAll,
    searchSkin,
  };
});
