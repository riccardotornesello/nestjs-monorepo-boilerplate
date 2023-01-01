import { DynamicModule } from '@nestjs/common';
import {
  MikroOrmModule,
  MikroOrmModuleFeatureOptions,
} from '@mikro-orm/nestjs';

import { ConfigService } from '@nestjs-monorepo-boilerplate/back-config';

export const DatabaseModule: DynamicModule = MikroOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    dbName: configService.get('database.database'),
    user: configService.get('database.username'),
    password: configService.get('database.password'),
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    type: 'postgresql',
    autoLoadEntities: true,
  }),
});

export const DatabaseFeatureModule = (
  entities: MikroOrmModuleFeatureOptions
): DynamicModule => MikroOrmModule.forFeature(entities);
