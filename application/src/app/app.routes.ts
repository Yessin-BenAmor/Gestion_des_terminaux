import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { TerminalTypeComponent } from './terminal-type/terminal-type.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { TerminalTypesComponent } from './terminal-types/terminal-types.component';

export const routes: Routes = [

{path: '', component: HomeComponent,},
{path : 'signUp', component : SignUpComponent},
{path:'signIn', component : SignInComponent, },
{ path: 'profile/:username', component: ProfileComponent,canActivate : [AuthGuard] },
{ path: 'TerminalList',component: TerminalTypeComponent  },
{path: 'Sponsor', component: SponsorComponent},
{ path: 'TerminalTypes',component: TerminalTypesComponent  },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { 
    
  }
  