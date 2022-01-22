import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private repo: Repository<Company>) {}

  createCompany(
    companyName: string,
    companyEmail: string,
    companyAddress: string,
    companyZipCode: number,
    commpanyPhoneNumber: string,
    establishment: string,
    remarks: string,
  ) {
    const companyInfo = this.repo.create({
      companyName,
      companyEmail,
      companyAddress,
      companyZipCode,
      commpanyPhoneNumber,
      establishment,
      remarks,
    });
    return this.repo.save(companyInfo);
  }

  getAllCompany() {
    return this.repo.find();
  }

  getCompany(companyId: number) {
    return this.repo.findOne(companyId);
  }

  async updateCompanyInfo(id: number, atter: Partial<Company>) {
    const company = await this.getCompany(id);
    if (!company) {
      throw new Error('Company not found');
    }
    Object.assign(company, atter);
    return this.repo.save(company);
  }

  async companyname() {
    const name = await this.repo
      .createQueryBuilder()
      .select('Company.companyId')
      .addSelect('Company.companyName')
      .getMany();
    return name;
  }
}
