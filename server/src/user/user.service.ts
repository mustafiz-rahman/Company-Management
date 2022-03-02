import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/models/role.enum';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async signUp(
    email: string,
    companyName: string,
    role: Role,
    passsword: string,
    name: string,
    depertment: string,
    zipCode: number,
    address: string,
    phoneNumber: number,
    dob: string,
    remarks: string,
  ) {
    const password = await bcrypt.hash(passsword, 12);
    const user = this.repo.create({
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
      remarks,
    });
    return await this.repo.save(user);
  }

  async signin(email: string, password: string) {
    const user = this.repo.findOne({ email });
    if (!user) {
      throw new BadRequestException('User does not exists');
    }
    if (!(await bcrypt.compare(password, (await user).password))) {
      throw new BadRequestException('Password does not match');
    }

    return user;
  }

  async findUser(id: number) {
    return await this.repo.findOne(id);
  }

  async allUserByCompany(companyName: string) {
    return await this.repo
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.companyName = :companyName', { companyName: companyName })
      .getMany();
  }

  async getAllUser() {
    return await this.repo.find();
  }

  async updateUserInfo(id: number, atter: Partial<User>) {
    const user = await this.findUser(id);
    if (!user) {
      throw new Error('Company not found');
    }
    Object.assign(user, atter);
    return this.repo.save(user);
  }
}
