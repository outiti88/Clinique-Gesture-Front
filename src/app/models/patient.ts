import { User } from './user';

export class Patient {
    patientId ?: string;
    nom : string ;
	prenom : string ;
	adresse : string ;
	telephone ?: string ;
	cin : string ;
	medecin_id ?: string;
	user ?: User ;

    constructor() {
    }
}
