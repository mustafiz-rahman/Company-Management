import {
  Body,
  Controller,
  Post,
  Param,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TempuserService } from './tempuser.service';
import { CreateTempuserDto } from './dto/create-tempuser.dto';
import { GetTempuserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class TempuserController {
  constructor(
    private teampuserservice: TempuserService,
    private userService: UserService,
  ) {}

  @Post('/mail')
  async sendMail(@Body() body: CreateTempuserDto) {
    return this.teampuserservice.createTempuser(
      body.email,
      body.company,
      body.role,
    );
  }
  @Post('/tempuser/:token')
  async tempuserLogin(
    @Param('token') token: string,
    @Body() body: GetTempuserDto,
  ) {
    const tempuser = await this.teampuserservice.temoUserAuth(
      token,
      body.password,
    );
    if (!tempuser) {
      throw new BadRequestException('password doesnt match');
    }

    const user = await this.userService.signUp(
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
      body.remarks,
    );

    return user;
  }
}
