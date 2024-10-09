import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { request, response, Response } from 'express';
import { RegisterDto } from 'src/auth/dtos/register-user.dto';

import { TokenDto } from 'src/auth/dtos/token.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { AuthgoogleService } from '../services/authgoogle.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService,
                private readonly authGoogle:AuthgoogleService
    ) {}

    // @UsePipes(new ValidationPipe())  // Aplica validación automática de los dto
    @Post("register")
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
      this.authService.register(registerDto);
      return res.status(HttpStatus.CREATED).json({ message: 'Usuario registrado' });
    }
    
    
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() loginDTO: LoginDto, @Res() res: Response) {
      const tokens = await this.authService.login(loginDTO);
      return res.status(HttpStatus.OK).json(tokens);
  }


    @Post('refresh')
    refresh(@Body() dto:TokenDto){
      return this.authService.refresh(dto)
    }
    
    @UseGuards(GoogleAuthGuard)
    @Get("google/login")
    googleLogin(): string {
      return "Redirect to Google login";
    }

    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    async googleCallback(@Req() request, @Res() response) {
        const userGoogle = request.user;
        const user = await this.authGoogle.validateGoogleUser(userGoogle);

        const tokens = await this.authGoogle.loginGoogle(user);
        
        response.redirect(`http://localstore:4200/home?id=${user.id}`)
      
    }



    


}



