const flexible_min_font_size = 10;
const flexible_max_font_size = 18;
const flexible_min_device_width = 320;
const flexible_max_device_width = 2560;
const flexible_html = document.documentElement;

function flexible_onResizeFn() {
  let font_size;
  const width = flexible_html.clientWidth;

  if (width < flexible_min_device_width) {
    font_size = flexible_min_font_size;
  } else if (width > flexible_max_device_width) {
    font_size = flexible_max_font_size;
  } else {
    const progress =
      (width - flexible_min_device_width) / (flexible_max_device_width - flexible_min_device_width);
    font_size =
      flexible_min_font_size + progress * (flexible_max_font_size - flexible_min_font_size);
  }

  flexible_html.style.fontSize = font_size + "px";
}

flexible_onResizeFn();
window.onresize = flexible_onResizeFn;
