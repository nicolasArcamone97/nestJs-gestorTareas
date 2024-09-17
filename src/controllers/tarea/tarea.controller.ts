import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { TareaDTO } from 'src/dtos/tarea.dto';
import { Tarea } from 'src/entities/tarea.entity';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';
import { TareaService } from 'src/services/tarea/tarea.service';

@Controller('tarea')
export class TareaController {

    constructor(private readonly tareaService:TareaService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getTareas():Promise<Tarea[]>{
        return this.tareaService.getTareas()
    }

    
    // @UseGuards(AuthGuard)
    @Get(':id')
    getTarea(@Param('id') id:number):Promise<TareaDTO>{
        return this.tareaService.getTarea(id)
    }

    // @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED) // Esto enviará un 201 Created
    @Post()
    crearTarea(@Body() tarea:TareaDTO):Promise<TareaDTO>{
        return this.tareaService.crearTarea(tarea)
    }


}
