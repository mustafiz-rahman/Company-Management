import { IsString,IsNumber, IsDate, IsEmail } from "class-validator";
import {Role} from "src/models/role.enum";

export class CreateTempuserDto{

    @IsEmail()
    email:string;
    @IsString()
    company:string;
    @IsString()
    role:Role;
    
    
}