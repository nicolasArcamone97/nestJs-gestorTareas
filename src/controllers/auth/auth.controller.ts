import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { request, Response } from 'express';
import { RegisterDto } from 'src/dtos/register-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())  // Aplica validación automática de los dto
    @Post("register")
    async register(@Body() registerDto: RegisterDto, @Res() res:Response) {
      await this.authService.register(registerDto);
      return res.status(HttpStatus.CREATED).json({message:'Usuario registrado'})
    }
    
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() loginDTO:LoginDto) {
      return this.authService.login(loginDTO)
    }



}



 // login con httpOnly
//  @HttpCode(HttpStatus.OK)
//  @Post("login")
//  async login(@Body() loginDto: LoginDto, @Res() res: Response) {

   // obtener token
  //  const token = await this.authService.login(loginDto);

   // obtener solo email del login
  //  const { email } = loginDto

   // Convertir el objeto a string antes de guardarlo en la cookie
  //  const cookieValue = JSON.stringify({ token, email});

   // establecer y configurar una cookie
//    res.cookie('token',cookieValue, {
//      httpOnly:true,
//      sameSite: 'strict',
//    })
         
//    return res.json({message: 'Login correcto'})
//  }
