import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempuserController } from './tempuser.controller';
import { TempuserService } from './tempuser.service';
import { Tempuser } from './entity/tempuser.entity';
import { MailerModule } from '@nestjs-modules/mailer';


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
],
    controllers:[TempuserController],
    providers:[TempuserService]

})
export class TempuserModule {}
