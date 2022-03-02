import { createParamDecorator,ExecutionContext } from "@nestjs/common";
import { never } from "rxjs";

export const CurrentUser = createParamDecorator(
    (data:never,context:ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        return request.CurrentUser;
    }
) 

