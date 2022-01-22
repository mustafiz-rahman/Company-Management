import { Body, Controller, Post } from '@nestjs/common';
import { TempuserService } from './tempuser.service';
import { CreateTempuserDto } from './dto/create-tempuser.dto';

@Controller()
export class TempuserController {
    constructor(private teampuserservice:TempuserService){}


    @Post('/mail')
    async sendMail(@Body() body:CreateTempuserDto){
        
        return this.teampuserservice.createTempuser(body.email,body.company,body.role);
    }
}
