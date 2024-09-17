import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db.config';
import { TareaService } from './services/tarea/tarea.service';
import { TareaController } from './controllers/tarea/tarea.controller';
import * as dotenv from 'dotenv'
import { Tarea } from './entities/tarea.entity';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { Usuario } from './entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Tarea, Usuario]),
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
        signOptions: { expiresIn: '30s' },  // Configura el tiempo de expiración del token
      }),
    }),
  ],
  controllers: [AppController, TareaController, AuthController, UserController],
  providers: [AppService, TareaService, AuthService, UserService, JwtStrategy], // Registra los servicios y la estrategia JWT
})
export class AppModule {}
