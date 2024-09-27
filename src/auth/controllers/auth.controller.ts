import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { request, Response } from 'express';
import { RegisterDto } from 'src/auth/dtos/register-user.dto';

import { TokenDto } from 'src/auth/dtos/token.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // @UsePipes(new ValidationPipe())  // Aplica validación automática de los dto
    @Post("register")
    register(@Body() registerDto: RegisterDto, @Res() res:Response) {
      this.authService.register(registerDto);
      return res.status(HttpStatus.CREATED).json({message:'Usuario registrado'})
    }
    
    
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDTO:LoginDto) {
      return this.authService.login(loginDTO)
    }


    @Post('logout')
    logout(){
      return 'Logout'
    } 

    @Post('refresh')
    refresh(@Body() dto:TokenDto){
      return this.authService.refresh(dto)
    }

}



