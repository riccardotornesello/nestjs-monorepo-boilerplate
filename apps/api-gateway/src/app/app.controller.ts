import { Controller, Get } from '@nestjs/common';

import { ConfigService } from '@nestjs-monorepo-boilerplate/back-config';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
