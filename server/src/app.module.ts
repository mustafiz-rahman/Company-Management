import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config/orm.config';


import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { CompanyModule } from './company/company.module';
import { TempuserService } from './tempuser/tempuser.service';
import { TempuserController } from './tempuser/tempuser.controller';
import { TempuserModule } from './tempuser/tempuser.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forRoot(Config), CompanyModule, TempuserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
