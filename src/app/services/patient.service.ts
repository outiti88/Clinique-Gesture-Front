import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) { }

  getAllPatients(){
    return this.http.get('http://localhost:8085/patients');

  }
}
