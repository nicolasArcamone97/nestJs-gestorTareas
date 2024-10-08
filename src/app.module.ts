import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { TareaService } from './services/tarea/tarea.service';
import { TareaController } from './controllers/tarea/tarea.controller';
import * as dotenv from 'dotenv'
import { Tarea } from './entities/tarea.entity';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { Usuario } from './entities/usuario.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthgoogleService } from './auth/services/authgoogle.service';



dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Tarea, Usuario]),
    ConfigModule.forRoot({
      isGlobal: true, // Para que el módulo de configuración esté disponible globalmente
    }),
    AuthModule
  ],
  controllers: [AppController, TareaController,UserController],
  providers: [AppService, TareaService,  UserService, AuthgoogleService], 
})
export class AppModule {}
