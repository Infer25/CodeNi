declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_USER: string;
      NODE_HOST: string;
      NODE_PASSWORD: string;
      NODE_DATABASE: string;
      NODE_PORT: number;
    }
  }
}
export {};
