import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient) { }


  apiUrl = 'http://localhost:3000/documents' ;

  persist(document){
    return this.http.post(this.apiUrl, document);
  }

 
  getAll(id){
    return this.http.get(`${this.apiUrl}?rdv.medecinId=${id}`);

  }

  update(document){
    return this.http.put(`${this.apiUrl}/${document.id}`,document);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
