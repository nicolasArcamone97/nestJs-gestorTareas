import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class GoogleUserDto {
    @IsString()
    @MinLength(1)
    nombre: string;

    @IsEmail()
    email: string;

    @IsOptional()
    profileImagen?:string;

}