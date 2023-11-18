import type { App, Directive } from "vue";

import drag from "./modules/drag";
import downDrag from "./modules/downDrag";
import focus from "./modules/focus";
import maskGradient from "./modules/maskGradient";
import particle from "./modules/particle";
import sweepLight from "./modules/sweepLight";
import textHoverColor from "./modules/textHoverColor";
import typewriterMultiple from "./modules/typewriterMultiple";
import typewriterSingle from "./modules/typewriterSingle";

const directivesList: Record<string, Directive> = {
  drag,
  downDrag,
  focus,
  maskGradient,
  particle,
  sweepLight,
  textHoverColor,
  typewriterMultiple,
  typewriterSingle,
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key]);
    });
  },
};

const setupDirective = (app: App) => {
  app.use(directives);
};

export { setupDirective };
