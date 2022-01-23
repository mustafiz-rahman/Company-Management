import {IsDate,IsNumber, IsString } from "class-validator";

export class GetTempuserDto{
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
    @IsString()
    password:string;
}