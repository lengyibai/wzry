import $bus from "@/utils/modules/eventBus";

export default (data: Global.Tip.Prompt) => {
  $bus.emit("tip", data);
};
