import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserService } from './user.service';
import { SigninDto } from './dto/signin.dto';
import { Request,Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from './jwt_payload.interface';
import { JwtGuard } from 'src/gurds/jwt.guard';



@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserController {
    constructor(private userService:UserService,private jwtService: JwtService){}

    @Post('/signin')
    async signin(@Body() body:SigninDto , @Res({passthrough:true}) response:Response):Promise<{accessToken:string}>{
        const user = await this.userService.signin(body.email,body.password);
        
        const id= user.id;
        const payload:JwtPayload = {id};
        const accessToken = await this.jwtService.signAsync(payload);
        response.cookie('jwt',accessToken,{httpOnly:true})
        
        return {accessToken};
    }
    @UseGuards(JwtGuard)
    @Get('/profile')
    async signinedUser(@Req() request:Request){
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verify(cookie);
        const id =data['id'];
        return await this.userService.findUser(parseInt(id));
    }
  
    @UseGuards(JwtGuard)
    @Get('/alluser')
    async allUser(){
        return this.userService.getAllUser();
    }
    @UseGuards(JwtGuard)
    @Get('/profile/:id')
  
    async userProfile(@Param('id') id:string){
        return this.userService.findUser(parseInt(id));

    }
    
    
    @UseGuards(JwtGuard)
    @Patch('edit/:id')
    async updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){
        return await this.userService.updateUserInfo(parseInt(id),body);
    }
    @UseGuards(JwtGuard)
    @Post('/logout')
    async logout(@Res({passthrough:true}) response:Response){

        response.clearCookie('jwt');

        return 'Success!'

    }

}
