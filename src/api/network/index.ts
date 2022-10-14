import axios, { AxiosRequestConfig } from 'axios';
// import switchStore from '@/store/globalSwitch';

//#####··········域名管理··········#####//
const server = axios.create({
  baseURL: 'http://localhost:9876'
});

//#####·········配置默认请求··········#####//
//####········GET请求········####//
export function getReq(url: string, params?: any) {
  return server({ method: 'GET', url, params });
}

//####········POST请求········####//
export function postReq(url: string, data?: any) {
  return server({ method: 'POST', url, data });
}

//####········PUT请求········####//
export function putReq(url: string, data?: any) {
  return server({ method: 'PUT', url, data });
}

//####········PATCH请求········####//
export function patchReq(url: string, data?: any) {
  return server({ method: 'PATCH', url, data });
}

//####········DELETE请求········####//
export function deleteReq(url: string) {
  return server({ method: 'DELETE', url });
}

//#####·········拦截器··········#####//
//####·······请求拦截器········####//
server.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.authorization = localStorage.getItem('wzryToken') as string;
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
