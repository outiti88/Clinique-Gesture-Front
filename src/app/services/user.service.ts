import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  
  apiUrl = 'http://localhost:8085/users';

   message = new BehaviorSubject<any>(false) ;
  currentMsg = this.message.asObservable();

  getUsers(){
    return this.http.get(this.apiUrl);
  }

  getUsersPage(page){
    return this.http.get(`${this.apiUrl}?page=${page}`);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(user : User){
    return this.http.put(`${this.apiUrl}/${user.userID}` , user);
  }

  persist(user : User){
    return this.http.post(this.apiUrl, user);
  }

  getMedecins(){
    return this.http.get(`${this.apiUrl}/role/271823436018105328455221271447503413375744138333751222432223`); // que les medecins
  }

}
