import $bus from "@/utils/modules/eventBus";

export default (text: string, type: Global.Message.Status = "info") => {
  $bus.emit("msg", {
    text,
    type,
  });
};
