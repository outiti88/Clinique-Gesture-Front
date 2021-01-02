import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  users : any = [] ;

  getAllUsers(){
    this.userService.getUsers().subscribe((res) => {
      this.users = res ;
      console.log(res);
    });
  }

}
