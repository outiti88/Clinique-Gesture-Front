import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  set(data : any){
    localStorage.setItem('token' , data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('role', data.role);
  }

  handle(data){
    this.set(data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getId(){
    return localStorage.getItem('id');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
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
    const id = this.getId();

    if(token){
      const payload = this.payload(token);
      if(payload){
        return id == payload.sub;
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
