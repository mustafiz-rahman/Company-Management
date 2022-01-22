import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const Config:TypeOrmModuleOptions ={
    type:'postgres',
    host:'localhost',
    port:5432,
    database:'employee_mgt',
    username:'postgres',
    password:'admin',
    synchronize:true,
    entities:["dist/**/*.entity{ .ts,.js}"]
}