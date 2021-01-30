import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/services/facture.service';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {

  constructor(private factureService: FactureService) { }

  ngOnInit(): void {
    this.getAllFacture();
  }


  chargement = false;
  factures : any =[];

  facture : {
    
  }

  getAllFacture(){
    this.chargement = true;
    this.factureService.getFactures().subscribe((res) => {
      this.chargement = false;
      this.factures = res ;
    });
  }

  payer(facture){
    if(confirm("Voulez vous vraiment payer cette facture ?")){
      facture.isPaid = 1;
      this.factureService.payer(facture).subscribe(
      res => {
        console.log(res);
        
      }
    )
    }
  }


}
