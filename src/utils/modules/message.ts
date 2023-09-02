import $bus from "@/utils/modules/eventBus";

export default (text: string, type: MsgType = "info") => {
  $bus.emit("msg", {
    text,
    type,
  });
};
