import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";



export class RegisterDto {
    @IsString()
    @MinLength(1)
    nombre: string;
  
    @IsEmail()
    email: string;
  
    @MinLength(4)
    @Transform(({ value }) => value.trim()) //le saca los espacios 
    password: string;
}