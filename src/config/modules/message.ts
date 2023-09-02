import { $bus } from "@/utils";

export default (text: string, type: MsgType = "info") => {
  $bus.emit("msg", {
    text,
    type,
  });
};
