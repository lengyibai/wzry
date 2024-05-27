/** @description 递归设置可选类型 */
declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** @description 泛型组件实例类型 */
declare type GenericComponentInstanceType<D extends (...p: any[]) => any> =
  //组件通用类型
  import("vue").ComponentPublicInstance &
    //defineExpose暴露的数据类型
    Parameters<NonNullable<NonNullable<ReturnType<D>["__ctx"]>["expose"]>>[0];
