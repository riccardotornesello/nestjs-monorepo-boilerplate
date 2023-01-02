import { Injectable } from '@nestjs/common';
import { User } from '@nestjs-monorepo-boilerplate/back-user';
import { AuthToken } from './entities';
import { InjectRepository } from '@nestjs-monorepo-boilerplate/back-database';
import { EntityRepository } from '@mikro-orm/core';
import { generateSha } from './utils';
import {
  InvalidTokenException,
  TokenExpiredException,
} from '@nestjs-monorepo-boilerplate/back-exceptions';
import * as moment from 'moment';
import { ConfigService } from '@nestjs-monorepo-boilerplate/back-config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthToken)
    private readonly authTokenRepository: EntityRepository<AuthToken>,
    private readonly configService: ConfigService
  ) {}

  /********************************
   * Token
   ********************************/
  async getUserFromToken(token: string): Promise<User> {
    const authToken = await this.authTokenRepository.findOne({
      tokenHash: generateSha(token),
    });

    if (!authToken) {
      throw new InvalidTokenException();
    }

    if (
      moment(authToken.createdAt).add(
        this.configService.get('auth.tokenTtl'),
        's'
      ) < moment()
    ) {
      throw new TokenExpiredException();
    }

    return authToken.user;
  }
}
