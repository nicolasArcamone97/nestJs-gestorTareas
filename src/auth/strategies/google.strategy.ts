import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-google-oauth20"
import { VerifiedCallback } from "passport-jwt";
import googleOauthConfig from "src/config/google-oauth.config";
import { AuthService } from "../services/auth.service";




@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(@Inject(googleOauthConfig.KEY) private googleConfig:ConfigType<typeof googleOauthConfig>,
                private readonly authService:AuthService){
   
        super({
            clientID:googleConfig.clientID,
            clientSecret:googleConfig.clientSecret,
            callbackURL:googleConfig.callbackURL,
            scope:["email","profile"],
        })
    }


    async validate(accessToken:string, refreshToken:string, profile:any,done:VerifiedCallback){
        const user = await this.authService.validateGoogleUser({
            nombre:profile.displayName,
            email:profile.emails[0].value,
            password:""
        })
        done(null,user)
    }



}