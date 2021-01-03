import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private tokenService : TokenService, 
    private accountService: AccountService,
    private router : Router
    
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      if(this.tokenService.getRole() != 'admin'){
        this.router.navigateByUrl('/');
        return false;
      }

    return true;
  }
  
}
