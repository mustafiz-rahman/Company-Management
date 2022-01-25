import {
  Body,
  Controller,
  Post,
  Param,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { TempuserService } from './tempuser.service';
import { CreateTempuserDto } from './dto/create-tempuser.dto';
import { GetTempuserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { JwtGuard } from 'src/gurds/jwt.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { Role } from 'src/models/role.enum';
import { RolesGuard } from 'src/gurds/roles.guard';
import { Roles } from 'src/models/roles.decorator';
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class TempuserController {
  constructor(
    private teampuserservice: TempuserService,
    private userService: UserService,
  ) {}
  @Roles(Role.System,Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Post('/invite')
  async sendMail(@Body() body: CreateTempuserDto,@CurrentUser() user:User) {

    if(user.role===Role.Admin){
      return await this.teampuserservice.createTempuser(
        body.email,
        user.companyName,
        body.role,
      );

    }
    else{
      return await this.teampuserservice.createTempuser(
        body.email,
        body.company,
        body.role,
      );
    }

    
  }
  @Post('/signup/:token')
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
