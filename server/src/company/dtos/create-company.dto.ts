import { IsString,IsNumber, IsDate, IsEmail } from "class-validator";

export class CreateCompanyDto{

    @IsString()
    companyName:string;
    @IsEmail()
    companyEmail:string;
    @IsString()
    companyAddress:string;
    @IsNumber()
    companyZipCode:number;
    @IsNumber()
    commpanyPhoneNumber:string;
    @IsDate()
    establishment:string;
    @IsString()
    remarks:string;
}