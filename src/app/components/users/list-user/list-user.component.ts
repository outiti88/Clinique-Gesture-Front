import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(
    private userService : UserService, 
    private route : ActivatedRoute,
    private router : Router
    ) { }


  ngOnInit(): void {
    if(localStorage.getItem('role') != 'admin'){
      this.router.navigate(['/']);

    }
    this.getAllUsers();
  }

  users : any = [] ;

  paginateTo(page: number) {
    this.router.navigate(['/users', 'page', page]);
    this.getAllUsers();
  }

  getAllUsers(){
   // this.id= this.route.snapshot.params['id'];
    const page = this.route.snapshot.params['page'];
    console.log(page);
    if(page == null){
      this.userService.getUsers().subscribe((res) => {
        this.users = res ;
      });
    }
    else{
      this.userService.getUsersPage(page).subscribe((res) => {
        this.users = res ;
      });
    }
  }


  deleteUser(id , nom){

    if(confirm("Voulez vous vraiment supprimer: "+nom)){

      console.log(id);

      this.userService.delete(id)
      .subscribe(() => {
        alert('supprimer');
        this.router.navigate(['/users']);

      })
  
      }

  }


}
