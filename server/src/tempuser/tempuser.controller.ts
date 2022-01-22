import { Body, Controller, Post,Param } from '@nestjs/common';
import { TempuserService } from './tempuser.service';
import { CreateTempuserDto } from './dto/create-tempuser.dto';
import { GetTempuserDto } from './dto/get-tempuser.dto';

@Controller()
export class TempuserController {
    constructor(private teampuserservice:TempuserService){}


    @Post('/mail')
    async sendMail(@Body() body:CreateTempuserDto){
        
        return this.teampuserservice.createTempuser(body.email,body.company,body.role);
    }
    @Post('/tempuser/:token')
    async getTempuser(@Param('token') token:string,@Body() body:GetTempuserDto){

       return await this.teampuserservice.temoUserLogin(token,body.password);

    }
}
