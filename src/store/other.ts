import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("other", () => {
  const collapse = ref(false); //是否折叠

  const setCollapse = () => {
    collapse.value = !collapse.value;
  };

  return { collapse, setCollapse };
});

export default switchStore;
