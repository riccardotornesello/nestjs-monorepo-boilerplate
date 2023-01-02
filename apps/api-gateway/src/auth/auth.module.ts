import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseFeatureModule } from '@nestjs-monorepo-boilerplate/back-database';
import { AuthToken } from './entities';

@Module({
  imports: [DatabaseFeatureModule([AuthToken])],
  providers: [AuthService],
})
export class AuthModule {}
