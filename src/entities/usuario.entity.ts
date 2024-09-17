import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarea } from "./tarea.entity";


@Entity()
export class Usuario {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable:false})
    nombre: string

    @Column({nullable: false, unique:true})
    email:string

    @Column({nullable:false})
    password:string

    @OneToMany(() => Tarea, tarea => tarea.user)
    tareas: Tarea[]


    constructor(nombre:string, email:string, password:string){
        this.nombre = nombre
        this.email = email
        this.password = password
    }


}