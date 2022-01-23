import { Body, Controller, Post,Param, Res } from '@nestjs/common';
import { TempuserService } from './tempuser.service';
import { CreateTempuserDto } from './dto/create-tempuser.dto';
import { GetTempuserDto } from './dto/get-tempuser.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller()
export class TempuserController {
    constructor(private teampuserservice:TempuserService,private jwtService: JwtService){}


    @Post('/mail')
    async sendMail(@Body() body:CreateTempuserDto){
        
        return this.teampuserservice.createTempuser(body.email,body.company,body.role);
    }
    @Post('/tempuser/:token')
    async getTempuser(@Param('token') token:string,@Body() body:GetTempuserDto,@Res({passthrough:true}) response:Response ){

        const tempuser= await this.teampuserservice.temoUserLogin(token,body.password);
        const jwt = await this.jwtService.signAsync({id:tempuser.id});
        response.cookie('jwt',jwt,{httpOnly:true});
       return tempuser;

    }
}
