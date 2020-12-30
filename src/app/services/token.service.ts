import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  set(data : any){
    localStorage.setItem('token' , data.token);
    localStorage.setItem('email', data.email);
  }

  handle(data){
    this.set(data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getEmail(){
    return localStorage.getItem('email');
  }

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  decode(payload){
    return JSON.parse(atob(payload));
  }

  payload(token){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  isValid(){
    const token = this.getToken();
    const email = this.getEmail();

    if(token){
      const payload = this.payload(token);
      if(payload){
        return email == payload.sub;
      }
    }
    return false;
  }


  getInfos(){
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      return payload ? payload : null
    }
    return null ;
  }


  loggedIn(){
    return this.isValid();
  }


}
