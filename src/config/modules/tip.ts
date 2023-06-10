import { Util } from "@/utils";

export default (data: Control.Tip) => {
  Util.$Bus.emit("tip", data);
};
