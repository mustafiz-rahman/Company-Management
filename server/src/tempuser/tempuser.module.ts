import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempuserController } from './tempuser.controller';
import { TempuserService } from './tempuser.service';
import { Tempuser } from './entity/tempuser.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';


//import { MailService } from './mail.service';

@Module({

    imports:[TypeOrmModule.forFeature([Tempuser]),
     MailerModule.forRoot({
        transport:{
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:'mustafiz.jbc@gmail.com',
                pass:'Mustafiz@cecsiub'
            }
        },
        defaults: {
            from: '"No Reply" <mustafiz.jbc@gmail.com>',
          }
    }),
    JwtModule.register({
        secret:jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }),
],
    controllers:[TempuserController],
    providers:[TempuserService]

})
export class TempuserModule {}
