import { Module } from '@nestjs/common';
import { DatabaseFeatureModule } from '@nestjs-monorepo-boilerplate/back-database';
import { AuthService } from './auth.service';
import { AuthToken } from './entities/auth-token.entity';
import { EmailVerification } from './entities/email-verification.entity';
import { MailModule } from '@nestjs-monorepo-boilerplate/back-mail';
import { ConfigModule } from '@nestjs-monorepo-boilerplate/back-config';

@Module({
  imports: [
    DatabaseFeatureModule([AuthToken, EmailVerification]),
    MailModule,
    ConfigModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
