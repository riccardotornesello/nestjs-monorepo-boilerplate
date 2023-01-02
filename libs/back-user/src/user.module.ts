import { Module } from '@nestjs/common';
import { User } from './entities';
import { UserService } from './user.service';
import { DatabaseFeatureModule } from '@nestjs-monorepo-boilerplate/back-database';

@Module({
  imports: [DatabaseFeatureModule([User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
