import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Company{

    @PrimaryGeneratedColumn()
    companyId:number;
    @Column()
    companyName:string;
    @Column()
    companyEmail:string;
    @Column()
    companyAddress:string;
    @Column()
    companyZipCode:number;
    @Column()
    commpanyPhoneNumber:string;
    @Column({type:'date'})
    establishment:string;
    @Column()
    remarks:string;


}