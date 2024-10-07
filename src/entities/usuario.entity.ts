import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tarea } from "./tarea.entity";
import { profile } from "console";


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

    @Column()
    profileImagen:string

    @OneToMany(() => Tarea, tarea => tarea.user)
    tareas: Tarea[]


    constructor(nombre:string, email:string, password:string, profileImagen:string){
        this.nombre = nombre
        this.email = email
        this.password = password
        this.profileImagen = profileImagen
    }


}