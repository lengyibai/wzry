import type { Directive, App } from "vue";

const modules = import.meta.glob("./modules/*.ts", { eager: true }) as Record<
  string,
  { default: Directive }
>;

function setupDirective(app: App) {
  for (const key in modules) {
    const name = key.slice(10, -3);
    app.directive(name, modules[key].default);
  }
}

export { setupDirective };
