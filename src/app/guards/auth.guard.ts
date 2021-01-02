import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
              private tokenService : TokenService, 
              private accountService: AccountService,
              private router : Router
              
              ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {

      if(!this.tokenService.loggedIn()){
        this.accountService.changeStatut(false);
        this.router.navigateByUrl('/login');
        return false;

      }

    return true;
  }
  
}
