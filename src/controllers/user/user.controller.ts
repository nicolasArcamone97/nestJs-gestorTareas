import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Tarea } from 'src/entities/tarea.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { JwtAuthGuard } from 'src/guards/JwtAuth.guard';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly usuarioService:UserService){}


    @UseGuards(JwtAuthGuard)
    @Get('/tareas/:userId')
    async obtenerTareas(@Param('userId',ParseIntPipe) userId:number): Promise<Tarea[]>{
        return this.usuarioService.obtenerTareas(userId)
    }


    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async obtenerPerfil(@Param('userId',ParseIntPipe) userId:number): Promise<Usuario>{
        return this.usuarioService.obtenerUsuario(userId)
    }


}
