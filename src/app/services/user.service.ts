import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  
  apiUrl = 'http://localhost:8085/users';

  getUsers(){
    return this.http.get(this.apiUrl);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(user : User){
    return this.http.post(this.apiUrl, user);
  }

}
