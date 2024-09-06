import { Entity, OneToMany } from "typeorm";
import { Tarea } from "./tarea.entity";


@Entity()
export class Usuario {

    id: number

    nombre: string

    email:string

    password:string

    @OneToMany(() => Tarea, tarea => tarea.user)
    tareas: Tarea[]

}