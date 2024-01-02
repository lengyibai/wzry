import { $bus } from "./eventBus";

const $message = (text: string, type: Global.Message.Status = "info") => {
  $bus.emit("msg", {
    text,
    type,
  });
};

export { $message };
