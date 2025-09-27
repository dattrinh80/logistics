import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'logistics',
  password: process.env.DB_PASSWORD ?? 'logistics',
  name: process.env.DB_NAME ?? 'logistics',
  logging: (process.env.DB_LOGGING ?? 'false') === 'true',
  ssl: (process.env.DB_SSL ?? 'false') === 'true',
}));
