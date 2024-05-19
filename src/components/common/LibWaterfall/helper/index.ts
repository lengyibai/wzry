const waterFullLayout = (
  obj: { count: number; gap: number; children_list: HTMLElement[] } = {
    count: 2,
    gap: 10,
    children_list: [],
  },
) => {
  const { count, gap, children_list } = obj;
  if (!children_list[0]) return;
  const item_width = children_list[0].offsetWidth; //获取基础宽度
  const height_List = []; //存储第一行元素的高度信息
  for (let i = 0; i < children_list.length; i++) {
    if (i < count) {
      /* 设置第一行的元素 */
      children_list[i].style.top = gap + "px";
      height_List.push(children_list[i].offsetHeight + gap);
      children_list[i].style.left = (item_width + gap) * i + "px";
      children_list[i].style.opacity = "1";
      children_list[i].style.transform = "initial";
    } else {
      /* 第一行元素设置完毕开始计算后面行的元素 */
      const minItem: Record<string, number> = {
        minHeight: height_List[0],
        minIndex: 0,
      };

      /* 获取最小高度的元素 */
      for (let j = 0; j < height_List.length; j++) {
        if (height_List[j] < minItem["minHeight"]) {
          minItem["minHeight"] = height_List[j];
          minItem["minIndex"] = j;
        }
      }

      /* 通过计算出来的最小高度进行定位填充 */
      children_list[i].style.top = minItem["minHeight"] + gap + "px";
      children_list[i].style.left = (item_width + gap) * minItem["minIndex"] + "px";
      children_list[i].style.opacity = "1";
      children_list[i].style.transform = "initial";

      /* 更新上一行的高度，用于下一行计算 */
      height_List[minItem["minIndex"]] =
        parseFloat(children_list[i].style.top) + children_list[i].offsetHeight;
    }
  }
};

export { waterFullLayout };
