import { Role } from './role';

export class User{
	userID ?: string;
    firstName : string ;
	lastName : string ;
	email : string ;
	password ?: string ;
	role = new Role();

    constructor() {
    }
    

}