import { User } from './user';

export class Patient {
    patientId ?: string;
    nom : string ;
	prenom : string ;
	adresse : string ;
	telephone ?: string ;
	cin : string ;
	usersIds ?: Array<string> = [];
	users ?: User[] ;

    constructor() {
    }
}
