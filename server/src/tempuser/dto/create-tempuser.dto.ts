import { IsString,IsNumber, IsDate, IsEmail, IsEnum, IsOptional } from "class-validator";
import {Role} from "src/models/role.enum";

export class CreateTempuserDto{

    @IsEmail()
    email:string;
    @IsString()
    company:string;
    @IsOptional()
    @IsEnum(Role)
    role:Role;
    
    
}