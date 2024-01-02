declare global {
  interface AppEnv {
    APP_NAME: string;
    [k: string]: unknown;
  }
}

export {};
