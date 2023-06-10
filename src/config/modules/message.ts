import { Util } from "@/utils";

export default (text: string, type: MsgType = "info") => {
  Util.$Bus.emit("msg", {
    text,
    type,
  });
};
