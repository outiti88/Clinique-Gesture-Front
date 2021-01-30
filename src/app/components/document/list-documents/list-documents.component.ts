import { Component, OnInit } from '@angular/core';
import { RdvService } from 'src/app/services/rdv.service';
import { DocumentService } from 'src/app/services/document.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { SoinsService } from 'src/app/services/soins.service';
import { MedicamentService } from 'src/app/services/medicament.service';
import { Document } from 'src/app/models/document';
import * as _ from 'lodash';
import { Router } from '@angular/router';




@Component({
  selector: 'app-list-documents',
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent implements OnInit {

  constructor(
    private rdvService : RdvService ,
    private medicamentService : MedicamentService ,
    private soinService : SoinsService,
    private scannerService : ScannerService , 
    private documentService : DocumentService
    , private router : Router
    ) 
    { }

  ngOnInit(): void {
    this.getAllRdv();
    this.getAllScanner();
    this.getAllSoins();
    this.getAllMedicaments();
    this.getAllDocument(localStorage.getItem('id'));
    if(localStorage.getItem('role') == 'admin'){
      this.router.navigate(['/users']);
    }
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

  medicamentFront : any =[]; //medicament select
  medicamentAjou : any = [] ;
  medicamentAdded : any = {
    medicamentId : "",
    quantite : 1
  }

  scannerFront : any = [];
  scannerAjou : any = [] ;
  scannerAdded : any = {
    scannerId : ""
    }

  soinFront : any = [];
  soinAjou : any = [] ;
  soinAdded : any = {
    soinId : ""
    }


  document  : any = { //persist
    scannersIds :  [],
      soinsIds : [],
    medicamentsIds : [],
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
    let soin = this.soins.filter(x => x.soinId == id)[0];
    return soin.typeSoin+"  "+soin.prix+"Mad" ;
  }

  getMedicamentByFilter(id){
    let medi = this.medicaments.filter(x => x.medicamentId == id)[0];
    //this.total = medi.price;
    return medi.name+"  ("+ medi.type+")"+"  "+medi.price+"Mad" ;
  }

  getScannerByFilter(id){
    let scanner = this.scanners.filter(x => x.scannerId == id)[0];
    return scanner.name+"  "+scanner.price+"Mad" ;
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
    this.soinService.getAll().subscribe(
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
        console.log(this.scanners);
      }
    )
  }

  getAllDocument(id){
    this.documentService.getAll(id).subscribe(
      res =>
      {
        this.documents = res ;
        console.log(this.documents);
      } 
    )
  }

  checkDocument(){
    let content : Number = this.document.soinsIds.length * 1 + this.document.medicamentsIds.length * 1 + this.document.scannersIds.length * 1 ;
    return (content > 0) ? true : false;
  }

  addDocument(){
    this.document.medicamentsIds = _.map(this.medicamentAjou, 'medicamentId');
    this.document.soinsIds = _.map(this.soinAjou, 'soinId');
    this.document.scannersIds = _.map(this.scannerAjou, 'scannerId');
    this.document.rdvId = this.rdvId;
    if(this.checkDocument()){
      let rdv : any ;
      this.documentService.persist(this.document).subscribe(
        res => {
          this.documentList = [res , ...this.documentList];
          this.formShow=false;
          this.alertAjout = true;
          this.alertNonAjout=false;
          this.showMedicamentForm();
          this.formMedicament = false;
          this.resetForm();
          rdv = this.rdvs.filter(x => x.rdvId == this.rdvId)[0];
          rdv.state = "validé";
          rdv.patientId = rdv.patient.patientId;
         rdv.medecinId = rdv.medecin.userID;
          this.rdvService.annuler(rdv).subscribe(
            res => {
              console.log(res);
            },
            (eror) => {
              console.log("rdv non modifié "+eror.message)
            }
        )
        }
      );
    
    }
    else{
      this.alertNonAjout=true;
      this.alertAjout = false;
    }
    
  }

  ajouterMedicament(){
  
   let medi = this.medicamentAdded;
    this.medicamentAjou = [this.medicamentAdded, ...this.medicamentAjou];
    this.medicamentAdded  = {
      medicamentId : "",
      quantite : 1
    }
    this.medicamentFront = this.medicamentFront.filter(medicament => medicament.medicamentId != medi.medicamentId);
  }



  ajouterSoin(){
    let soin = this.soinAdded;
    this.soinAjou = [this.soinAdded, ...this.soinAjou];
    this.soinAdded  = {
      soinId : ""
    }
    this.soinFront = this.soinFront.filter(s => s.soinId != soin.soinId);

  }

  ajouterScanner(){
    let scanner = this.scannerAdded;
    this.scannerAjou = [this.scannerAdded, ...this.scannerAjou];
    this.scannerAdded  = {
      scannerId : ""
    }
    this.scannerFront = this.scannerFront.filter(s => s.scannerId != scanner.scannerId);

  }

  deleteMedicament(id){
    let medicament = this.medicaments.filter(x => x.medicamentId == id)[0];
    this.medicamentFront = [medicament, ...this.medicamentFront];
    this.medicamentAjou = this.medicamentAjou.filter(medicament => medicament.medicamentId != id);

  }

  deleteSoin(id){
    let soin = this.soins.filter(x => x.soinId == id)[0];
    this.soinFront = [soin, ...this.soinFront];
    this.soinAjou = this.soinAjou.filter(soin => soin.soinId != id);

  }

  deleteScanner(id){
    let scanner = this.scanners.filter(x => x.scannerId == id)[0];
    this.scannerFront = [scanner, ...this.scannerFront];
    this.scannerAjou = this.scannerAjou.filter(scanner => scanner.scannerId != id);

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
      medicamentId : "",
      quantite : 1
    }
    this.soinAdded  = {
      soinId : ""
    }
    this.scannerAdded  = {
      scannerId : ""
    }
    this.soinFront = [];
    this.scannerAdded = [];
    this.  medicamentFront =[];

  }






}
