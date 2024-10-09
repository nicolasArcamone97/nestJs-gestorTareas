import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user/user.service';
import { GoogleUserDto } from '../dtos/googleUser.dto';
import { PayloadInterface } from '../strategies/payload.interface';

@Injectable()
export class AuthgoogleService {

    constructor(private readonly jwtService:JwtService,
                private readonly usuarioService:UserService){}
    


     // Nuevo método para manejar el login de Google
     async loginGoogle(user: any) {
        const payload: PayloadInterface = { id: user.id, email: user.email };

        // Generar el JWT para el usuario autenticado por Google
        const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        
        return { access_token, refresh_token };
    }


    async validateGoogleUser(googleUser: GoogleUserDto) {
        const user = await this.usuarioService.findOneByEmail(googleUser.email);
        
        

        if (!user) {
            return await this.usuarioService.createGoogle({
                nombre: googleUser.nombre,
                email: googleUser.email,
                profileImagen: googleUser.profileImagen || "",  // Maneja la imagen si no existe
            });
        }
    
        return user;
    }

}
