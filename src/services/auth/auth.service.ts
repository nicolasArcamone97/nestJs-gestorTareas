import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { UserService } from '../user/user.service';
import { RegisterDto } from 'src/dtos/create-user.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usuarioService:UserService,
                private readonly jwtService: JwtService) {}

    async register({nombre,email,password}:RegisterDto){
        // verifico si existe en la base de datos el mail
        const userExistente = await this.usuarioService.findOneByEmail(email)
        
        // si existe el usuario, lanzamos exepcion
        if(userExistente){
            throw new BadRequestException(`El usuario con email ${email} ya esta registrado`)
        }

        // hashear password, es encriptar una contraseña, convertir un valor en una cadena de caracteres 
        const hashedPassword = await bcryptjs.hash(password, 10);
        
        // creamos un usuario
        await this.usuarioService.create({
            nombre,
            email,
            password: hashedPassword
        })

        
        return { message: "Usuario creado con exito"};

    }


    async login({email,password}:LoginDto){
        const userExistente = await this.usuarioService.findOneByEmail(email)
        
        if (!userExistente) {
            throw new UnauthorizedException("Email invalido");
        }
        
        // comparamos los password
        const isPasswordValid = await bcryptjs.compare(password, userExistente.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }
        
        //  payload, es un objeto que contiene la información que será incluida en el token JWT
        const payload = { id: userExistente.id,
                          email: userExistente.email };

        // El método signAsync(payload) toma el payload (el objeto con el email del usuario) y lo convierte en un JWT. 
        const token = await this.jwtService.signAsync(payload);


        return {
            token: token,
            email: userExistente.email,
          };

    }


}
