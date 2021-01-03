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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ListUserComponent } from './components/users/list-user/list-user.component';
import { NotAuthorizedComponent } from './components/partials/not-authorized/not-authorized.component';



const routes: Routes =[
  {
    path : "" , redirectTo : '/patient' , pathMatch : 'full'
  },

  { path : "users"  , children:[
    { path : "" , component : ListUserComponent, canActivate:[AuthGuard]},
    {path : "page/:page" , component : ListUserComponent , canActivate:[AuthGuard]},
    { path : "add" , component : AddUserComponent , canActivate:[AuthGuard]}
  ]} , 

  { path : "patient"  , children:[
    { path : "" , component : ListPatientComponent, canActivate:[AuthGuard]},
    { path : ":id/edit " , component : EditPatientComponent , canActivate:[AuthGuard]},
    { path : "add" , component : AddPatientComponent , canActivate:[AuthGuard]}
  ]} , 
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
    ListUserComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
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
