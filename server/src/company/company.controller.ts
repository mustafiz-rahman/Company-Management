import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/gurds/jwt.guard';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Controller()
export class CompanyController {
  constructor(private companyservice: CompanyService) {}

  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
  @Get('/companies')
  async companies() {
    return await this.companyservice.getAllCompany();
  }
  @UseGuards(JwtGuard)
  @Get('/company/:id')
  async getCompanyInfo(@Param('id') id: string) {
    return await this.companyservice.getCompany(parseInt(id));
  }
  @UseGuards(JwtGuard)
  @Patch('/company/:id')
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
  ) {
    return await this.companyservice.updateCompanyInfo(parseInt(id), body);
  }
  @UseGuards(JwtGuard)
  @Get('/companyname')
  async getAllNames() {
    return this.companyservice.companyname();
  }
}
