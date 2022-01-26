import { IsString,IsNumber, IsDate, IsEmail, IsOptional } from "class-validator";

export class UpdateCompanyDto{

    @IsString()
    @IsOptional()
    companyName:string;
    @IsEmail()
    @IsOptional()
    companyEmail:string;
    @IsString()
    @IsOptional()
    companyAddress:string;
    @IsNumber()
    @IsOptional()
    companyZipCode:number;
    @IsNumber()
    @IsOptional()
    commpanyPhoneNumber:string;
    @IsDate()
    @IsOptional()
    establishment:string;
    @IsString()
    @IsOptional()
    remarks:string;
}