import { onMounted, ref } from "vue";
import { LOCAL_VERSION } from "@/config/config";
import switchStore from "@/store/globalSwitch";
export default () => {
  const REMOTE_VERSION = ref("正在检查更新..."); //远程版本

  /* 检查更新 */
  const update = () => {
    REMOTE_VERSION.value = window.REMOTE_VERSION; //来自外部链接的 REMOTE_VERSION
    const local_version = Number(LOCAL_VERSION.replaceAll(".", "")); //将本地版本转成数字
    const remote_version = Number(REMOTE_VERSION.value.replaceAll(".", "")); //将远程版本转成数字
    const test = remote_version - local_version;
    if (test > 0) {
      switchStore().$msg(
        "作者已推送最新代码至GitHub，请git pull或重新克隆进行更新",
        "warning"
      );
    } else if (test < 0) {
      switchStore().$msg("当前版本大于远程版本", "error");
    } else {
      switchStore().$msg("当前版本已是最新版，请放心使用！", "info");
    }
  };

  /* 每隔五秒检查更新，获取最新版后停止 */
  onMounted(() => {
    const timer = setInterval(() => {
      if (REMOTE_VERSION.value) {
        clearInterval(timer);
        update();
      }
    }, 5000);
  });
  return {
    LOCAL_VERSION,
    REMOTE_VERSION,
  };
};
