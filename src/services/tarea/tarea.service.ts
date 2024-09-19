import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TareaDTO } from 'src/dtos/tarea.dto';
import { Tarea } from 'src/entities/tarea.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TareaService {

    constructor(@InjectRepository(Tarea) private readonly  tareaRepository:Repository<Tarea>,
                @InjectRepository(Usuario) private readonly usuarioRepository:Repository<Usuario>){}



    public async getTareas():Promise<Tarea[]>{
        const tareas: Tarea[] = await this.tareaRepository.find()
        return tareas
    }

    public async getTarea(idTarea:number):Promise<TareaDTO> {
        const tarea: TareaDTO = await this.tareaRepository.findOne({where: {id:idTarea}}) 
        
        if(!tarea){
            throw new NotFoundException("El id buscado no existe")
        }

        return tarea
    }

    public async crearTarea(tarea:TareaDTO):Promise<TareaDTO>{
        const nuevaTarea:TareaDTO = await this.tareaRepository.save(tarea)

        return nuevaTarea
    }

    
    public async nuevaTarea(createTareaDto: TareaDTO, idUser: number): Promise<Tarea> {
        // Verifica si el usuario existe
        const userExistente: Usuario = await this.usuarioRepository.findOne({ where: { id: idUser } });

        if (!userExistente) {
            throw new BadRequestException('El usuario no existe en la base de datos');
        }

        // Crea la nueva tarea con los datos recibidos
        const nuevaTarea = this.tareaRepository.create({
            ...createTareaDto, // Asigna los datos del DTO a la nueva tarea
            user: userExistente // Asigna el usuario existente a la tarea
        });

        // Guarda la nueva tarea en la base de datos
        return await this.tareaRepository.save(nuevaTarea);
    }


    


}

