import { Injectable, Inject } from '@nestjs/common';
import { use } from 'passport';
import * as dotenv from 'dotenv';
dotenv.config();

import * as FacebookTokenStrategy from 'passport-facebook-token';

@Injectable()
export class FacebookStrategy {
    constructor() {
        this.init();
    }

    init() {
        use(
            new FacebookTokenStrategy(
                {
                    clientID: process.env.FACEBOOK_APP_ID,
                    clientSecret: process.env.FACEBOOK_APP_SECRET,
                    fbGraphVersion: 'v3.0',
                    profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
                },
                async (
                    accessToken: string,
                    refreshToken: string,
                    profile: any,
                    done: any,
                ) => {
                    const user = profile;
                    user.accessToken = accessToken;
                    user.email = profile.emails[0].value;
                    user.facebookId = profile.id;
                    return done(null, user);
                },
            ),
        );
    }
}