import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnDestroy {

  constructor(
    private userService : UserService, 
    private route : ActivatedRoute,
    private router : Router
    ) { }

    userAdd : any = null ;
    edit = false;
    userEdited = false;
    
    userEdit : User =  new User() ;


    users : any = [] ;
    user : any = null ;

  ngOnInit(): void {
    if(localStorage.getItem('role') != 'admin'){
      this.router.navigate(['/']);
    }

    this.userService.currentMsg.subscribe(res => this.userAdd = res);
    this.getAllUsers();
  }

  ngOnDestroy(){
    this.userService.message.next(false);

  }



  paginateTo(page: number) {
    this.router.navigate(['/users', 'page', page]);
    this.getAllUsers();
  }

  getAllUsers(){
   // this.id= this.route.snapshot.params['id'];
    const page = this.route.snapshot.params['page'];
    if(page == null){
      this.userService.getUsers().subscribe((res) => {
        console.log(res);
        this.users = res ;
      });
    }
    else{
      this.userService.getUsersPage(page).subscribe((res) => {
        this.users = res ;
      });
    }
  }

  editUser(user){
    if(this.userEdit === user) {
      this.edit = false;
      this.userEdit = null;
    } 
    else{
      this.userEdit = user;
      this.edit = true;
    } 
    console.log(user);
  }

  modifier(){
    this.userService.update(this.userEdit).subscribe(
      () => {
        this.edit = false;
        this.userEdited = true;
      },
      (error) => {
        this.edit = false;
        console.log("erreur: ", error.error.message)
      }
    );
  }

  deleteUser(id , nom){
    if(confirm("Voulez vous vraiment supprimer: "+nom)){
      this.userService.delete(id)
      .subscribe(() => {
        this.users = this.users.filter(users => users.userID != id);
        alert('supprimer');
        });
      }
  }


}
