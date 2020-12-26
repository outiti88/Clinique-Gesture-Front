import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router' ;
import { AppComponent } from './app.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { ListPatientComponent } from './components/list-patient/list-patient.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { NotfoundComponent } from './components/partials/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes =[
  {
    path : "" , redirectTo : '/patient' , pathMatch : 'full'
  },

  { path : "patient" , children:[
    { path : " " , component : ListPatientComponent},
    { path : ":id/edit " , component : EditPatientComponent},
    { path : "add" , component : AddPatientComponent}
  ]} , 
  {
    path : "login" , component : LoginComponent
  } ,
  {
    path : "**" , component : NotfoundComponent
  }
] ;


@NgModule({
  declarations: [
    AppComponent,
    AddPatientComponent,
    EditPatientComponent,
    ListPatientComponent,
    NavbarComponent,
    NotfoundComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
