import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rdv } from '../models/rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:3000/rdvResponse' ;

  getRdvs(){
    return this.http.get(this.apiUrl);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(rdv : Rdv){
    return this.http.post(this.apiUrl, rdv);
  }

  filter(rdv){
    return this.http.get(`${this.apiUrl}?date=${rdv.date}&patient.patientId=${rdv.patient.patientId}`);
  }


}
