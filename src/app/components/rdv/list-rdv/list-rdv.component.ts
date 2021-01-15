import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { RdvService } from 'src/app/services/rdv.service';
import { Rdv } from 'src/app/models/rdv';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-list-rdv',
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css']
})
export class ListRdvComponent implements OnInit {

  constructor( private userService : UserService, private rdvService : RdvService,
    private patientService : PatientService , private router : Router) { 

 
    }

  ngOnInit(): void {

    if(localStorage.getItem('role') == 'admin'){
      this.router.navigate(['/users']);
    }

    if(localStorage.getItem('role') == 'gp'){
      this.getAllRdv();
    }

    if(localStorage.getItem('role') == 'medecin'){
      this.getRdvMedecin(localStorage.getItem('id'));
    }
    this.getAllPatients();
  }

  role = localStorage.getItem('role') ;
  id = localStorage.getItem('role');
 

  
  patient : Patient =  {
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

  dateReport = "";
  reporter(rdv){
    rdv.date = this.dateReport;
    rdv.etat="Reporté";
    this.rdvService.annuler(rdv).subscribe(
    res => {
      console.log(res);
    }
  )
  }
 
  filterShow = false;
  formShow = false;
  alertAjout = false;
  patients : any = [] ;
  rdvs : any = [];
  rdv : any = { //for springboot api (RdvRequest)
        patientId : "",
        motif  : "",
        date   :"",
       debut  : "",
        fin  : "",
        etat  :"fixé",
        patient : {
          id : "",
          nom : "",
          prenom : "" ,
        }
  } ; 

  //Provisoire
  rdvForJsonServer : any = {
      motif  : "",
        date   :"",
       debut  : "",
        fin  : "",
        medecinId : localStorage.getItem('id'),
        etat  :"fixé",
        patient : {
          id : "",
          nom : "",
          prenom : "" ,
        }
  }


  getAllRdv(){
    this.rdvService.getRdvs().subscribe((res) => {
      this.rdvs = res ;
    });
  }

  addRdv(){
    this.rdvForJsonServer.motif = this.rdv.motif;
    this.rdvForJsonServer.date = this.rdv.date;
    this.rdvForJsonServer.debut = this.rdv.debut;
    this.rdvForJsonServer.fin = this.rdv.fin;
    this.rdvForJsonServer.etat = this.rdv.etat;
    this.rdvForJsonServer.patient.id = this.rdv.patientId;
    this.rdvForJsonServer.patient.nom = this.patients.filter(x => x.id == this.rdv.patientId)[0].nom;
    this.rdvForJsonServer.patient.prenom = this.patients.filter(x => x.id == this.rdv.patientId)[0].prenom;
    this.rdvService.persist(this.rdvForJsonServer).subscribe(
      res => {
        this.rdvs = [this.rdvForJsonServer, ...this.rdvs];
        this.formShow = false;
        this.alertAjout = true;

      }

    )
  }

  //For filter
  rdvSearch: any = {
    motif  : "",
      date   :"",
     debut  : "",
      fin  : "",
      etat  :"",
      medecinId : "",
      patient : {
        id : "",
        nom : "",
        prenom : "" ,
      }
}
  searchDate : any;
  searchPatient : any ;
  searchDebut : any;
  searchFin : any ;



  showForm(){
    this.filterShow = false;
    this.formShow = !this.formShow;
  }
  showFilter(){
    this.rdvSearch = {
      motif  : "",
        date   :"",
       debut  : "",
        fin  : "",
        etat  :"",
        patient : {
          id : "",
          nom : "",
          prenom : "" ,
        }
  }
    this.getAllRdv();
    this.formShow=false;
    this.filterShow = !this.filterShow;
  }

  filter(){
    this.rdvService.filter(this.rdvSearch).subscribe((res) => {
      console.log(res);
      this.rdvs=res;
    })
  }

  getRdvMedecin(id){
    this.rdvService.getRdvMedecin(id).subscribe((res) => {
      this.rdvs=res;
    })
  }


  getAllPatients(){
    this.patientService.getAllPatients().subscribe((res) => {
      this.patients = res ;
      console.log(this.patients);
    });
 }

 getPatientName(id){
  let patient :Patient = this.patients.filter(x => x.id === id)[0];
  return patient.nom + " " + patient.prenom;
}

annulerRdv(rdv){
  if(confirm("Voulez vous vraiment annuler ce Rendez vous ?")){
    rdv.etat = "annulé";
    this.rdvService.annuler(rdv).subscribe(
    res => {
      console.log(res);
    }
  )
  }
}

traiter(rdv){

}


}
