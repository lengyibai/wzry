import { useTip } from "@/components/business/Global/Control/components/K-Tip/hooks/useTip";

const $tip = (data: Global.Tip.Prompt) => useTip().tip(data);

export { $tip };
