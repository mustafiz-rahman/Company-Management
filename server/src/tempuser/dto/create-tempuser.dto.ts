import { IsString,IsNumber, IsDate, IsEmail } from "class-validator";

export class CreateTempuserDto{

    @IsEmail()
    email:string;
    @IsString()
    company:string;
    @IsString()
    role:string;
    
    
}