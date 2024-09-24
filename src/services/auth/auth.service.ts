import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { UserService } from '../user/user.service';
import { RegisterDto } from 'src/dtos/register-user.dto';
import { LoginDto } from 'src/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from 'src/strategies/payload.interface';
import { TokenDto } from 'src/dtos/token.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usuarioService:UserService,
                private readonly jwtService: JwtService,
                private readonly userService: UserService) {}


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
        await this.userService.create({
            nombre,
            email,
            password: hashedPassword
        })

        
        return { message: "Usuario creado con exito"};

    }


    async login(loginDTO:LoginDto){
        const userExistente = await this.userService.findOneByEmail(loginDTO.email)
        
        if (!userExistente) {
            throw new UnauthorizedException("Correo electrónico o contraseña incorrectos");
        }
        
        
        // comparamos los password
        const isPasswordValid = await bcryptjs.compare(loginDTO.password, userExistente.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Correo electrónico o contraseña incorrectos");
        }
        
        //  payload, es un objeto que contiene la información que será incluida en el token JWT
        const payload: PayloadInterface = { id: userExistente.id,
                          email: userExistente.email };

        // El método signAsync(payload) toma el payload (el objeto con el email del usuario) y lo convierte en un JWT. 
        const token = await this.jwtService.signAsync(payload);

        
        return { message: 'Login exitoso', token };

    }


    async refresh(dto:TokenDto): Promise<any> {
        // decode: obtener los datos del usuario atravez del token osea decodificar el token 
        const usuario = await this.jwtService.decode(dto.token)
        const payload: PayloadInterface = {
            id: usuario["id"],
            email: usuario["email"]
        }

        const token = await this.jwtService.signAsync(payload);
        return {  message: 'Token refreshed ' , token };

    }



}
