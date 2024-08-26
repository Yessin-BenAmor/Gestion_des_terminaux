import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink, Router, RouterLinkActive, RouterOutlet } from '@angular/router';
import e from 'express';
 @Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


  

export class HeaderComponent  {
 username = "";
  constructor(private authService: AuthService) { 
    this.username = localStorage.getItem('usernameValuemlsignin') || '';



  }
  signOut() {
    
    window.location.href = '/';
    this.authService.signout().subscribe(() => {
    });
  }


}
