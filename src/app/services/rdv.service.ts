import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rdv } from '../models/rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:3000/rdvResponse?'

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
    let filterUrl = 'http://localhost:3000/rdvResponse?'
    if(rdv.date.length>0) filterUrl += "&date="+rdv.date;
    if(rdv.patient.patientId.length>0) filterUrl += "&patient.patientId="+rdv.patient.patientId;
    if(rdv.etat.length>0) filterUrl += "&etat="+rdv.etat;
    if(rdv.debut.length>0) filterUrl += "&debut="+rdv.debut;
    if(rdv.fin.length>0) filterUrl += "&date="+rdv.fin;


    return this.http.get(filterUrl);
  }

  getRdvMedecin(id){
    return this.http.get(this.apiUrl );
  }


}
