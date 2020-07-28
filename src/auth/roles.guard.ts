import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service'


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly userService: UsersService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (!request.query.access_token)
      throw new ForbiddenException('This access_token is not allow empty');
    const doc = await this.userService.findByParam({ token: request.query.access_token });
    if (!doc) {
      throw new ForbiddenException('This access_token not match any session');
    }
    return true;
  }
}