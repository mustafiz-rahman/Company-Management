import { Baseinfo } from "src/baseEntity/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends Baseinfo{

    @Column()
    name:string;
    @Column()
    depertment:string;
    @Column()
    zipCode:number;
    @Column()
    address:string;
    @Column()
    phoneNumber:number;
    @Column()
    dob:string;
    @Column()
    remarks:string;
}