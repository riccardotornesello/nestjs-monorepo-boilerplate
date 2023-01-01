import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs-monorepo-boilerplate/back-config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
