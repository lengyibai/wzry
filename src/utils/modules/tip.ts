import { $bus } from "./eventBus";

const $tip = (data: Global.Tip.Prompt) => {
  $bus.emit("tip", data);
};

export { $tip };
