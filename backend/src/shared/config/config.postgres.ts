import { config } from 'dotenv';
config();
export const db = {
  user: process.env.NODE_USER ?? '',
  host: process.env.NODE_HOST ?? '',
  password: process.env.NODE_PASSWORD ?? '',
  database: process.env.NODE_DATABASE ?? '',
  port: process.env.NODE_PORT || 3001
};
