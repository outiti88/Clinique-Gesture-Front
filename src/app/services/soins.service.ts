import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Soin } from '../models/soin';

@Injectable({
  providedIn: 'root'
})
export class SoinsService {

  constructor(private http : HttpClient) { }


  apiUrl = 'http://localhost:3000/soins' ;

  persist(soin : Soin){
    return this.http.post(this.apiUrl, soin);
  }

 
  getAll(id){
    return this.http.get(`${this.apiUrl}?medecinId=${id}`);

  }

  update(soin){
    return this.http.put(`${this.apiUrl}/${soin.id}`,soin);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
