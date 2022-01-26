import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtGuard } from 'src/gurds/jwt.guard';
import { RolesGuard } from 'src/gurds/roles.guard';
import { Role } from 'src/models/role.enum';
import { Roles } from 'src/models/roles.decorator';
import { User } from 'src/user/entity/user.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Controller()
export class CompanyController {
  constructor(private companyservice: CompanyService) {}
  @Roles(Role.System)
  @UseGuards(JwtGuard,RolesGuard)
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


  @Roles(Role.System)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('/allcompany')
  async companies() {
    return await this.companyservice.getAllCompany();
  }


  @Roles(Role.System)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('/company/:id')
  async getCompanyInfo(@Param('id') id: string) {
    return await this.companyservice.getCompany(parseInt(id));
  }


  @Roles(Role.System)
  @UseGuards(JwtGuard,RolesGuard)
  @Patch('/company/:id')
  async updateCompanyInfo(
    @Param('id') id: string,
    @Body() body: UpdateCompanyDto,
  ) {
    return await this.companyservice.updateCompanyInfo(parseInt(id), body);
  }


  @Roles(Role.System)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('/companyname')
  async getAllNames() {
    return this.companyservice.companyname();
  }


  @Roles(Role.Admin,Role.General)
  @UseGuards(JwtGuard,RolesGuard)
  @Get('/company/view')
  async companyView(@CurrentUser() user:User){
    return await this.companyservice.getCompanyByname(user.companyName);
  }


  @Roles(Role.Admin)
  @UseGuards(JwtGuard,RolesGuard)
  @Patch('/company/edit')
  async companyUpdateForAdmin(@CurrentUser() user:User,@Body() body:UpdateCompanyDto){
    const company= await this.companyservice.getCompanyByname(user.companyName);
    return await this.companyservice.updateCompanyInfo(company.companyId,body);
  }
}
