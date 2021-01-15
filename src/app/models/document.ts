import { Rdv } from './rdv';


export class Document{
    
    public id : number ;
    public price : number ;
    constructor(
       
        public rdv : Rdv ,
        public soins : any[] ,
        public medicaments : any[] ,
        public scanners : any[] ,
    ){}
}