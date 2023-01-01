import * as dotenv from 'dotenv';
import { Options } from '@mikro-orm/core';

dotenv.config();

const config: Options = {
  type: 'postgresql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.DATABASE_PORT || '', 10),
  user: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  dbName: process.env.DATABASE_NAME || 'postgres',
  entities: ['{apps,libs}/**/*{.entity,.view-entity}{.ts,.js}'],
  migrations: { pathTs: 'database/migrations' },
};

export default config;
