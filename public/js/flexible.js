const flexible_min_font_size = 10; //最小字体大小
const flexible_max_font_size = 16; //最大字体大小
const flexible_min_device_width = 320; //适配最小手机尺寸
const flexible_max_device_width = 1920; //设计稿宽度
const flexible_html = document.documentElement;

function onFlexible() {
  let font_size;
  //获取当前浏览器窗口的宽度
  const width = flexible_html.clientWidth;

  if (width > flexible_max_device_width) {
    //若视口宽度大于最大设备宽度，根据超出的px按比例增加字体大小
    font_size = flexible_max_font_size + (width - flexible_max_device_width) / 10 / 12;
  } else {
    //如果宽度在最小和最大设备宽度之间，按比例计算字体大小
    font_size = flexible_max_font_size - (flexible_max_font_size - flexible_min_font_size) * (1 - width / flexible_max_device_width);
  }

  //设置页面根元素的字体大小
  flexible_html.style.fontSize = font_size + "px";
}

onFlexible();
window.onresize = onFlexible;