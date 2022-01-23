import { Body, Controller, Post, Req } from '@nestjs/common';
import { TempuserService } from 'src/tempuser/tempuser.service';
import { UserService } from './user.service';
import { Request,Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    // @Post('/signup')
    // async signup(@Req() request:Request,@Body() Body:CreateUserDto){

        

    // }

}
