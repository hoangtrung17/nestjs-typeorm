import { Body, Controller, Get, Post, UseGuards, Res, Req, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

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

    @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    googleLoginCallback(@Req() req, @Res() res) {
        // handles the Google OAuth2 callback
        const jwt: string = req.user.jwt;
        if (jwt)
            res.redirect(process.env.CLIENT_PORT + 'login/succes/' + jwt);
        else
            res.redirect(process.env.CLIENT_PORT + 'login/failure');
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    protectedResource() {
        return 'JWT is working!';
    }
}