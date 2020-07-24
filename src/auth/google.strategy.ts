import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService, Provider } from "./auth.service";
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.G_CLIENT_ID, 
            clientSecret: process.env.G_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/auth/google/callback',
            scope: ['email','profile']
        })
    }


    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          picture: photos[0].value,
          accessToken
        }
        done(null, user);
      }

}