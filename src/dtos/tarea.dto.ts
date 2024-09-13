import { IsEnum, IsString, MinLength } from "class-validator";
import { ColorEnum } from "src/enums/color.enum";

export class TareaDTO {

    id:number;

    @IsString()
    @MinLength(3)
    titulo:string;

    @IsString()
    @MinLength(8)
    descripcion:string

    @IsEnum(ColorEnum)
    color: ColorEnum
}