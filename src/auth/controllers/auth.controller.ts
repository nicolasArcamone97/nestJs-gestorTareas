import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { request, Response } from 'express';
import { RegisterDto } from 'src/auth/dtos/register-user.dto';

import { TokenDto } from 'src/auth/dtos/token.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // @UsePipes(new ValidationPipe())  // Aplica validación automática de los dto
    @Post("register")
    register(@Body() registerDto: RegisterDto, @Res() res:Response){
      this.authService.register(registerDto);
      return res.status(HttpStatus.CREATED).json({message:'Usuario registrado'})
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
        // `request.user` debería contener la información del usuario de Google
        const userGoogle = request.user;

        // Lógica para registrar al usuario si no existe
        const user = await this.authService.validateGoogleUser({
            nombre: userGoogle.nombre, // Asegúrate de que 'nombre' esté en el perfil
            email: userGoogle.email,
            password: "", // O puedes omitir este campo si no es necesario
        });

        // Puedes generar un token JWT o hacer otra cosa con el usuario
        const token = await this.authService.loginGoogle({ email: user.email });

        // Redirigir a la aplicación frontend con el token
        response.redirect(`http://localhost:4200?token=${token.access_token}`);
    }

}



