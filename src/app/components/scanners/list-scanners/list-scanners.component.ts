import { Component, OnInit } from '@angular/core';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'app-list-scanners',
  templateUrl: './list-scanners.component.html',
  styleUrls: ['./list-scanners.component.css']
})
export class ListScannersComponent implements OnInit {

  constructor(private scannerService : ScannerService) { }

  ngOnInit(): void {
    this.getAll();
  }

  formShow = false;
  ajoutScanner = false ;
  editScanner = false;

  scanner : any = {
    type : "",
    price : 0
  }

  scanners : any = [] ;

  ajouterScanner(){
    this.scanner = {
      type : "",
      price : 0 
    }
    this.formShow = !this.formShow;
    this.ajoutScanner = true;
    this.editScanner = false;
  }

  addScanner(){
    this.scannerService.persist(this.scanner).subscribe(
      res => {
        this.scanners = [res, ...this.scanners];
        this.formShow = false;
      }
    )
  }

  getAll(){
    this.scannerService.getAll().subscribe(
      res => {
        this.scanners = res;
      }
    )
  }

  modifier(scanner){
    this.scanner = scanner ;
    this.formShow = !this.formShow;
    this.editScanner = true;
    this.ajoutScanner = false;
  }

  edit(medicament){
    this.scannerService.update(medicament).subscribe(
      res => {
        this.formShow = false;
      }
    )
  }

  delete(scanner){
    this.formShow = false;
    this.scanner = scanner;
    if(confirm("Voulez vous vraiment supprimer: "+this.scanner.type)){
      this.formShow = false;
        this.scannerService.delete(this.scanner.id).subscribe(
          res => {
            this.scanners = this.scanners.filter(scan => scan.id != this.scanner.id);
            this.formShow = false ;
          }

        )
      }
  }

}
