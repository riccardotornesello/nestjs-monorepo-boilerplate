import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@nestjs-monorepo-boilerplate/back-database';
import { Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>
  ) {}

  async getByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      username,
    });
  }

  async createOne(userData: RequiredEntityData<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    await this.userRepository.persistAndFlush(user);
    return user;
  }
}
