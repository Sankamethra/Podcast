import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PlayComponent } from './play/play.component';
import { CreateComponent } from './create/create.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', redirectTo :'/home', pathMatch: "full"},
  {path:"home",component:HomeComponent},
  {path:"search",component:SearchComponent},
  {path:"play",component:PlayComponent},
  {path:"create",component:CreateComponent},
  {path:"signup",component:SignupComponent},
  {path:"login",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
