import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService,
                private readonly configService:ConfigService){}
  
    async canActivate(context: ExecutionContext):Promise<boolean>{
      // El objeto context proporciona información
      // sobre la solicitud entrante y el entorno de ejecución.
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get<string>('JWT_SECRET')
        });
        request.user = payload;
      } catch (error) {
        throw new UnauthorizedException();
      }
  
      return true
  }


  private extractTokenFromHeader(request: Request) {
    const authHeader = request.headers['authorization'] || '';
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
}

}
