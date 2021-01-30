import { Rdv } from './rdv';
import { Medicament } from './medicament';
import { Soin } from './soin';
import { Scanner } from './scanner';


export class Document{
    
    public documentId ?: number ;
    public price ?: number ;

    public rdv ?: Rdv ;

    public soins ?: Soin[] ;
    public medicaments ?: Medicament[];
    public scanners ?: Scanner[] ;

    public dosMedRequests ?: {medicamentId : string , qty : string}[] ; // medicamentId + qty
    public soinsId ?: string[] ;
    public scannersId ?: string[] ;
    public rdvId ?: string ;
}