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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';



const routes: Routes =[
  {
    path : "" , redirectTo : '/patient' , pathMatch : 'full'
  },

  { path : "patient"  , children:[
    { path : "" , component : ListPatientComponent, canActivate:[AuthGuard]},
    { path : ":id/edit " , component : EditPatientComponent , canActivate:[AuthGuard]},
    { path : "add" , component : AddPatientComponent , canActivate:[AuthGuard]}
  ]} , 
  {
    path : "login" , component : LoginComponent , canActivate:[AfterAuthGuard]
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
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
