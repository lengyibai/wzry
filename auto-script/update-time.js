// 引入文件系统模块中的读取和写入功能
import { readFileSync, writeFileSync } from "fs";
// 解析路径模块，用于处理文件路径
import { resolve } from "path";

// 引入 dayjs 库来处理日期和时间
import dayjs from "dayjs";

// 获取当前时间的版本号和格式化时间
const getTimeVersion = () => {
  const now = dayjs();
  // 格式化日期为 YY.MM.DD.HH.mm 格式的字符串
  const formattedDate = now.format("YY.MM.DD.HH.mm");
  // 格式化日期为 YYYY-MM-DD HH:mm 格式的字符串
  const formattedDateTime = now.format("YYYY-MM-DD HH:mm");
  return { version: formattedDate, time: formattedDateTime };
};

// 更新日志文件路径
const updateLogFilePath = resolve("dist/json/updateLog.json");
// 版本文件路径
const versionFilePath = resolve("dist/json/version.json");

// 读取更新日志文件中的数据
const updateLogData = readFileSync(updateLogFilePath, "utf-8");
// 读取版本文件中的数据
const versionData = readFileSync(versionFilePath, "utf-8");

// 将更新日志文件数据解析为对象
const updateLogObj = JSON.parse(updateLogData);
// 将版本文件数据解析为对象
const versionObj = JSON.parse(versionData);

// 获取当前时间的版本号和格式化时间
const { version, time } = getTimeVersion();

// 更新更新日志数据中的时间字段
updateLogObj.data.time = time;
// 更新版本数据中的版本号字段
versionObj.data.distVersion = version;

// 将更新后的更新日志数据写入更新日志文件
writeFileSync(updateLogFilePath, JSON.stringify(updateLogObj, null, 2), "utf-8");
// 将更新后的版本数据写入版本文件
writeFileSync(versionFilePath, JSON.stringify(versionObj, null, 2), "utf-8");

// 打印更新后的时间和版本号
console.log(`更新时间已更新：${JSON.parse(updateLogData).data.time} => ${time}`);
console.log(`版本号已更新：${JSON.parse(versionData).data.distVersion} => ${version}`);
