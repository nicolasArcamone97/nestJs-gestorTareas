import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Tarea } from 'src/entities/tarea.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly usuarioService:UserService){}


    @Get(':userId')
    async obtenerTareas(@Param('userId',ParseIntPipe) userId:number): Promise<Usuario>{
        return this.usuarioService.obtenerTareas(userId)
    }

}
