import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userActuel = null ;

  constructor(
    private account : AccountService , 
    private tokenService : TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.account.isAuth.subscribe( res => {
      this.userActuel = this.tokenService.getInfos();
    });

  }

  logout(){
    this.tokenService.remove();
    this.account.changeStatut(false);
    this.router.navigateByUrl("/login");

  }

}
