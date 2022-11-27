import switchStore from "@/store/globalSwitch";

const startLoading = () => {
  const $switchStore = switchStore();
  $switchStore.$loading.show();
};

const endLoading = () => {
  const $switchStore = switchStore();
  $switchStore.$loading.close();
};

/* 每次调用都会+1，只会开启一次loading，当所有请求结束，才会关闭loading */
let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};

export const tryHideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};
