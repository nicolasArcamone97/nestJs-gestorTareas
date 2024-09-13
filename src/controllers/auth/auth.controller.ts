import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RegisterDto } from 'src/dtos/create-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())  // Aplica validación automática
    @Post("register")
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
  
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }


}
