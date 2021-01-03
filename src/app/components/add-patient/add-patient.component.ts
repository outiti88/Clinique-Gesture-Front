import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'admin'){
      this.router.navigate(['/users']);

    }
  }

}
