import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim()) //elimina espacios adicionales
    password: string;
  }