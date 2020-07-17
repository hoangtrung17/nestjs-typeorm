import FacebookTokenStrategy from "passport-facebook-token";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import passport              from "passport";

@Injectable()
export class FacebookStrategy {
  constructor(
    private readonly userService: UsersService,
  ) {
    this.init();
  }
  init() {
    passport.use(
      new FacebookTokenStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          fbGraphVersion: 'v3.0',
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          const user = await this.userService.findOrCreate(
            profile,
          );
          return done(null, user);
        },
      ),
    );
  }
}