import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http : HttpClient) { }


  apiUrl = 'http://localhost:8085/dossiers' ;

  persist(document){
    return this.http.post(this.apiUrl, document);
  }

 
  getAll(id){
    return this.http.get(`${this.apiUrl}`);

  }

  update(document){
    return this.http.put(`${this.apiUrl}/${document.id}`,document);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
