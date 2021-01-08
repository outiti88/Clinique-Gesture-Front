import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicament } from '../models/medicament';

@Injectable({
  providedIn: 'root'
})
export class MedicamentService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:3000/medicamentsAdd' ;

  persist(medicament : Medicament){
    return this.http.post(this.apiUrl, medicament);
  }

  getRhumatologie(){
    return this.http.get(`${this.apiUrl}?categorie=rhumatologie`);
  }

  getOrthopedie(){
    return this.http.get(`${this.apiUrl}?categorie=orthopedie`);
  }

  getCardiologie(){
    return this.http.get(`${this.apiUrl}?categorie=cardiologie`);
  }

  getPediatrie(){
    return this.http.get(`${this.apiUrl}?categorie=pediatrie`);
  }
  getNeurologie(){
    return this.http.get(`${this.apiUrl}?categorie=neurologie`);

  }

  update(medicament){
    return this.http.put(`${this.apiUrl}/${medicament.id}`,medicament);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
