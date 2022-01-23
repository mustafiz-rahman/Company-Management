import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo:Repository<User>) {}

    async signUp(
        email:string,
        companyName:string,
        role:string,
        passsword:string,
        name:string,
        depertment:string,
        zipCode:number,
        address:string,
        phoneNumber:number,
        dob:string,
        remarks:string
        ){
            const password = await bcrypt.hash(passsword,12);
        const user = await this.repo.create({
            email,
            companyName,
            role,
            password,
            name,
            depertment,
            zipCode,
            address,
            phoneNumber,
            dob,
            remarks
        });
        return await this.repo.save(user);

    }
}
