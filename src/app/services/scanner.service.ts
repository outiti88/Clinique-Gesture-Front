import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scanner } from '../models/scanner';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private http : HttpClient) { }

  apiUrl = 'http://localhost:8085/scanner' ;

  persist(scanner : Scanner){
    return this.http.post(this.apiUrl, scanner);
  }

  getAll(){
    return this.http.get(this.apiUrl);
  }

  update(scanner){
    return this.http.put(`${this.apiUrl}/${scanner.scannerId}`,scanner);
  }

  delete(id){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
