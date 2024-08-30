import { ColorEnum } from "src/enums/color.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tarea')
export class Tarea {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    titulo:String;

    @Column()
    descripcion:String;

    @CreateDateColumn()
    fechaCreacion: Date

    @Column({type:'enum', enum:ColorEnum})
    color:ColorEnum


}