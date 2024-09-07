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

dotenv.config();
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig),
            TypeOrmModule.forFeature([Tarea,Usuario]),
            ConfigModule.forRoot({
              isGlobal: true, // Para que el módulo de configuración sea global
            }),
            JwtModule.registerAsync({
              imports: [ConfigModule],
              inject: [ConfigService],
              useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '40s' },
              }),
            }),
  ],
  controllers: [AppController, TareaController, AuthController, UserController],
  providers: [AppService, TareaService,  AuthService, UserService],
})
export class AppModule {}
