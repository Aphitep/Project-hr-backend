import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflextor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requireRole = this.reflextor.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requireRole.some((role) => user.roles?.includes(role));
  }
}
