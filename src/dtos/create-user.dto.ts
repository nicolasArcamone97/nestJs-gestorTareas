import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(1)
    nombre: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim()) //le saca los espacios 
    password: string;
}

export class CreateUserDto {
  nombre: string;
  email: string;
  password: string;
}