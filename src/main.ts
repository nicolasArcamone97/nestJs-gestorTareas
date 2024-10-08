import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, //Ignora los campos que no estan en el dto
    transform:true //convierte los tipos de datos a los especifiaciones
  }))

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Reemplaza con la URL de tu frontend
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  };

  app.enableCors(corsOptions)

  await app.listen(3000);
}
bootstrap();
