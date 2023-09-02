import { $bus } from "@/utils";

export default (data: Control.Tip) => {
  $bus.emit("tip", data);
};
