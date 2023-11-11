const min_font_size = 10;
const max_font_size = 16;
const min_device_width = 320;
const max_device_width = 1920;
const html = document.documentElement;

function onResizeFn() {
  let font_size;
  const width = html.clientWidth;

  if (width < min_device_width) {
    font_size = min_font_size;
  } else if (width > max_device_width) {
    font_size = max_font_size;
  } else {
    const progress = (width - min_device_width) / (max_device_width - min_device_width);
    font_size = min_font_size + progress * (max_font_size - min_font_size);
  }

  html.style.fontSize = `${font_size}px`;
}

onResizeFn();
window.addEventListener("resize", onResizeFn);
