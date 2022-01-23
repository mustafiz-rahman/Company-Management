import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/orm.config';
import { JwtModule } from '@nestjs/jwt';
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';
import { TempuserService } from './tempuser/tempuser.service';
import { TempuserController } from './tempuser/tempuser.controller';
import { TempuserModule } from './tempuser/tempuser.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [TypeOrmModule.forRoot(Config), CompanyModule, TempuserModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
