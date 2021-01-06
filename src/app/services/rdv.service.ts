import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rdv } from '../models/rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:3000/rdvResponse?'
  filtetUrl = this.apiUrl ;

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
    console.log("service: "+rdv.patient.patientId.length)
    if(rdv.date.length>0) this.filtetUrl += "&date="+rdv.date;
    else if(rdv.patient.patientId.length>0) this.filtetUrl += "&patient.patientId="+rdv.patient.patientId;
    return this.http.get(this.filtetUrl );
  }


}
