import { Injectable, CanActivate, ExecutionContext, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service'
import { access } from 'fs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly User: UsersService
  ) {
  }
  canActivate(
    context: ExecutionContext
  ): boolean {
    let agrs = context.getArgs();
    if (agrs[0].query && agrs[0].headers.access_token) {
      this.User.findByParam({ token: agrs[0].headers.access_token }).then((user) => {
        if (user)
          return true;
        else
          return false;
      })
    }
    else
      return false;
  }
}
