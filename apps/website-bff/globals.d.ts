import 'hono';

declare module 'hono' {
  // this defined global hno types for the application
  interface Env {
    Bindings: AppEnv;
    Variables: {
      dep: Dependencies;
    };
  }
}

declare global {
  declare namespace NodeJS {
    // this defined global node types for the application
    interface ProcessEnv extends AppEnv {}
  }
}
