import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { Tempuser } from './entity/tempuser.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TempuserService {
  constructor(
    @InjectRepository(Tempuser) private repo: Repository<Tempuser>,
    private mailservice: MailerService,
    private jwtService: JwtService,
    private userSerVice:UserService
  ) {}


  //creating temporary user and send mail
  async createTempuser(email: string, companyName: string, role: string) {
    const token = Math.random().toString(20).substring(2, 12);
    const tempPass = Math.random().toString(6).substring(2, 8);
    const password = await bcrypt.hash(tempPass, 12);

    //const check = await this.repo.find({ email });

    const tempuser = this.repo.create({
      email,
      token,
      companyName,
      password,
      role,
    });
    this.mailCreation(email, companyName, token, tempPass);
    return this.repo.save(tempuser);
  }

  //authenticating temporary user
  async temoUserAuth(token: string, password: string) {
    const tempuser = await this.repo.findOne({ token });

    if (!tempuser) {
      throw new BadRequestException('token not match');
    }
    if (!(await bcrypt.compare(password, tempuser.password))) {
      throw new BadRequestException('Password does not match');
    }

    return tempuser;
  }
  //getting tempuser info

  async getTempuser(id:number){
    return this.repo.findOne(id);
  }


  //sending mail
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
