import axios from 'axios';
// import switchStore from '@/store/globalSwitch.js';

//#####··········域名管理··········#####//
const server = axios.create({
  baseURL: 'http://localhost:9876'
});

//#####·········配置默认请求··········#####//
//####········GET请求········####//
export function getReq(url, params) {
  return server({ method: 'GET', url, params });
}

//####········POST请求········####//
export function postReq(url, data) {
  return server({ method: 'POST', url, data });
}

//####········PUT请求········####//
export function putReq(url, data) {
  return server({ method: 'PUT', url, data });
}

//####········PATCH请求········####//
export function patchReq(url, data) {
  return server({ method: 'PATCH', url, data });
}

//####········DELETE请求········####//
export function deleteReq(url) {
  return server({ method: 'DELETE', url });
}

//#####·········拦截器··········#####//
//####·······请求拦截器········####//
server.interceptors.request.use((config) => {
  config.headers.authorization = localStorage.getItem('wzryToken');
  return config;
});
//####·······响应拦截器········####//
// server.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error(err);
//     switchStore().$tip(
//       '请求失败，请检查是否启动本地服务器：npm run wzry',
//       'error',
//     );
//     switchStore().$loading.close();
//   },
// );
