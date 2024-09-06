import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db.config';
import { TareaService } from './services/tarea/tarea.service';
import { TareaController } from './controllers/tarea/tarea.controller';
import * as dotenv from 'dotenv'
import { Tarea } from './entities/tarea.entity';
import { ServicesService } from './auth/services/services.service';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';

dotenv.config();
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig),
            TypeOrmModule.forFeature([Tarea])
  ],
  controllers: [AppController, TareaController, AuthController],
  providers: [AppService, TareaService, ServicesService, AuthService],
})
export class AppModule {}
