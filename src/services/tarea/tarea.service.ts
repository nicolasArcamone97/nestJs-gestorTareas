import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TareaDTO } from 'src/dtos/tarea.dto';
import { Tarea } from 'src/entities/tarea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TareaService {

    constructor(@InjectRepository(Tarea) private readonly  tareaRepository:Repository<Tarea>){}



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





}
