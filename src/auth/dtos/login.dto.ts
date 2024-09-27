import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim()) //elimina espacios adicionales
    password: string;
  }