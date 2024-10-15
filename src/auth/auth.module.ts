import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'

import { AuthService } from '../auth/services/auth.service';
import { AuthController } from '../auth/controllers/auth.controller';
import { UserService } from '../services/user/user.service';
import { Usuario } from '../entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import googleOauthConfig from 'src/config/google-oauth.config';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([ Usuario]),
    ConfigModule.forFeature(googleOauthConfig),
    PassportModule.register({
      defaultStrategy: 'jwt',  // Registra la estrategia 'jwt'
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Para que el módulo de configuración esté disponible globalmente
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),  // Accede a la variable JWT_SECRET del .env
      }),
    }),
   
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy], // Registra los servicios y la estrategia JWT
  exports:[PassportModule,JwtModule]
})
export class AuthModule {
}
