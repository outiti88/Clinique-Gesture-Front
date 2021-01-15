import { Component, OnInit } from '@angular/core';
import { RdvService } from 'src/app/services/rdv.service';
import { DocumentService } from 'src/app/services/document.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { SoinsService } from 'src/app/services/soins.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {

  constructor(private rdvService : RdvService ,
    private medicamentService : MedicamentService ,
    private soinService : SoinsService,
    private scannerService : ScannerService , 
    private documentService : DocumentService) { }

  ngOnInit(): void {
    this.getAllRdv();
    this.getAllScanner();
    this.getAllSoins();
    this.getAllMedicaments();
    this.getAllDocument(localStorage.getItem('id'));
  }

  medicamentBlock = 0 ;

  alertNonAjout = false;
  alertAjout = false;
  formShow = false;
  formMedicament = false;

  editDocument = false;
  ajoutDocument = false;
  formSoin = false;
  formScanner = false;

  rdvId : any ;

  medicamentFront : any =[];
  medicamentAjou : any = [] ;
  medicamentAdded : any = {
    id : "",
    quantite : 1
  }

  scannerFront : any = [];
  scannerAjou : any = [] ;
  scannerAdded : any = {
    id : ""
    }

  soinFront : any = [];
  soinAjou : any = [] ;
  soinAdded : any = {
    id : ""
    }


  document  : any = {
    scanners :  [],
      soins : [],
    medicaments : [],
    rdvId : ""
  };

  documentList : any = [];

  total = 0;


  documents : any = [];
  soins : any = [];
  rdvs : any = [];
  medicaments : any =[];
  scanners : any = [];

  ajouterDocument(){
    this.formShow = !this.formShow;
    this.ajoutDocument = true;
    this.editDocument = false;
  }

  getSoinByFilter(id){
    let soin = this.soins.filter(x => x.id == id)[0];
    return soin.type+"  "+soin.price+"Mad" ;
  }

  getMedicamentByFilter(id){
    let medi = this.medicaments.filter(x => x.id == id)[0];
    //this.total = medi.price;
    return medi.name+"  ("+ medi.type+")"+"  "+medi.price+"Mad" ;
  }

  getScannerByFilter(id){
    let scanner = this.scanners.filter(x => x.id == id)[0];
    return scanner.type+"  "+scanner.price+"Mad" ;
  }

  getAllMedicaments(){
    this.medicamentService.getAll().subscribe(
      res => {
        this.medicaments = res;
        this.medicamentFront = res;
      }
    )
  }

  
  getAllSoins(){
    this.soinService.getAll(localStorage.getItem('id')).subscribe(
      res => {
        this.soins = res;
        this.soinFront = res;

      }
    )
  }

  getAllRdv(){
    this.rdvService.getRdvsFixer().subscribe((res) => {
      this.rdvs = res ;
    });
  }

  getAllScanner(){
    this.scannerService.getAll().subscribe(
      res => {
        this.scanners = res;
        this.scannerFront = res;
      }
    )
  }

  getAllDocument(id){
    this.documentService.getAll(id).subscribe(
      res =>
      {
        this.documents = res ;
      } 
    )
  }

  checkDocument(){
    let content : Number = this.document.soins.length * 1 + this.document.medicaments.length * 1 + this.document.scanners.length * 1 ;
    return (content > 0) ? true : false;
  }

  addDocument(){
    this.document.medicaments = this.medicamentAjou;
    this.document.soins = this.soinAjou;
    this.document.scanners = this.scannerAjou;
    this.document.rdvId = this.rdvId;
    if(this.checkDocument()){
      this.documentService.persist(this.document).subscribe(
        res => {
          this.documentList = [res , ...this.documentList];
          this.formShow=false;
          this.alertAjout = true;
          this.alertNonAjout=false;
          this.showMedicamentForm();
          this.formMedicament = false;
          this.resetForm();
        }
      )
    }
    else{
      this.alertNonAjout=true;
      this.alertAjout = false;
    }
    
  }

  edit(Document){

  }


  ajouterMedicament(){
  
   let medi = this.medicamentAdded;
    this.medicamentAjou = [this.medicamentAdded, ...this.medicamentAjou];
    this.medicamentAdded  = {
      id : "",
      quantite : 1
    }
    this.medicamentFront = this.medicamentFront.filter(medicament => medicament.id != medi.id);
  }



  ajouterSoin(){
    let soin = this.soinAdded;
    this.soinAjou = [this.soinAdded, ...this.soinAjou];
    this.soinAdded  = {
      id : ""
    }
    this.soinFront = this.soinFront.filter(s => s.id != soin.id);

  }

  ajouterScanner(){
    let scanner = this.scannerAdded;
    this.scannerAjou = [this.scannerAdded, ...this.scannerAjou];
    this.scannerAdded  = {
      id : ""
    }
    this.scannerFront = this.scannerFront.filter(s => s.id != scanner.id);

  }

  deleteMedicament(id){
    let medicament = this.medicaments.filter(x => x.id == id)[0];
    this.medicamentFront = [medicament, ...this.medicamentFront];
    this.medicamentAjou = this.medicamentAjou.filter(medicament => medicament.id != id);

  }

  deleteSoin(id){
    let soin = this.soins.filter(x => x.id == id)[0];
    this.soinFront = [soin, ...this.soinFront];
    this.soinAjou = this.soinAjou.filter(soin => soin.id != id);

  }

  deleteScanner(id){
    let scanner = this.scanners.filter(x => x.id == id)[0];
    this.scannerFront = [scanner, ...this.scannerFront];
    this.scannerAjou = this.scannerAjou.filter(scanner => scanner.id != id);

  }

  showMedicamentForm(){
    this.formMedicament = !this.formMedicament;
    this.formScanner = false;
    this.formSoin = false;
  }

  showSoinForm(){
    this.formMedicament = false;
    this.formScanner = false;
    this.formSoin = !this.formSoin;
  }

  showScannerForm(){
    this.formMedicament = false;
    this.formScanner = !this.formScanner;
    this.formSoin = false;
  }

  resetForm(){
    this.medicamentAdded  = {
      id : "",
      quantite : 1
    }
    this.soinAdded  = {
      id : ""
    }
    this.scannerAdded  = {
      id : ""
    }
  }






}
