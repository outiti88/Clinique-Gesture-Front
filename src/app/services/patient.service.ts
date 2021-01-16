import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:8085/patients';


  getAllPatients(){ //cas de medecins : juste ses patients
    return this.http.get(this.apiUrl);
  }

  persist(patient : Patient){
    return this.http.post(this.apiUrl, patient);

  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  update(patient : Patient){
    return this.http.put(`${this.apiUrl}/${patient.patientId}`,patient);
  }


}
