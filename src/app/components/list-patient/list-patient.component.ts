import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { UserService } from 'src/app/services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  
  constructor( private userService : UserService,
    private patientService : PatientService , private router : Router) { }



  ngOnInit(): void {

    if(localStorage.getItem('role') == 'admin'){
      this.router.navigate(['/users']);
    }

    if(localStorage.getItem('role') != 'medecin'){
      this.getMedecins();
    }
    

    this.getAll();

  }

  chargement = true;

  role = localStorage.getItem('role') ;

  medecins : any = [] ;

  patient : Patient = new Patient();
  addMedecin = false;
  patients : any = [] ;
  formPatient = false ;
  ajouter = false;
  edit = false;
  alertAjout = false;
  alertEdit = false;
  alertErreur = false;
  erreurMsg = "";
  nvMedecin : any ="";

  getMedecins(){
    this.userService.getMedecins().subscribe((res) => {
      this.medecins = res ;
    });
  }

  getMedecinByFilter(id){
    let medecin = this.medecins.filter(x => x.userID === id)[0];
    return medecin.firstName + " " + medecin.lastName;
  }

  getAll(){
    this.chargement = true;
     this.patientService.getAllPatients().subscribe((res) => {
       this.chargement = false;
       this.patients = res ;
     });
  }

  addPatient(){
    if(localStorage.getItem('role')=="medecin"){ this.nvMedecin = localStorage.getItem('id');}
    this.patient.usersIds.push(this.nvMedecin);
    this.patientService.persist(this.patient).subscribe(
      res => {
        this.patients = [res, ...this.patients];
        this.formPatient = false;
        this.alertAjout = true;
      },
      (error) => {    
        this.alertErreur = true;
        this.erreurMsg = error.error.message;
        console.log("erreur: ", error.error.message)
        
      }
    );

  }
  
  addMedecinForPatient(){
    var medecin = this.medecins.filter(x => x.userID === this.nvMedecin)[0];
    this.patient.users.push(medecin);
    this.addMedecin = false;
  }

  deletMedecin(id){
    this.patient.users = this.patient.users.filter(medecin => medecin.userID != id);
  }

  updatePatient(){
    this.patient.usersIds = _.map(this.patient.users,'userID');
    this.patientService.update(this.patient)
          .subscribe(() => {
            this.formPatient = false;
            this.alertEdit = true;
            });

  }

  deletePatient(patient){

      if(confirm("Voulez vous vraiment supprimer: "+patient.nom)){

        if(localStorage.getItem('role') == 'gp'){
          this.patientService.delete(patient.patientId)
          .subscribe(() => {
            this.patients = this.patients.filter(p => p.patientId != patient.patientId);
            alert('supprimer');
            });
        }
        else{
          let medecins = patient.users;
          medecins = medecins.filter(medecin => medecin.userID != localStorage.getItem('id'));
          let medecin_id = _.map(medecins,'userID');
          patient.usersIds = medecin_id;
          this.patientService.update(patient)
          .subscribe(() => {
            this.patients = this.patients.filter(p => p.patientId != patient.patientId);
            alert('supprimer');
            });
        }
        }
  }

  add() {
    this.patient =  new Patient() ;
    this.formPatient = !this.formPatient;
    this.edit = false;
    this.ajouter = true;
    this.alertAjout = false;
    this.alertEdit = false;
    this.alertErreur = false;
  }

  editPatient(patient){
    this.formPatient = !this.formPatient;
    this.ajouter = false;
    this.edit = true ;
    this.patient = patient;
    this.alertAjout = false;
    this.alertEdit = false;
    this.alertErreur = false;
  }

}
