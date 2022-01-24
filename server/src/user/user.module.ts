import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtGuard } from 'src/gurds/jwt.guard';
import { JwtStrategy } from 'src/gurds/jwt.strategy';


@Module({
    imports:[TypeOrmModule.forFeature([User]),
    PassportModule.register({
        defaultStrategy:'jwt'
    }),
    JwtModule.register({
        secret:'secretKey',
        signOptions: { expiresIn: '1d' },
      }),
      
],
    providers:[UserService,JwtGuard,JwtStrategy],
    controllers:[UserController],
    exports:[UserService]

})
export class UserModule {}
