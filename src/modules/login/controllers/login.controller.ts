import { Controller, Post, UseGuards, Body, Res, Req, Get } from '@nestjs/common';
import { UserDTO } from '@DTO/User.dto';
import { AuthService } from '@modules/auth/services/auth/auth.service';
import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from '@modules/auth/guards/jwt-authentication.guard';

@Controller('login')
export class LoginController {

    constructor(
        private readonly authService: AuthService
    ) { }


    @UseGuards(LocalAuthGuard)
    @Post('log-in')
    async login(@Req() req, @Res() response: Response) {
      const {user} = req;
 
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
       
        return response.send(user);
    

  
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() req, @Res() response: Response) {
      response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
      return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() req) {
      const user = req.user;
      user.password = undefined;
      return user;
    }

    @Post('sign-up')
    async register(@Body() userDTO: UserDTO) {
      const responseSignUp = await this.authService.signUpUser(userDTO);
      return responseSignUp;
    }


 
}