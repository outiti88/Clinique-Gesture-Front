import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'admin'){
      this.router.navigate(['/users']);

    }
  }

}
