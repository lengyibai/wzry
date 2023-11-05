export default function (
  obj: { count: number; gap: number; childs: HTMLElement[] } = {
    count: 2,
    gap: 10,
    childs: [],
  },
) {
  const { count, gap, childs } = obj;
  if (!childs[0]) return;
  const item_width = childs[0].offsetWidth; //获取基础宽度
  const height_List = []; //存储第一行元素的高度信息
  for (let i = 0; i < childs.length; i++) {
    if (i < count) {
      /* 设置第一行的元素 */
      childs[i].style.top = gap + "px";
      height_List.push(childs[i].offsetHeight + gap);
      childs[i].style.left = (item_width + gap) * i + "px";
      childs[i].style.opacity = "1";
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
      childs[i].style.top = minItem["minHeight"] + gap + "px";
      childs[i].style.left = (item_width + gap) * minItem["minIndex"] + "px";
      childs[i].style.opacity = "1";

      /* 更新上一行的高度，用于下一行计算 */
      height_List[minItem["minIndex"]] =
        parseFloat(childs[i].style.top) + childs[i].offsetHeight;
    }
  }
}
