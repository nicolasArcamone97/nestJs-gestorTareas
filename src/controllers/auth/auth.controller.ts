import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { request, Response } from 'express';
import { RegisterDto } from 'src/dtos/register-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from 'src/services/auth/auth.service';
import { TokenDto } from 'src/dtos/token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    // @UsePipes(new ValidationPipe())  // Aplica validación automática de los dto
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

    @Post('refresh')
    async refresh(@Body() dto:TokenDto){
      return this.authService.refresh(dto)
    }

}



