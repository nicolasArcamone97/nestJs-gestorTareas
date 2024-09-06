import { ColorEnum } from "src/enums/color.enum";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";


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

    @ManyToOne(() => Usuario, usuario => usuario.tareas, {cascade:true})
    user: Usuario
}