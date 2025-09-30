import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });

dotenv.config({ path: join(process.cwd(), '.env.local'), override: true });

const useSsl = process.env.DB_SSL === 'true';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  username: process.env.DB_USER ?? 'logistics',
  password: process.env.DB_PASSWORD ?? 'logistics',
  database: process.env.DB_NAME ?? 'logistics',
  charset: 'utf8mb4_unicode_ci',
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  logging: process.env.DB_LOGGING === 'true',
  entities: ['apps/api/src/modules/**/infrastructure/persistence/typeorm/entities/*.orm-entity.ts'],
  migrations: [
    'apps/api/src/infrastructure/database/migrations/*.ts',
    'apps/api/src/modules/**/infrastructure/persistence/typeorm/migrations/*.ts',
  ],
});
