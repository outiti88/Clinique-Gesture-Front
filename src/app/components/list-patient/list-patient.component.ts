import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  constructor(private patientService : PatientService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
     this.patientService.getAllPatients().subscribe(res => console.log(res));
  }

}
