import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(@InjectRepository(Usuario) private readonly usuarioRepository:Repository<Usuario>){}



    async create(createUserDto: CreateUserDto) {
        return await this.usuarioRepository.save(createUserDto);
      }
    
    async findOneByEmail(email: string) {
        return await this.usuarioRepository.findOneBy({ email });
    }
    

}
