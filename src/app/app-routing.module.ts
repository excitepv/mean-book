import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
{ path:'',redirectTo:'login', pathMatch:'full'},
{ path:'login', component:LoginComponent},
{ path:'register', component:RegisterComponent},
{ path:'chat', component:ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
