declare global {
  /**
   * The environment variables for this app.
   */
  interface AppEnv {
    APP_NAME: string;
    [k: string]: unknown;
  }
}

export {};
