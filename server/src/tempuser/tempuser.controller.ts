import { Body, Controller, Post,Param, Res, Get, Req, BadRequestException } from '@nestjs/common';
import { TempuserService } from './tempuser.service';
import { CreateTempuserDto } from './dto/create-tempuser.dto';
import { GetTempuserDto } from './dto/get-tempuser.dto';
import { JwtService } from '@nestjs/jwt';
import { Request,Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller()
export class TempuserController {
    constructor(private teampuserservice:TempuserService,private jwtService: JwtService,private userService:UserService){}


    @Post('/mail')
    async sendMail(@Body() body:CreateTempuserDto){
        
        return this.teampuserservice.createTempuser(body.email,body.company,body.role);
    }
    @Post('/tempuser/:token')
    async tempuserLogin(@Param('token') token:string,@Body() body:GetTempuserDto,@Res({passthrough:true}) response:Response ){

         const tempuser= await this.teampuserservice.temoUserAuth(token,body.password);
         if(!tempuser){
             throw new BadRequestException('password doesnt match');
         }

         const user= await this.userService.signUp(
            tempuser.email,
            tempuser.companyName,
            tempuser.role,
            body.password,
            body.name,
            body.depertment,
            body.zipCode,
            body.address,
            body.phoneNumber,
            body.dob,
            body.remarks
         )

         
        // const jwt = await this.jwtService.signAsync({id:tempuser.id});
        // response.cookie('jwt',jwt,{httpOnly:true});
       return user;

    }
    // @Get('/tempuser')
    // async getTempuser(@Req() request:Request){

    //     const cookie = request.cookies['jwt'];
    //     const data = await this.jwtService.verifyAsync(cookie);
    //     const id =data['id'];

    //     return this.teampuserservice.getTempuser(parseInt(id));

    // }
}
