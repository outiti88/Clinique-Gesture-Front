import { Role } from './role';

export class User{

    firstName : string ;
	lastName : string ;
	email : string ;
	password : string ;
	role = new Role();

    constructor() {
    }
    

}