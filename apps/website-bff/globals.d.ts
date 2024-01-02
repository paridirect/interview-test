import 'hono';

declare module 'hono' {
  interface Env {
    Bindings: AppEnv;
  }
}

declare global {
  declare namespace NodeJS {
    interface ProcessEnv extends AppEnv {}
  }
}
