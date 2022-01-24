import { Column, Entity, PrimaryGeneratedColumn,  } from "typeorm";
import {Role} from "src/models/role.enum";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";
import {Exclude} from 'class-transformer';

export abstract class Baseinfo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    email:string;
    @Column()
    companyName:string;
    @Column()
    @Exclude()
    password:string;
    @Column({type:'enum',enum:Role,default:Role.Admin})
    role:Role;

}