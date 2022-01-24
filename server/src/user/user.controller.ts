import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserService } from './user.service';
import { SigninDto } from './dto/signin.dto';
import { Request,Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';



@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserController {
    constructor(private userService:UserService,private jwtService: JwtService){}

    @Post('/signin')
    async signin(@Body() body:SigninDto , @Res({passthrough:true}) response:Response){
        const user = await this.userService.signin(body.email,body.password);

        const jwt = await this.jwtService.signAsync({id:user.id})
        response.cookie('jwt',jwt,{httpOnly:true});
        return user;
    }
   
    @Get('/profile')
    async signinedUser(@Req() request:Request){
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        const id =data['id'];
        return this.userService.findUser(parseInt(id));
    }
  
   
    @Get('/alluser')
    async allUser(){
        return this.userService.getAllUser();
    }
    
    @Get('/profile/:id')
  
    async userProfile(@Param('id') id:string){
        return this.userService.findUser(parseInt(id));

    }
    
    

    @Patch('edit/:id')
    async updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
        return await this.userService.updateUserInfo(parseInt(id),body);
    }

    @Post('/logout')
    async logout(@Res({passthrough:true}) response:Response){

        response.clearCookie('jwt');

        return 'Success!'

    }

}
