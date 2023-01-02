import { Entity, LoadStrategy, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '@nestjs-monorepo-boilerplate/back-database';
import { User } from '@nestjs-monorepo-boilerplate/back-user';

@Entity()
export class AuthToken extends BaseEntity {
  @Property()
  tokenHash!: string;

  @ManyToOne({
    entity: () => User,
    strategy: LoadStrategy.JOINED,
    eager: true,
  })
  user!: User;
}
