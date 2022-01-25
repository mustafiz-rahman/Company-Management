import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import console from 'console';
import { Observable } from 'rxjs';
import { Role } from 'src/models/role.enum';
import { ROLES_KEY } from 'src/models/roles.decorator';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflactor:Reflector){}

  canActivate(
    context: ExecutionContext,
  ){
      const requiredRoles= this.reflactor.getAllAndOverride<Role[]>(ROLES_KEY,[
        context.getHandler(),
        context.getClass()
      ])

      if(requiredRoles)
      {
        const {user} = context.switchToHttp().getRequest();
        
        return requiredRoles.some((role)=>user.role?.includes(role));
        
      }
      
      
      
      //console.log(user);
      
      return true;
    
  }
}
