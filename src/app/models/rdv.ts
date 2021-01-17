import { Patient } from './patient';
import { User } from './user';

export class Rdv{

    patientId ?: string = "";
    medecinId ?: string = "";

    motif : string  = "";
	date : string  = "";
	startTime : string  = "";
    endTime : string  = "";
    state : string = "fixé";

    patient ?: Patient;
    medecin ?: User;

}