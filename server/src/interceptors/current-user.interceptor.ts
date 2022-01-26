import { NestInterceptor,ExecutionContext,CallHandler, Injectable} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userService:UserService,private jwtService:JwtService){}
    async intercept(context:ExecutionContext,handler:CallHandler){
        const request = context.switchToHttp().getRequest();
        const {id} =request.user;
        

        if(id){
            const getUser =  this.userService.findUser(id);
            request.CurrentUser= getUser;
        }
        return handler.handle();
    }
}