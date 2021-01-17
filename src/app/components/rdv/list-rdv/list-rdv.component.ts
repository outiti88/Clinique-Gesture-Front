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
      this.getAllMedecins();
      this.getAllRdv();
    }

    if(localStorage.getItem('role') == 'medecin'){
      this.getRdvMedecin(localStorage.getItem('id'));
    }
    this.getAllPatients();
  }

  role = localStorage.getItem('role') ;
  id = localStorage.getItem('role');
 

  chargement = false;
  chargementAjout = false;
  patient : Patient ;
  reportDateShow = "";
  dateReport = "";


  reporter(rdv){
    if(this.dateReport != "" ){
      rdv.patientId = rdv.patient.patientId;
      rdv.medecinId = rdv.medecin.userID;
      rdv.date = this.dateReport;
      rdv.state="reporté";
      this.rdvService.annuler(rdv).subscribe(
      res => {
        console.log(res);
        this.reportDateShow = "";
        this.rdv = new Rdv();
      }
    )
    }
    else{
      alert("date vide");
    }
   
  }
 
  filterShow = false;
  formShow = false;
  alertAjout = false;
  patients : any = [] ;
  medecins : any = [];
  rdvs : any = [];
  rdv : Rdv = new Rdv(); 

  //For filter
  rdvSearch: Rdv;
  searchDate : any;
  searchPatient : any ;
  searchDebut : any;
  searchFin : any ;



  getRdvMedecin(id){
    this.chargement = true;
    this.rdvService.getRdvMedecin(id).subscribe((res) => {
      this.chargement = false;
      this.rdvs=res;
    })
  }

  getAllRdv(){
    this.chargement = true;
    this.rdvService.getRdvs().subscribe((res) => {
      this.chargement = false;
      this.rdvs = res ;
    });
  }

  addRdv(){
    this.chargementAjout = true;
     this.rdv.medecinId = (this.role == "gp") ? this.rdv.medecinId : localStorage.getItem('id') ;
    this.rdvService.persist(this.rdv).subscribe(
      res => {
        this.chargementAjout = false;
        this.rdvs = [res, ...this.rdvs];
        this.formShow = false;
        this.alertAjout = true;
        this.rdv = new Rdv();
      }

    )
  }

  getAllMedecins(){
    this.userService.getMedecins().subscribe(
      res => {
        this.medecins = res;
        console.log("les medeins: "+res);
      }
    );
  }
  


  showForm(){
    this.filterShow = false;
    this.formShow = !this.formShow;
  }
  showFilter(){
    this.rdvSearch = new Rdv();
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



  getAllPatients(){
    this.patientService.getAllPatients().subscribe((res) => {
      this.patients = res ;
      console.log(this.patients);
    });
 }

 getPatientName(id){
  let patient :Patient = this.patients.filter(x => x.patientId === id)[0];
  return patient.nom + " " + patient.prenom;
}

annulerRdv(rdv){
 
  if(confirm("Voulez vous vraiment annuler ce Rendez vous ?")){
    rdv.state = "annulé";
    rdv.patientId = rdv.patient.patientId;
    rdv.medecinId = rdv.medecin.userID;
    this.rdvService.annuler(rdv).subscribe(
    res => {
      console.log(res);
      this.rdv = new Rdv();
    }
  )
  }
}


}
