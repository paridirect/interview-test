import { inject, provide, type InjectionKey } from 'vue';

export const provideSingleContext = <T>(context: InjectionKey<T> | string, factory: () => T) => {
  const injected = inject<T>(context);
  if (injected) return injected;

  const composable = factory();

  provide<T>(context, composable);

  return composable;
};
