import { Component, OnInit } from '@angular/core';
import { MedicamentService } from 'src/app/services/medicament.service';
import { Router } from '@angular/router';
import { Medicament } from 'src/app/models/medicament';


@Component({
  selector: 'app-list-medicaments',
  templateUrl: './list-medicaments.component.html',
  styleUrls: ['./list-medicaments.component.css']
})
export class ListMedicamentsComponent implements OnInit {

  constructor(private medicamentService : MedicamentService , private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('role') != 'gp'){
      this.router.navigate(['/']);
    }
    this.getAll();
  }

  chargement=false;
  neurologieChargement = false;
  pediatrieChargement = false;
  cardiologieChargement = false;
  orthopedieChargement = false;
  rhumatologieChargement = false;

  formShow = false;
  ajoutMedicament = false;
  editMedicament = false ;
  medicaments : any = [];

  rhumatologie : any = [];
  orthopedie : any = [];
  cardiologie : any = [];
  pediatrie : any = [];
  neurologie : any = [];

  medicament : Medicament ;

  ajouterMedicament(){
    this.medicament = new Medicament();
    this.formShow = !this.formShow;
    this.ajoutMedicament = true;
    this.editMedicament = false;
  }

  addMedicament(){

    switch (this.medicament.category) {
      case  "rhumatologie" : {
        this.rhumatologieChargement = true;
        break;
      }
      case  "cardiologie" : {
        this.cardiologieChargement = true;
        break;
      }
      case  "orthopedie" : {
        this.orthopedieChargement = true;
        break;
      }
      case  "pediatrie" : {
        this.pediatrieChargement = true;
        break;
      }
      case  "neurologie" : {
        this.neurologieChargement = true;
        break;
      }
    }


    this.medicamentService.persist(this.medicament).subscribe(
      res => {
        this.frontAdd(res , this.medicament);
        this.formShow = false ;
        this.rhumatologieChargement = false;
        this.cardiologieChargement = false;
        this.orthopedieChargement = false;
        this.pediatrieChargement = false;
        this.neurologieChargement = false;

      }
    )
  }

  getAll(){
    this.chargement = true;
    this.medicamentService.getAll().subscribe(
      res => {
        this.chargement = false;
        this.medicaments =  res;
        this.getRhumatologie();
        this.getOrthopedie();
        this.getNeurologie();
        this.getPediatrie();
        this.getCardiologie();
      }
    )
  }

  getRhumatologie(){
    
    this.rhumatologie =  this.medicaments.filter(medi => medi.category == "rhumatologie") ;
    
  }

  getOrthopedie(){
    this.orthopedie = this.medicaments.filter(medi => medi.category == "orthopedie") ;

  }

  getNeurologie(){
    this.neurologie = this.medicaments.filter(medi => medi.category == "neurologie") ;

  }

  getPediatrie(){
    this.pediatrie = this.medicaments.filter(medi => medi.category == "pediatrie") ;

  }

  getCardiologie(){
  
    this.cardiologie = this.medicaments.filter(medi => medi.category == "cardiologie") ;


  }

  edit(medicament,id){
    console.log(id);
    this.medicamentService.update(medicament , id).subscribe(
      res => {
        this.frontDelete(res);
        this.frontAdd(res , medicament);
        this.formShow = false;
      }
    );
  }

  modifier(medicament){
    this.medicament = medicament;
    this.formShow = !this.formShow;
    this.ajoutMedicament = false;
    this.editMedicament = true;
  }

  delete(medicament){
    this.formShow = false;
    this.medicament = medicament;
    if(confirm("Voulez vous vraiment supprimer: "+this.medicament.name)){
      this.formShow = false;
        this.medicamentService.delete(this.medicament.medicamentId).subscribe(
          res => {
            this.frontDelete(this.medicament);
            this.formShow = false ;
          }

        )
      }
}

frontDelete(medicament){
      this.rhumatologie = this.rhumatologie.filter(medi => medi.medicamentId != medicament.medicamentId);
      this.cardiologie = this.cardiologie.filter(medi => medi.medicamentId != medicament.medicamentId);
      this.orthopedie = this.orthopedie.filter(medi => medi.medicamentId != medicament.medicamentId);
      this.pediatrie = this.pediatrie.filter(medi => medi.medicamentId != medicament.medicamentId);
      this.neurologie = this.neurologie.filter(medi => medi.medicamentId != medicament.medicamentId);

}

frontAdd(res , medicament){
  switch (medicament.category) {
    case  "rhumatologie" : {
      this.rhumatologie = [res, ...this.rhumatologie];
      break;
    }
    case  "cardiologie" : {
      this.cardiologie = [res, ...this.cardiologie];
      break;
    }
    case  "orthopedie" : {
      this.orthopedie = [res, ...this.orthopedie];
      break;
    }
    case  "pediatrie" : {
      this.pediatrie = [res, ...this.pediatrie];
      break;
    }
    case  "neurologie" : {
      this.neurologie = [res, ...this.neurologie];
      break;
    }
  }
}




}
