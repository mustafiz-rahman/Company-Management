import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";
import Role from "src/models/role.enum";

export abstract class Baseinfo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    email:string;
    @Column()
    companyName:string;
    @Column()
    password:string;
    @Column({type:'enum',enum:Role,default:Role.systemAdmin})
    role:string;

}