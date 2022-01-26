import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { SigninDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtPayload } from '../interfaces/jwt_payload.interface';
import { JwtGuard } from 'src/gurds/jwt.guard';
import { Roles } from 'src/models/roles.decorator';
import { Role } from 'src/models/role.enum';
import { RolesGuard } from 'src/gurds/roles.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './entity/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserController {

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}



  @Post('/signin')
  async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {

    const user = await this.userService.signin(body.email, body.password);
    const { id, role } = user;
    const payload: JwtPayload = { id, role };
    const accessToken = await this.jwtService.signAsync(payload);
    response.cookie('jwt', accessToken, { httpOnly: true });

    return { accessToken };
  }


  @UseGuards(JwtGuard)
  @Get('/profile')
  async signinedUser(@CurrentUser() user: User) {
    return user;
  }


  @UseGuards(JwtGuard)
  @Patch('/profile/edit')
  async editProfile(@CurrentUser() user:User,@Body() body:UpdateUserDto){
    return await this.userService.updateUserInfo(user.id, body);
  }


  @Roles(Role.System,Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('/alluser')
  async allUser(@CurrentUser() user:User) {
      if(user.role===Role.Admin){
          return this.userService.allUserByCompany(user.companyName);
      }else{
        return this.userService.getAllUser();
      }
    
  }


  @Roles(Role.System, Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('/profile/:id')
  async userProfile(@Param('id') id: string) {
    return this.userService.findUser(parseInt(id));
  }


  @Roles(Role.System,Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Patch('/user/edit/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateUserInfo(parseInt(id), body);
  }


  @UseGuards(JwtGuard)
  @Post('/signout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return 'Success!';
  }

  
}
