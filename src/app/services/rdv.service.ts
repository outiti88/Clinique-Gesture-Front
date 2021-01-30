import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rdv } from '../models/rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:8085/rdv'

  getRdvs(){
    return this.http.get(this.apiUrl);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(rdv : Rdv){
    return this.http.post(this.apiUrl, rdv);
  }

  getRdvsFixer(){
    return this.http.get(`${this.apiUrl}/filter?state=fixé`);
  }

  filter(rdv){
    let filterUrl = 'http://localhost:8085/rdv/filter?'
    if(rdv.date.length>0) filterUrl += "&date="+rdv.date;
    if(rdv.state.length>0) filterUrl += "&state="+rdv.state;
    if(rdv.startTime.length>0) filterUrl += "&startTime="+rdv.startTime;
    if(rdv.endTime.length>0) filterUrl += "&endTime="+rdv.endTime;


    return this.http.get(filterUrl);
  }

  getRdvMedecin(id){
    return this.http.get(this.apiUrl );
  }

  annuler(rdv){
    return this.http.put(`${this.apiUrl}/${rdv.rdvId}`,rdv);
  }


}
