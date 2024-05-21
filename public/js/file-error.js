let is_error = false;
window.addEventListener(
  "error",
  function (e) {
    if (
      ["link", "script"].includes(e.target.localName) &&
      e.target.href?.includes("wzry") &&
      !is_error
    ) {
      is_error = true;
      const status = confirm(
        "js文件丢失，网站可能因更新移除了旧的js文件，可能会影响网站正常运行，点击确定后刷新浏览器获取最新文件",
      );
      status && location.reload();
    }
  },
  true,
);
