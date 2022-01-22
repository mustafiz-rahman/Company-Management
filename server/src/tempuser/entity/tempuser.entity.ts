import { Column, Entity } from "typeorm";
import { Baseinfo } from "src/baseEntity/base.entity";

@Entity()
export class Tempuser extends Baseinfo{
    
    @Column()
    token:string;
    
    

}