import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm : FormGroup ;

  constructor(
    private formBuilder : FormBuilder ,
    private router : Router,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.addUserForm = this.formBuilder.group({
      firstName: ['',[Validators.required, Validators.pattern(/[a-zA-Z]{3,}/)]],
      lastName : ['',[Validators.required, Validators.pattern(/[a-zA-Z]{3,}/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
      role : ['', [Validators.required]]
    });
  }

  addUser(){
    const newUser = new User();
    newUser.firstName = this.addUserForm.get('firstName').value;
    newUser.lastName = this.addUserForm.get('lastName').value;
    newUser.email = this.addUserForm.get('email').value;
    newUser.password = this.addUserForm.get('password').value;
    newUser.role.name = this.addUserForm.get('role').value;


    this.userService.persist(newUser).subscribe(
      res => console.log(res));
      this.router.navigateByUrl("/users");
  }
}
