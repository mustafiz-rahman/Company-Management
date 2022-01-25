import { IsString,IsNumber, IsDate, IsEmail, IsEnum } from "class-validator";
import {Role} from "src/models/role.enum";

export class CreateTempuserDto{

    @IsEmail()
    email:string;
    @IsString()
    company:string;
    @IsEnum(Role)
    role:Role;
    
    
}