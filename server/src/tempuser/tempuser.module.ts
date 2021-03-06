import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempuserController } from './tempuser.controller';
import { TempuserService } from './tempuser.service';
import { Tempuser } from './entity/tempuser.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from 'src/constants/constants';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

//import { MailService } from './mail.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Tempuser]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'mustafiz.jbc@gmail.com',//put your email here
          pass: '**********',//put your email password here
        },
      },
      defaults: {
        from: '"No Reply" <mustafiz.jbc@gmail.com>',
      },
    }),
  ],
  controllers: [TempuserController],
  providers: [TempuserService],
})
export class TempuserModule {}
