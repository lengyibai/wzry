/** 是否禁用弹出安装 */
let disable = false;
/** 弹出安装的事件对象 */
let deferredPrompt;

/* 用于实时检查是否安装当前应用 */
const checkInstall = () => {
  //如果禁用弹出
  if (disable) return;

  //弹出安装
  if (deferredPrompt && deferredPrompt.prompt && deferredPrompt.prompt) {
    deferredPrompt.prompt().catch(() => {});
  }

  setTimeout(checkInstall, 3000);
};

//如果没有安装，则会弹出安装提示
window.addEventListener("beforeinstallprompt", (event) => {
  // 阻止默认的安装提示
  event.preventDefault();
  // 保存事件以便稍后触发
  deferredPrompt = event;

  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      disable = true;
    } else {
      console.error("取消安装");
      disable = true;
    }
  });

  //让用户浏览网页三分钟决定是否安装，提高安装率
  setTimeout(checkInstall, 3000 * 60);
});
