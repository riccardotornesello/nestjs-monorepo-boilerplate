import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@nestjs-monorepo-boilerplate/back-database';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs-monorepo-boilerplate/back-config';
import * as moment from 'moment';

import {
  // generateBcrypt,
  generateRandomString,
  generateSha,
  // validateBcrypt,
} from './utils';
import {
  InvalidTokenException,
  TokenExpiredException,
  // UserNotFoundException,
  // EmailNotVerifiedException,
  InvalidActionException,
  RateLimitException,
} from '@nestjs-monorepo-boilerplate/back-exceptions';
import { MailService } from '@nestjs-monorepo-boilerplate/back-mail';
import { User } from '@nestjs-monorepo-boilerplate/back-user';
import { AuthToken } from './entities/auth-token.entity';
import { EmailVerification } from './entities/email-verification.entity';
// import { UserCredentialsDto, UserRegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthToken)
    private readonly authTokenRepository: EntityRepository<AuthToken>,
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: EntityRepository<EmailVerification>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService
  ) {}

  // async authenticateUser(
  //   userCredentialsDto: UserCredentialsDto
  // ): Promise<User> {
  //   const user = await this.userService.getByUsername(
  //     userCredentialsDto.username
  //   );

  //   if (!user) {
  //     throw new UserNotFoundException();
  //   }

  //   const isPasswordValid = await validateBcrypt(
  //     userCredentialsDto.password,
  //     user.passwordHash
  //   );

  //   if (!isPasswordValid) {
  //     throw new UserNotFoundException();
  //   }

  //   if (!user.emailVerification?.verifiedAt) {
  //     throw new EmailNotVerifiedException();
  //   }

  //   return user;
  // }

  async generateAuthToken(user: User): Promise<string> {
    const randomString = generateRandomString(32);

    const authToken = this.authTokenRepository.create({
      user,
      tokenHash: generateSha(randomString),
    });
    await this.authTokenRepository.persistAndFlush(authToken);

    return randomString;
  }

  // async registerUser(userRegisterDto: UserRegisterDto): Promise<User> {
  //   const userData = { ...userRegisterDto };
  //   const userPassword = userData.password;
  //   delete userData.password;

  //   const user = await this.userService.createOne({
  //     ...userData,
  //     passwordHash: generateBcrypt(userPassword),
  //   });

  //   const emailVerification = this.emailVerificationRepository.create({
  //     user,
  //   });
  //   await this.emailVerificationRepository.persistAndFlush(emailVerification);
  //   return user;
  // }

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

  async sendEmailVerification(user: User): Promise<void> {
    if (!user.emailVerification) {
      user.emailVerification = this.emailVerificationRepository.create({
        user,
      });
      await this.emailVerificationRepository.persistAndFlush(
        user.emailVerification
      );
    }

    if (user.emailVerification.verifiedAt) {
      throw new InvalidActionException();
    }

    if (
      user.emailVerification.lastSent &&
      moment(user.emailVerification.lastSent).add(60, 's') > moment()
    ) {
      throw new RateLimitException();
    }

    user.emailVerification.lastSent = new Date();
    await this.emailVerificationRepository.persistAndFlush(
      user.emailVerification
    );

    try {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Email verification',
        text: `Please verify your email by clicking on the following link: ${this.configService.get(
          'app.frontendBaseUrl'
        )}/auth/verify-email/${user.id}`,
      });
    } catch (e) {}
  }
}
