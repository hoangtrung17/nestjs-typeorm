import { Inject } from '@nestjs/common';
import FacebookTokenStrategy from 'passport-facebook-token';
import { PassportStrategy} from '@nestjs/passport';
import { AuthService, Provider } from './auth.service';

export class FacebookStrategy extends PassportStrategy(FacebookTokenStrategy, 'facebook-token') {
    constructor(
        @Inject(AuthService) private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:8080/auth/facebook/callback',
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done) {
        // find or create user using authService
        // return user or throw exception
        const {emails } = profile
        const user = {
            email: emails[0].value,
            // firstName: name.givenName,
            // lastName: name.familyName,
            // picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }
}