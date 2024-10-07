import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { request, Response } from 'express';
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
        console.log("User google data:",userGoogle )
        const user = await this.authGoogle.validateGoogleUser(userGoogle);

        const token = await this.authGoogle.loginGoogle(user);

        // Retorna el token como respuesta JSON
        return response.json({ access_token: token.access_token, refresh_token: token.refresh_token });
    }


}



