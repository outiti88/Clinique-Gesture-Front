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
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { NotAuthorizedComponent } from './components/partials/not-authorized/not-authorized.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddRdvComponent } from './components/rdv/add-rdv/add-rdv.component';
import { ListRdvComponent } from './components/rdv/list-rdv/list-rdv.component';




const routes: Routes =[
  {
    path : "" , redirectTo : '/patient' , pathMatch : 'full'
  },

  { path : "users"  , children:[
    { path : "" , component : ListUserComponent},
    {path : "edit/:id" , component : ListUserComponent },
    {path : "page/:page" , component : ListUserComponent },
    { path : "add" , component : AddUserComponent}
  ] , canActivate:[AuthGuard]} , 

  { path : "patient"  , children:[
    { path : "" , component : ListPatientComponent},
    { path : ":id/edit " , component : EditPatientComponent},
    { path : "add" , component : AddPatientComponent}
  ] , canActivate:[AuthGuard]} , 
  { path : "RDV"  , children:[
    { path : "" , component : ListRdvComponent},
    { path : "add" , component : AddRdvComponent}
  ] , canActivate:[AuthGuard]} , 
  {
    path : "login" , component : LoginComponent , canActivate:[AfterAuthGuard]
  } ,
  {
    path : "403" , component : NotAuthorizedComponent 
  } ,
  {
    path : "**" , component : NotfoundComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AddPatientComponent,
    EditPatientComponent,
    ListPatientComponent,
    NavbarComponent,
    NotfoundComponent,
    LoginComponent,
    AddUserComponent,
    ListUserComponent,
    AddRdvComponent,
    ListRdvComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : JwtInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
