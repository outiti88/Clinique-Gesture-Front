import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { UserService } from 'src/app/services/user.service';

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

  patient : Patient =  {
    patientId:	"",
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    cin : "",
    user : {
      userID:	"",
      firstName: "",
      lastName: "",
      email: "",
      role: {
        name: ""
      }
    }
  } ;

  patients : any = [] ;
  formPatient = false ;
  ajouter = false;
  edit = false;
  alertAjout = false;
  alertEdit = false;


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
    let patientPersist = {
      nom : this.patient.nom ,
      prenom : this.patient.prenom ,
      adresse : this.patient.adresse ,
      telephone : this.patient.telephone ,
      cin : this.patient.cin ,
      medecin_id : (this.role != 'medecin') ? this.patient.user.userID : localStorage.getItem('id')
    }
    //console.log(patientPersist);

    this.patientService.persist(patientPersist).subscribe(

      res => {
        this.patients = [this.patient, ...this.patients];
        this.formPatient = false;
        this.alertAjout = true;
      },
      (error) => {    
        console.log("erreur: ", error.error.message)
        
      }
    );

  }
  
  updatePatient(){
    this.formPatient = false;
    this.alertEdit = true;
    console.log(this.patient);
  }

  deletePatient(id,nom){
      if(confirm("Voulez vous vraiment supprimer: "+nom)){
        /*this.patientService.delete(id)
        .subscribe(() => {
          this.patients = this.patients.filter(patient => patient.patientId != id);
          alert('supprimer');
          });*/
          this.patients = this.patients.filter(patient => patient.patientId != id);
        }
  }

  add() {
    this.patient =  {
      patientId:	"",
      nom: "",
      prenom: "",
      adresse: "",
      telephone: "",
      cin : "",
       user : {
        userID:	"",
        firstName: "",
        lastName: "",
        email: "",
        role: {
          name: ""
        }
      }
    } ;
    this.formPatient = !this.formPatient;
    this.edit = false;
    this.ajouter = true;
  }

  editPatient(patient){
    this.formPatient = !this.formPatient;
    this.ajouter = false;
    this.edit = true ;
    this.patient = patient;
  }

}
