import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:8085/factures'


  persist(facture){
    return this.http.post(this.apiUrl, facture);
  }

  getFactures(){
    return this.http.get(this.apiUrl);
  }

  payer(facture){
    return this.http.put(`${this.apiUrl}/${facture.factureId}`,facture);
  }

}
