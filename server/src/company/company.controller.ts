import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Controller()
export class CompanyController {
  constructor(private companyservice: CompanyService) {}

  @Post('/companyreg')
  async companyReg(@Body() body: CreateCompanyDto) {
    const company = await this.companyservice.createCompany(
      body.companyName,
      body.companyEmail,
      body.companyAddress,
      body.companyZipCode,
      body.commpanyPhoneNumber,
      body.establishment,
      body.remarks,
    );

    return company;
  }

  @Get('/companies')
  async companies() {
    return await this.companyservice.getAllCompany();
  }

  @Get('/company/:id')
  async getCompanyInfo(@Param('id') id: string) {
    return await this.companyservice.getCompany(parseInt(id));
  }

  @Patch('/company/:id')
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
  ) {
    return await this.companyservice.updateCompanyInfo(parseInt(id), body);
  }

  @Get('/companyname')
  async getAllNames() {
    return this.companyservice.companyname();
  }
}
