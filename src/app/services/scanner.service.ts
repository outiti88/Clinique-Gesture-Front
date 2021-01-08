import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scanner } from '../models/scanner';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:3000/scanners' ;

  persist(scanner : Scanner){
    return this.http.post(this.apiUrl, scanner);
  }

  getAll(){
    return this.http.get(this.apiUrl);
  }

  update(scanner){
    return this.http.put(`${this.apiUrl}/${scanner.id}`,scanner);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
