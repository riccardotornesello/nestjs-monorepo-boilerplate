import { DynamicModule } from '@nestjs/common';
import { ConfigModule as NestJSConfigModule } from '@nestjs/config';

import { configSettings } from './config-settings';

export const ConfigModule: DynamicModule = NestJSConfigModule.forRoot({
  load: [configSettings],
  isGlobal: true,
});
