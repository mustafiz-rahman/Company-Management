import { IsEmail,IsString,IsNumber, IsDate } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email:string;
    @IsString()
    company:string;
    @IsString()
    role:string;
    @IsString()
    password:string;
    @IsString()
    name:string;
    @IsString()
    depertment:string;
    @IsNumber()
    zipCode:number;
    @IsString()
    address:string;
    @IsNumber()
    phoneNumber:number;
    @IsDate()
    dob:string;
    @IsString()
    remarks:string;
}