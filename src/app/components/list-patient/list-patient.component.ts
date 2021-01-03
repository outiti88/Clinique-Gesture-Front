import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  

  constructor(private patientService : PatientService , private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'admin'){
      this.router.navigate(['/users']);

    }
    this.getAll();
  }

  patients : any = [] ;

  getAll(){
     this.patientService.getAllPatients().subscribe((res) => {
       this.patients = res ;
     });
  }

}
