document.addEventListener("dragstart", function (event) {
  //检查事件目标是否为 img 元素
  if (event.target.tagName.toUpperCase() === "IMG") {
    //如果是，阻止拖拽
    event.preventDefault();
  }
});

document.onkeydown = (e) => {
  if (e.keyCode === 9) {
    e.preventDefault();
  }
};
