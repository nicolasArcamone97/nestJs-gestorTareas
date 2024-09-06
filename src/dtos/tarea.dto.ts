import { IsString, MinLength } from "class-validator";
import { ColorEnum } from "src/enums/color.enum";

export class TareaDTO {

    id:number;

    @IsString()
    @MinLength(3)
    titulo:String;

    @IsString()
    @MinLength(8)
    descripcion:String

    fechaCreacion: Date

    color: ColorEnum
}