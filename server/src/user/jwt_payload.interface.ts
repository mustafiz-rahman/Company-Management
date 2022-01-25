import { Role } from "src/models/role.enum";

export interface JwtPayload{
    id:number;
    role:Role;
}