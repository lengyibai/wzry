import $bus from "@/utils/modules/eventBus";

export default (data: Control.Tip) => {
  $bus.emit("tip", data);
};
