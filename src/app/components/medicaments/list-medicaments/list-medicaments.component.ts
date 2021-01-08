import { Component, OnInit } from '@angular/core';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-list-medicaments',
  templateUrl: './list-medicaments.component.html',
  styleUrls: ['./list-medicaments.component.css']
})
export class ListMedicamentsComponent implements OnInit {

  constructor(private medicamentService : MedicamentService) { }

  ngOnInit(): void {
    this.getAll();
  }

  formShow = false;
  ajoutMedicament = false;
  editMedicament = false ;
  medicaments : any = [];

  rhumatologie : any = [];
  orthopedie : any = [];
  cardiologie : any = [];
  pediatrie : any = [];
  neurologie : any = [];

  medicament : any = {
    name : "",
    price : 0,
    categorie : "",
    type : ""
  }

  ajouterMedicament(){
    this.medicament = {
      name : "",
      price : 0,
      categorie : "",
      type : ""
    }
    this.formShow = !this.formShow;
    this.ajoutMedicament = true;
    this.editMedicament = false;
  }

  addMedicament(){
    this.medicamentService.persist(this.medicament).subscribe(
      res => {
        this.frontAdd(res , this.medicament);
        this.formShow = false ;
      }
    )
  }

  getAll(){
    this.getRhumatologie();
    this.getOrthopedie();
    this.getCardiologie();
    this.getPediatrie();
    this.getNeurologie();
  }

  getRhumatologie(){
    this.medicamentService.getRhumatologie().subscribe(
      res => {
        this.rhumatologie = res ;
      }
    )
  }

  getOrthopedie(){
    this.medicamentService.getOrthopedie().subscribe(
      res => {
        this.orthopedie = res ;
      }
    )
  }

  getNeurologie(){
    this.medicamentService.getNeurologie().subscribe(
      res => {
        this.neurologie = res ;
      }
    )
  }

  getPediatrie(){
    this.medicamentService.getPediatrie().subscribe(
      res => {
        this.pediatrie = res ;
      }
    )
  }

  getCardiologie(){
    this.medicamentService.getCardiologie().subscribe(
      res => {
        this.cardiologie = res ;
      }
    )
  }

  edit(medicament){
    this.medicamentService.update(medicament).subscribe(
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
        this.medicamentService.delete(this.medicament.id).subscribe(
          res => {
            this.frontDelete(this.medicament);
            this.formShow = false ;
          }

        )
      }
}

frontDelete(medicament){
      this.rhumatologie = this.rhumatologie.filter(medi => medi.id != medicament.id);
      this.cardiologie = this.cardiologie.filter(medi => medi.id != medicament.id);
      this.orthopedie = this.orthopedie.filter(medi => medi.id != medicament.id);
      this.pediatrie = this.pediatrie.filter(medi => medi.id != medicament.id);
      this.neurologie = this.neurologie.filter(medi => medi.id != medicament.id);

  this.medicaments = this.pediatrie.filter(medi => medi.id != this.medicament.id);
}

frontAdd(res , medicament){
  switch (medicament.categorie) {
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
  this.medicaments = [res , ...this.medicaments];
}




}
