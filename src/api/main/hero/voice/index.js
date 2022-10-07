import { getVoices } from './transfer.js';

//#####········获取语音········#####//
export const getVoice = (data) => new Promise((resolve) => {
  getVoices(data).then((res) => (data ? resolve(res.data[0]?.data) : resolve(res.data)));
});
