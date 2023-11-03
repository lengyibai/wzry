import { ref } from "vue";

import { API_HERO } from "@/api";

const useGetHeroAtlas = () => {
  /** 独立图片列表 */
  const hero_atlas = ref<HeroAtlas[]>([]);

  API_HERO.getHeroAtlas().then((res) => {
    res.forEach((hero) => {
      hero_atlas.value.push({
        id: hero.id,
        cover: hero.cover,
        poster: hero.poster,
        name: hero.name,
      });
      hero.skins.forEach((skin) => {
        hero_atlas.value.push({
          id: skin.id,
          cover: skin.cover,
          poster: skin.poster,
          name: `${hero.name}-${skin.name}`,
        });
      });
    });
  });

  return {
    /** 独立图片列表 */
    hero_atlas,
  };
};

export { useGetHeroAtlas };
