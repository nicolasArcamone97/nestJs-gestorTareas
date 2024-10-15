import { Body, Controller,  HttpCode, HttpStatus, Post,  Res, } from '@nestjs/common';
import {Response } from 'express';
import { RegisterDto } from 'src/auth/dtos/register-user.dto';
import { TokenDto } from 'src/auth/dtos/token.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService
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
    
   
    

    


}



