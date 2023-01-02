import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
  UserPermission,
  UserRole,
} from '@nestjs-monorepo-boilerplate/constants';
import type { PermissionFunctionOptions } from '../guards';
import { AuthGuard, RolesGuard } from '../guards';
import { User } from '@nestjs-monorepo-boilerplate/back-user';

export type AuthOptions = {
  roles?: UserRole[];
  permission?: UserPermission;
  permissionFunction?: (
    user: User,
    options: Partial<PermissionFunctionOptions>
  ) => boolean;
};

export function Auth({
  roles,
  permission,
  permissionFunction,
}: Partial<AuthOptions>): MethodDecorator {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('permission', permission),
    SetMetadata('permissionFunction', permissionFunction),
    UseGuards(AuthGuard, RolesGuard)
  );
}
