import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TareaDTO } from 'src/dtos/tarea.dto';
import { Tarea } from 'src/entities/tarea.entity';
import { TareaService } from 'src/services/tarea/tarea.service';

@Controller('tarea')
export class TareaController {

    constructor(private readonly tareaService:TareaService){}

    @Get()
    getTareas():Promise<Tarea[]>{
        return this.tareaService.getTareas()
    }

    
    @UseGuards(AuthGuard)
    @Get(':id')
    getTarea(@Param('id') id:number):Promise<TareaDTO>{
        return this.tareaService.getTarea(id)
    }


    @Post()
    crearTarea(@Body() tarea:TareaDTO):Promise<TareaDTO>{
        return this.tareaService.crearTarea(tarea)
    }


}
