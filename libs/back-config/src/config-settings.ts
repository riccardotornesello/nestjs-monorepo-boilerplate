export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AuthConfig {
  tokenTtl: number;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

export interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  ssl: boolean;
  tls: boolean;
  senderEmail: string;
  senderName: string | null;
}

export interface AppConfig {
  frontendBaseUrl: string;
}

export interface Config {
  database: DatabaseConfig;
  auth: AuthConfig;
  redis: RedisConfig;
  mail: MailConfig;
  app: AppConfig;
}

export const configSettings = (): Config => ({
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'postgres',
  },
  auth: {
    tokenTtl: 60 * 60 * 24, // 1 day
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '', 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.MAIL_PORT || '', 10) || 2525,
    user: process.env.MAIL_USER || 'user',
    pass: process.env.MAIL_PASS || 'pass',
    ssl: process.env.MAIL_SSL === 'true' || false,
    tls: process.env.MAIL_TLS === 'true' || false,
    senderEmail:
      process.env.MAIL_SENDER_EMAIL || process.env.MAIL_USER || 'user',
    senderName: process.env.MAIL_SENDER_NAME || null,
  },
  app: {
    frontendBaseUrl: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',
  },
});
