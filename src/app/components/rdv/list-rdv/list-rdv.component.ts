import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-list-rdv',
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css']
})
export class ListRdvComponent implements OnInit {

  constructor( private userService : UserService,
    private patientService : PatientService , private router : Router) { }

  ngOnInit(): void {
    this.getAllPatients();
  }
  
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

  formShow = false;
  patients : any = [] ;


  showForm(){
    this.formShow = !this.formShow;
  }

  getAllPatients(){
    this.patientService.getAllPatients().subscribe((res) => {
      this.patients = res ;
      console.log(this.patients);
    });
 }

 getPatientName(id){
  let patient = this.patients.filter(x => x.patientId === id)[0];
  return patient.nom + " " + patient.prenom;
}

}
