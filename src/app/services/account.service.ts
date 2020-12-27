import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());

  isAuth = this.loggedIn.asObservable();

  constructor(private tokenService : TokenService) { }

  changeStatut(value : boolean){
    this.loggedIn.next(value);
  }

}
