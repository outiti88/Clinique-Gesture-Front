import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());

  private role = new BehaviorSubject<string>(this.tokenService.getRole());

  isAuth = this.loggedIn.asObservable();

  roleUser = this.role.asObservable();

  constructor(private tokenService : TokenService) { }

  changeStatut(value : boolean){
    this.loggedIn.next(value);
  }

  changeRole(value : string){
    this.role.next(value);
  }

}
