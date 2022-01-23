import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tempuser } from 'src/tempuser/entity/tempuser.entity';
import { TempuserModule } from 'src/tempuser/tempuser.module';
import { TempuserService } from 'src/tempuser/tempuser.service';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UserService],
    controllers:[UserController],
    exports:[UserService]

})
export class UserModule {}
