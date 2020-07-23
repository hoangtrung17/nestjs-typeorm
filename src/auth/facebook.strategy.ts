import FacebookTokenStrategy from "passport-facebook-token";
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { use } from "passport";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class FacebookStrategy {
    constructor(
        private readonly userService: UsersService,
    ) {
        this.init();
    }
    init() {
        use('facebook', new FacebookTokenStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
        }, async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: any,
        ) => {
            const user = await this.userService.findOrCreate(
                profile
            )
            return done(null, user);
        },
        ));
    }
}