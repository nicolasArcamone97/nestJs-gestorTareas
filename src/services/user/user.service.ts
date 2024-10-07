import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleUserDto } from 'src/auth/dtos/googleUser.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Tarea } from 'src/entities/tarea.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(Usuario) private readonly usuarioRepository:Repository<Usuario>){}



    public async create(createUserDto: CreateUserDto) {
        return await this.usuarioRepository.save(createUserDto);
    }
    

    public async createGoogle(googleUser: GoogleUserDto) {
        return await this.usuarioRepository.save(googleUser)
    }



    public async obtenerUsuario(userId:number): Promise<Usuario>{
        return await this.usuarioRepository.findOne({where: {id:userId}})
    }

    public async findOneByEmail(email: string):Promise<Usuario> {
        return await this.usuarioRepository.findOneBy({ email });
    }
    

    public async obtenerTareas(userId:number):Promise<Tarea[]>{
        const userExistente: Usuario = await this.usuarioRepository.findOne({where:{id:userId},relations:['tareas']}) 

        if(!userExistente){
            throw new BadRequestException('El usuario no existe')
        }

        return userExistente.tareas
    }
    


}
