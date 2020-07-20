import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import {AuthUserDto} from './dto/auth-user.dto'

export enum Provider {
  GOOGLE = 'google'
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userInfo: AuthUserDto) {
    const payload = { username: userInfo.username, sub: userInfo.password };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // You can add some registration logic here, 
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider
      }

      const jwt: string = sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
      return jwt;
    }
    catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}