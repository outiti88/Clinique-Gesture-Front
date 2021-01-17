import { User } from './user';

export class Soin {
    constructor(medecinId : string) {
        this.medecinId = medecinId
    }

    soinId ?: String;
    typeSoin : String = "";
    prix : String = "";
    medecinId : String = "";
    medecin ?: User ;

}