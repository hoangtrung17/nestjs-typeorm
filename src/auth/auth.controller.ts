import { Controller, Get, Post, UseGuards, Res, Req, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthUserDto } from './dto/auth-user.dto';
import { UsersService } from '../users/users.service'
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly UsersService: UsersService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        // initiates the Google OAuth2 login flow
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook-token'))
    facebookLogin(@Req() req, @Res() res) {
        // initiates the Google OAuth2 login flow
        const jwt: string = req.user.accessToken;
        const email: string = req.user.email;
        if (jwt) {
            this.UsersService.findOrCreate(req.user);
            res.redirect(process.env.CLIENT_PORT + '/login/success?accessToken=' + jwt + '&email=' + email);
        } else
            res.redirect(process.env.CLIENT_PORT + '/login/failure');
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.accessToken;
        const email: string = req.user.email;
        if (jwt) {
            this.UsersService.findOrCreate(req.user);
            res.redirect(process.env.CLIENT_PORT + '/login/success?accessToken=' + jwt + '&email=' + email);
        }
        else
            res.redirect(process.env.CLIENT_PORT + '/login/failure');
    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    facebookLoginCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.accessToken;
        const email: string = req.user.email;
        if (jwt) {
            res.redirect(process.env.CLIENT_PORT + '/login/success?accessToken=' + jwt + '&email=' + email);
        } else
            res.redirect(process.env.CLIENT_PORT + '/login/failure');
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return 'JWT is working!';
    }
}