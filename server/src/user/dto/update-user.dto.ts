import { IsEmail,IsString,IsNumber, IsDate } from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    email:string;
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
    @IsString()
    dob:string;
    @IsString()
    remarks:string;
}