import { IsString } from "class-validator";

export class GetTempuserDto{
    @IsString()
    password:string;
}