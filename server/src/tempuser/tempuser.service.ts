import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { Tempuser } from './entity/tempuser.entity';

@Injectable()
export class TempuserService {
  constructor(
    @InjectRepository(Tempuser) private repo: Repository<Tempuser>,
    private mailservice: MailerService,
  ) {}

  async createTempuser(email: string, companyName: string,role:string) {
    const token = Math.random().toString(20).substring(2, 12);
    const password = Math.random().toString(6).substring(2, 8);

    const check = await this.repo.find({ email });

    
      const tempuser = await this.repo.create({
        email,
        token,
        companyName,
        password,
        role
      });
      this.mailCreation(email,companyName, token, password);
      return this.repo.save(tempuser);
    
    
      
    
  }

  async mailCreation(
    email: string,
    companyName: string,
    token: string,
    password: string,
  ) {
    const url = `http://localhost:3001/${token}`;

    await this.mailservice
      .sendMail({
        to: email,
        from: 'mustafiz.jbc@gmail.com',
        subject: 'Account invitation',
        html: `<p>Greetings from ${companyName},<br>Please click the link: ${url} to register.
            <br>Use the password to start the registration process<br>Password: ${password}</p>`,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
