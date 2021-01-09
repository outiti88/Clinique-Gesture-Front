import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Soin } from 'src/app/models/soin';
import { SoinsService } from 'src/app/services/soins.service';

@Component({
  selector: 'app-list-soins',
  templateUrl: './list-soins.component.html',
  styleUrls: ['./list-soins.component.css']
})
export class ListSoinsComponent implements OnInit {

  constructor(private router : Router, private soinService : SoinsService) { }

  ngOnInit(): void {
    if(localStorage.getItem('role') != 'medecin'){
      this.router.navigate(['/']);
    }
    this.getAllSoins();
  }

  soins : any = [];
  soin : Soin = new Soin(localStorage.getItem('id') ) ;
  formShow = false;
  ajoutSoin = false;
  editSoin = false;

  ajouterSoin(){
    this.soin = new Soin(localStorage.getItem('id'));
    this.formShow = !this.formShow;
    this.ajoutSoin = true;
    this.editSoin = false;
  }

  modifier(soin){
    this.soin = soin;
    this.formShow = true;
    this.editSoin = true;
    this.ajoutSoin = false;
  }

  getAllSoins(){
    this.soinService.getAll(localStorage.getItem('id')).subscribe(
      res => {
        this.soins = res;
      }
    )

  }

  edit(soin){
    this.soinService.update(soin).subscribe(
      res => {
        this.formShow=false;
      }
    )
  }

  addSoin(){
    this.soinService.persist(this.soin).subscribe(
      res => {
        this.soins = [this.soin, ...this.soins];
        this.formShow = false;
      }
    )
  }

  delete(soin){
    if(confirm("Voulez vous vraiment supprimer: "+soin.type)){
        this.soinService.delete(soin.id).subscribe(
          res => {
            this.formShow=false;
            this.soins = this.soins.filter(s => s.id != soin.id);
          }

        )
      }
  }

}
