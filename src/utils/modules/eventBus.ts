import mitt from "mitt";

// type EventData = {
//   "load-msg"?: "auto" | "smooth";
//   "play-voice": undefined;
//   role: string;
// };

// type MittEventMap = {
//   [key in keyof EventData]: EventData[key];
// };

// const emitter = mitt<MittEventMap>();

const emitter = mitt();
export default emitter;
