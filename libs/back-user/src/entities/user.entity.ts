import { Entity, Enum, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '@nestjs-monorepo-boilerplate/back-database';
import {
  UserPermission,
  UserRole,
} from '@nestjs-monorepo-boilerplate/constants';

@Entity()
export class User extends BaseEntity {
  /********************************
   * Properties
   ********************************/
  @Property({
    unique: true,
  })
  username!: string;

  @Property({
    unique: true,
  })
  email!: string;

  @Property()
  @Exclude()
  passwordHash!: string;

  @Property({ default: true })
  isActive!: boolean;

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role!: UserRole;

  @Enum({ items: () => UserPermission, array: true, default: [] })
  permissions!: UserPermission[];

  /********************************
   * Methods
   ********************************/
  hasRoleIn(roles: UserRole[]): boolean {
    return roles.includes(this.role);
  }

  hasPermission(permission: UserPermission): boolean {
    return this.permissions.includes(permission);
  }
}
